module.exports = class RunPlugin {
    apply(compiler) {
        compiler.hooks.run.tap('runPlugin', (compilation) => {
            console.log("开始编译 - run");
        })
    }
}
