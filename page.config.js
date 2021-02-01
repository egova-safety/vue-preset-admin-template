const path = require('path');

let pages = require(path.resolve("./src/pages/index.json"));
let skins = require(path.resolve("./public/static/skins/index.json"));

// 修改插件配置
let htmlPlugins = (pages) ? Object.keys(pages).map(g => "html-" + g) : ["html"];

const plugin = (config) => {
    htmlPlugins.forEach(v => {
        config.plugin(v).tap(args => {
            if (args[0]) {
                args[0].minify = {
                    removeComments: true,
                    collapseWhitespace: false,
                    removeAttributeQuotes: false
                };
                args[0].skins = skins;
            }
            return args;
        });
    });
}

module.exports = {
    pages: pages,
    plugin: plugin
};

