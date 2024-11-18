const Compiler = require("./Compiler");

function webpack(options) {
    // 获取命令行参数，并且转换为对象
    const argv = process.argv.slice(2);
    const shellOpts = argv.reduce((shellOptions, opt)=> {
        const [key, value] = opt.split("=");
        shellOptions[key.slice(2)] = value;
        return shellOptions;
    }, {})

    // 1. 获取最终参数
    let finalOptions = {...shellOpts, ...options};
    // 2. 获取compiler实例
    const compiler = new Compiler(finalOptions);

    // 3. 加载所有配置插件
    finalOptions.plugins.forEach(plugin => {
        plugin.apply(compiler);
    })

    return compiler;
}

module.exports = webpack;
