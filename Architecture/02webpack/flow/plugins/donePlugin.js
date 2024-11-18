// 插件都是类形式
class DonePlugin {
    // compiler 相当于整个webpack
    apply(compiler) {
        compiler.hooks.run.tap("donePlugin", () => {
            console.log("结束编译 done");
        })
    }
}

module.exports = DonePlugin;
