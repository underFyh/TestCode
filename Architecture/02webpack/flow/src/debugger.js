const webpack = require("../webpack/webpack.js");  // 改为自己的webpack
const config = require("./../webpack.config")

const compiler = webpack(config);


compiler.run((err, stats) => {
    console.log(stats.toJSON());
})
