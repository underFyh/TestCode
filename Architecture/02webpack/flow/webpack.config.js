const path = require("path");
const RunPlugin = require("./plugins/runPlugin");
const DonePlugin = require("./plugins/donePlugin");

module.exports = {
    mode: 'development',
    // current work directory 工作目录
    context: process.cwd(),
    devtool: false,
    entry: {
        // 相对路径，相对于context组合出绝对路径
        entry1: './src/entry1.js',
        entry2: './src/entry2.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js",
    },
    resolve: {
        // 配置查找模块路径规则,引入模块的时候可以不写扩展名优先从左往后查找
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    // 转换函数目前只打印
                    path.resolve(__dirname, "loaders/logger1-loader.js"),
                    path.resolve(__dirname, "loaders/logger2-loader.js"),
                ]
            }
        ]
    },
    plugins: [
        new RunPlugin(),
        new DonePlugin()
    ]
}
