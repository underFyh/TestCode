
class RunPlugin {
    apply(compiler) {
        compiler.hooks.run.tap("runPlugin", () => {
            console.log("开始编译 run");
        })
    }
}

module.exports = RunPlugin;
