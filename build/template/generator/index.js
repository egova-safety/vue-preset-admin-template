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
            const { EOL } = require("os");
            const fs = require("fs");
            const filePath = "src/application/workbench.ts";
            const workbench = fs.readFileSync(api.resolve(filePath), {
                encoding: "utf-8"
            });
            let lines = workbench.split(/\r?\n/g); // 文件拆分

            const renderIndex = lines.findIndex(line =>
                line.match(/set-project-model/)
            );
            lines[
                renderIndex
            ] += `${EOL}\t\tconsole.log("project model is ${options.model}")`;

            fs.writeFileSync(api.resolve(filePath), lines.join(EOL), {
                encoding: "utf-8"
            });
        } catch (error) {
            console.log(error);
        }
    });
};
