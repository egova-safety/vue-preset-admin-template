module.exports = (api, options) => {
    api.extendPackage({
        dependencies: "#{dependencies}",
        devDependencies: "#{devDependencies}",
        scripts: "#{scripts}"
    });

    // 删除 vue-cli3 默认目录
    api.render(files => {
        Object.keys(files)
            .filter(
                path => path.startsWith("src/") || path.startsWith("public/")
            )
            .forEach(path => delete files[path]);
    });

    api.render("./template");

    // 屏蔽 generator 之后的文件写入操作
    // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
    api.onCreateComplete(() => {
        process.env.VUE_CLI_SKIP_WRITE = true;
    });
};

module.exports.hooks = (api, options) => {
    api.afterInvoke(() => {
        try {
            const isSubModel = options.model === "sub";
            console.log(`project model is ${options.model}`);

            // 编辑代码
            const filePath = [
                "src/application/workbench.ts",
                "src/application/workspace.ts",
                api.entryFile
            ];
            for (let path of filePath) {
                editCode(api, path, isSubModel);
            }

            // 删除文件
            const deletePath = isSubModel
                ? ["src/micro-app.ts", "src/views/main-modules"]
                : ["src/views/sub-modules"];
            for (let dpath of deletePath) {
                // emptyDir(api.resolve(dpath));
                deleteFile(api.resolve(dpath));
            }

        } catch (error) {
            console.log(error);
        }
    });
};

function editCode(api, path, isSubModel) {
    let fs = require("fs");
    let { EOL } = require("os");
    let file = fs.readFileSync(api.resolve(path), {
        encoding: "utf-8"
    });
    // 删除代码或删除注释
    if (isSubModel) {
        file = file.replace(
            /\/\*\s*main-project\s*\*\/[\s\S.]*?\/\*\s*main-project-end\s*\*\//g,
            EOL
        );
    } else {
        file = file.replace(
            /\/\*\s*main-project\s*\*\/|\/\*\s*main-project-end\s*\*\//g,
            EOL
        );
    }
    // 编辑workbench.ts
    if (/workbench/.test(path)) {
        //main-project&sub-project
        file = isSubModel
            ? file.replace(
                  /\/\*\s*main-project&sub-project\s*\*\/[\s\S.]*?\/\*\s*main-project&sub-project-end\s*\*\//,
                  `${EOL}        this.initializeRouter(context);`
              )
            : file.replace(
                  /\/\*\s*main-project&sub-project\s*\*\/|\/\*\s*main-project&sub-project-end\s*\*\//,
                  ""
              );
    }
    // 编辑workspace.ts
    if (/workspace/.test(path)) {
        file = isSubModel
            ? file.replace(
                  /\/\*\s*main-project&sub-project\s*\*\/[\s\S.]*?\/\*\s*main-project&sub-project-end\s*\*\//,
                  `template: '<div id="app"><router-view /></div>'`
              )
            : file.replace(
                  /\/\*\s*main-project&sub-project\s*\*\/[\s\S.]*?\/\*\s*main-project&sub-project-end\s*\*\//,
                  `template: '<div id="app"><qk-main-view /></div>'`
              );
    }

    fs.writeFileSync(api.resolve(path), file, {
        encoding: "utf-8"
    });
}

let deleteFile = function(path) {
    let fs = require("fs");
    if (!fs.statSync(path).isDirectory()) {
        fs.unlinkSync(path);
        return;
    }
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                // recurse
                deleteFile(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
                console.log("delete " + curPath + " success");
            }
        });
        fs.rmdirSync(path);
    }
};
