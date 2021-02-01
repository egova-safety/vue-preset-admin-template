const fs = require("fs");
const { EOL } = require("os");

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

            move(
                api.resolve(
                    `src/pages/${isSubModel ? "sub" : "main"}/application/`
                ),
                api.resolve("src")
            );
            console.log();
            move(
                api.resolve(`src/pages/${isSubModel ? "sub" : "main"}/main.ts`),
                api.resolve("src")
            );
            !isSubModel &&
                move(api.resolve(`src/pages/main/views`), api.resolve("src"));

            editCode(api, isSubModel);
            // 删除文件
            remove(api.resolve("src/pages"));
            // const deletePath = isSubModel
            //     ? ["src/micro-app.ts", "src/views/main-modules"]
            //     : ["src/views/sub-modules"];
            // for (let dpath of deletePath) {
            //     // emptyDir(api.resolve(dpath));
            //     deleteFile(api.resolve(dpath));
            // }
        } catch (error) {
            console.log(error);
        }
    });
};

function editCode(api, isSubModel) {
    let vueConfig = fs.readFileSync(api.resolve("vue.config.js"), {
        encoding: "utf-8"
    });
    console.log(vueConfig);
    console.log(/const\spageConfig[\s|\S]*?\n/.test(vueConfig));
    vueConfig = vueConfig.replace(
        /const\spageConfig[\s|\S]*?\n/,
        `const skins = require(path.resolve("./public/static/skins/index.json"));`
    );
    console.log(/pages\:\spageConfig\.pages\,\r?\n/.test(vueConfig));
    vueConfig = vueConfig.replace(
        /pages\:\spageConfig\.pages\,\r?\n/,
        `pages: undefined,${EOL}`
    );
    console.log(/pageConfig\.plugin[\S|\s]*?\n/.test(vueConfig));
    vueConfig = vueConfig.replace(
        /pageConfig\.plugin[\S|\s]*?\n/,
        `config.plugin("html").tap(args => {
            // args[0].title = "vue2 Lab";
            args[0].minify = {
                removeComments: true,
                collapseWhitespace: false,
                removeAttributeQuotes: false
            };
            args[0].skins = skins;
            return args;
        });`
    );
    fs.writeFileSync(api.resolve("vue.config.js"), vueConfig, {
        encoding: "utf-8"
    });
}

