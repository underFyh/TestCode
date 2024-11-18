const { SyncHook } = require('tapable');
const Complication = require('./Complication');
const path = require("path");
const fs = require("fs");

module.exports = class Compiler {
    constructor(finalOptions) {
        this.options = finalOptions;
        this.hooks = {
            run: new SyncHook(),
            done: new SyncHook()
        }
    }

    run(callback) {
        // 1. 执行run方法开始编译时执行该钩子
        this.hooks.run.call();

        // 定义onCompiled回调函数，用于处理编译结果
        const onCompiled = (err, stats, fileDependencies) => {
            const { assets } = stats;
            // 获取编译生成的资源
            // 遍历资源，将资源写入输出目录
            for (let filename in assets) {
                let filePath = path.posix.join(this.options.output.path, filename);
                fs.writeFileSync(filePath, assets[filename], 'utf-8');
            }
            // 调用外部传入的回调函数(调试阶段)
            callback(err, {toJson: () => stats});
        };
        this.compile(onCompiled);

        // 3. 编译结束执行钩子
        this.hooks.done.call();
    }


    compile(onCompiled) {
        const complication = new Complication(this.options);
        complication.build(onCompiled);
    }
}
