const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin =require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devtool: "source-map",
    output: {
        filename: "bounder.js",
        publicPath: "http://localhost:3333/"
    },
    devServer: {
        port: 3333
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    },
                },
                exclude: /node_modules/

            }
        ]
    },
    // resolve: {
    //     extensions: ['.js', '.jsx']  // 添加这个配置以支持 .jsx 文件
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html'),
        }),
        new ModuleFederationPlugin({
            filename: "myRemoteEntry.js",
            name:"remote1",
            exposes: {
                "./NewList": "./src/NewList.jsx",
            }
        })
    ]
}
