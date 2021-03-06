const fs = require("fs-extra");
const tools = require("./template.tools");


module.exports = function generatorIndexJS(pkg) {

    const pluginName = pkg.name;
    var dependencies = JSON.stringify(pkg.dependencies, null, 2);
    var devDependencies = JSON.stringify(pkg.devDependencies, null, 2);
    var scripts = JSON.stringify(pkg.scripts, null, 2);


    try {

        console.info(`生成${pluginName}插件 generator 开始`)

        tools.copyDir("./src", `./.template/generator/template/src`, newFile => {

            if (newFile.indexOf("_") >= 0) {
                newFile = newFile.replace("_", "__")
            }
            return newFile
        });
        fs.copySync('./types', `./.template/generator/template/types`);
        fs.copySync('./public', `./.template/generator/template/public`);
        tools.copyFile('./public/index.html', `./.template/generator/template/public/index.html`, (data) => {
            data = tools.replaceAll("%", "%%", data);
            return data;
        });

        tools.copyFile('./babel.config.js', `./.template/generator/template/babel.config.js`);
        tools.copyFile('./dll.config.js', `./.template/generator/template/dll.config.js`);
        tools.copyFile('./tsconfig.json', `./.template/generator/template/tsconfig.json`);
        tools.copyFile('./tslint.json', `./.template/generator/template/tslint.json`);
        tools.copyFile('./vue.config.js', `./.template/generator/template/vue.config.js`);
        // tools.copyFile('./.env', `./.template/generator/template/_env`);
        tools.copyFile('./.stylelintrc.json', `./.template/generator/template/_stylelintrc.json`);
        tools.copyFile('./.editorconfig', `./.template/generator/template/_editorconfig`);
        tools.copyFile('./.gitignore', `./.template/generator/template/_gitignore`);

        tools.copyFile('./build/template/generator/index.js', `./.template/generator/index.js`, (data) => {
            data = tools.replaceAll("\"#{dependencies}\"", dependencies, data);
            data = tools.replaceAll("\"#{devDependencies}\"", devDependencies, data);
            data = tools.replaceAll("\"#{scripts}\"", scripts, data);
            return tools.formatJS(data);
        });

        console.info(`生成${pluginName}插件 generator 完成`)
    } catch (err) {
        console.error(err)
    }
}
