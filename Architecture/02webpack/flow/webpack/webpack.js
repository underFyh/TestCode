const Compiler = require("./Compiler"); // 管理编译过程的对象，就叫编译器

function webpack(config) {
    // 1. 命令行的参数和配置文件参数合并
    // process Node内置对象代表当前进程
    const argv = process.argv.splice(2) // 去掉没意义的参数
    // 转换为对象参数
    const shellOpts = argv.reduce((shellOptions, opts) => {
        const [key, value] = opts.split("=");
        shellOptions[key.slice(2)] = value; // 去除--
        return shellOptions;
    }, {});
    const finalOptions = {...shellOpts, ...config};

    // 2. 初始化compiler对象
    const compiler = new Compiler(finalOptions);
    // console.log(compiler);


    // 3. 加载所有配置的插件 finalOptions.plugins
    finalOptions.plugins.forEach(plugin => {
        plugin.apply(compiler); // 订阅
    })


    return compiler;
}

module.exports = webpack;
