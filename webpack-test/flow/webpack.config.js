const path = require("path");

const RunPlugin = require("./plugins/runPlugin");
const DonePlugin = require("./plugins/donePlugin");

module.exports = {
    mode: "development",
    devtool: false,
    // context: path.resolve(__dirname),
    // 如果使用process.cwd()则需要注意脚本运行的路径，不能在src目录下运行否则debug.js文件，否则会找不到模块
    // 转换为/路径分隔符
    context: path.posix.normalize(process.cwd()),
    entry: {
        entry1: "./src/entry1.js",
        entry2: "./src/entry2.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    path.resolve(__dirname, "loaders/loader1.js"),
                    path.resolve(__dirname, "loaders/loader2.js"),
                ]
            }
        ]
    },
    plugins: [
        new RunPlugin(),
        new DonePlugin()
    ]
}
