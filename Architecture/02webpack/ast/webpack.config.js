const path = require('path');

module.exports = {
    mode: "development",
    devtool: false,
    entry: "./index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            plugins: [
                                // 官方插件
                                // ['import', { libraryName: "lodash", libraryDirectory: "" }]

                                // 自定义插件
                                [
                                    path.resolve("./src/按需加载插件/importPlugin.js"),
                                    // 这个配置信息会在state.opts里面
                                    { libraryName: "lodash", libraryDirectory: "" }
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    }
}
