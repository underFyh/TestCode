module.exports = class DonePlugin {
    apply(compiler) {
        compiler.hooks.done.tap('donePlugin', (compilation) => {
            console.log("结束编译 - done");
        })
    }
}
