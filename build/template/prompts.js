module.exports = [
    {
        type: "list", // 即类型为 选择项
        name: "model", // 名称，作为下面 generator 函数 options 的键
        message: "please select project model", // 提示语
        choices: [
            { name: "main project", value: "main" },
            { name: "sub project", value: "sub" }
        ],
        default: "sub"
    }
];
