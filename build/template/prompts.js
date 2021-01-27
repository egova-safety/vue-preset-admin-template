module.exports = [
    {
        type: "list", // 即类型为 选择项
        name: "model", // 名称，作为下面 generator 函数 options 的键
        message: "please select project model", // 提示语
        choices: [
            { name: "sub project", value: "sub" },
            { name: "main project", value: "main" }
        ],
        default: "model0"
    }
];
