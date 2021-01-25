const path = require("path");

let pages = undefined;

if (process.env.PAGE_MODE && process.env.PAGE_JSON) {
    pages = require(path.resolve(process.env.PAGE_JSON));
    if (process.env.PAGE_MODE !== "all") {
        let v = pages[process.env.PAGE_MODE];
        if (v) {
            v.name = "index";
            v.filename = "index.html";
            v.chunks = ["chunk-vendors", "chunk-common", "index"];
            pages = { index: v };
        }
    }
}

let skins = process.env.SKIN_JSON
    ? require(path.resolve(process.env.SKIN_JSON))
    : undefined;

// 修改插件配置
let htmlPlugins = pages ? Object.keys(pages).map(g => "html-" + g) : ["html"];

const plugin = config => {
    htmlPlugins.forEach(v => {
        config.plugin(v).tap(args => {
            if (args[0]) {
                args[0].minify = {
                    removeComments: true,
                    collapseWhitespace: false,
                    removeAttributeQuotes: false
                };
                args[0].skins = skins;
                args[0].title = "template";
            }
            return args;
        });
    });
};

module.exports = {
    pages: pages,
    plugin: plugin
};