function copy(originalUrl, targetUrl) {
    try {
        // 读取原路径
        const STATUS = fs.statSync(originalUrl);
        // 获得原路径的末尾部分
        // 此部分亦可通过path模块中的basename()方法提取
        const fileName = originalUrl.replace(/\\/g, "/").split("/")[
            originalUrl.replace(/\\/g, "/").split("/").length - 1
        ];
        console.log(`
        *******************************************
        fileName is ${fileName}, 
        originalUrl is ${originalUrl},
        targetUrl is ${targetUrl}
        *******************************************`);
        // 如果原路径是文件
        if (STATUS.isFile()) {
            // 在新目录中创建同名文件，并将原文件内容追加到新文件中
            fs.writeFileSync(
                `${targetUrl}/${fileName}`,
                fs.readFileSync(originalUrl)
            );
            //如果原路径是目录
        } else if (STATUS.isDirectory()) {
            //在新路径中创建新文件夹
            if (!fs.existsSync(`${targetUrl}/${fileName}`)) {
                fs.mkdirSync(`${targetUrl}/${fileName}`);
            }
            //如果原路径是非空目录,遍历原路径
            //空目录时无法使用forEach
            fs.readdirSync(originalUrl).forEach(item => {
                //更新参数，递归调用
                move(`${originalUrl}/${item}`, `${targetUrl}/${fileName}`);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

function remove(url) {
    // 读取原路径
    const STATUS = fs.statSync(url);
    // 如果原路径是文件
    if (STATUS.isFile()) {
        //删除原文件
        fs.unlinkSync(url);

        //如果原路径是目录
    } else if (STATUS.isDirectory()) {
        //如果原路径是非空目录,遍历原路径
        //空目录时无法使用forEach
        fs.readdirSync(url).forEach(item => {
            //递归调用函数，以子文件路径为新参数
            remove(`${url}/${item}`);
        });
        //删除空文件夹
        fs.rmdirSync(url);
    }
}

function move(originalUrl, targetUrl) {
    console.log(`move ${originalUrl} to ${targetUrl}`);
    //复制原路径中所有
    copy(originalUrl, targetUrl);
    //删除原路径中所有
    remove(originalUrl);
}

// module.exports.hooks = (api, options) => {
//     api.afterInvoke(() => {
//         try {
//             const isSubModel = options.model === "sub";
//             console.log(`project model is ${options.model}`);

//             // 编辑代码
//             const filePath = [
//                 "src/application/workbench.ts",
//                 "src/application/workspace.ts",
//                 api.entryFile
//             ];
//             for (let path of filePath) {
//                 editCode(api, path, isSubModel);
//             }

//             // 删除文件
//             const deletePath = isSubModel
//                 ? ["src/micro-app.ts", "src/views/main-modules"]
//                 : ["src/views/sub-modules"];
//             for (let dpath of deletePath) {
//                 // emptyDir(api.resolve(dpath));
//                 deleteFile(api.resolve(dpath));
//             }

//         } catch (error) {
//             console.log(error);
//         }
//     });
// };

// function editCode(api, path, isSubModel) {
//     let fs = require("fs");
//     let { EOL } = require("os");
//     let file = fs.readFileSync(api.resolve(path), {
//         encoding: "utf-8"
//     });
//     // 删除代码或删除注释
//     if (isSubModel) {
//         file = file.replace(
//             /\/\*\s*main-project\s*\*\/[\s\S.]*?\/\*\s*main-project-end\s*\*\//g,
//             EOL
//         );
//     } else {
//         file = file.replace(
//             /\/\*\s*main-project\s*\*\/|\/\*\s*main-project-end\s*\*\//g,
//             EOL
//         );
//     }
//     // 编辑workbench.ts
//     if (/workbench/.test(path)) {
//         //main-project&sub-project
//         file = isSubModel
//             ? file.replace(
//                   /\/\*\s*main-project&sub-project\s*\*\/[\s\S.]*?\/\*\s*main-project&sub-project-end\s*\*\//,
//                   `${EOL}        this.initializeRouter(context);`
//               )
//             : file.replace(
//                   /\/\*\s*main-project&sub-project\s*\*\/|\/\*\s*main-project&sub-project-end\s*\*\//,
//                   ""
//               );
//     }
//     // 编辑workspace.ts
//     if (/workspace/.test(path)) {
//         file = isSubModel
//             ? file.replace(
//                   /\/\*\s*main-project&sub-project\s*\*\/[\s\S.]*?\/\*\s*main-project&sub-project-end\s*\*\//,
//                   `template: '<div id="app"><router-view /></div>'`
//               )
//             : file.replace(
//                   /\/\*\s*main-project&sub-project\s*\*\/[\s\S.]*?\/\*\s*main-project&sub-project-end\s*\*\//,
//                   `template: '<div id="app"><qk-main-view /></div>'`
//               );
//     }

//     fs.writeFileSync(api.resolve(path), file, {
//         encoding: "utf-8"
//     });
// }

// let deleteFile = function(path) {
//     let fs = require("fs");
//     if (!fs.statSync(path).isDirectory()) {
//         fs.unlinkSync(path);
//         return;
//     }
//     let files = [];
//     if (fs.existsSync(path)) {
//         files = fs.readdirSync(path);
//         files.forEach(function(file, index) {
//             let curPath = path + "/" + file;
//             if (fs.statSync(curPath).isDirectory()) {
//                 // recurse
//                 deleteFile(curPath);
//             } else {
//                 // delete file
//                 fs.unlinkSync(curPath);
//                 console.log("delete " + curPath + " success");
//             }
//         });
//         fs.rmdirSync(path);
//     }
// };
