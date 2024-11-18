const webpack = require("../myWebpack/webpack");
const config = require("../webpack.config");
const fs = require("fs");

const compiler = webpack(config);
compiler.run((err, stats) => {
    // let info = stats.toJson({
    //     // 打印编译后模块信息
    //     modules: true,
    //     // 打印所有的代码块（模块的集合）
    //     chunks: true,
    //     // 输出文件列表
    //     assets: true
    // })
    // fs.writeFileSync("./info.json", JSON.stringify(info));
})

