const {SyncHook} = require('tapable');
const Complication = require("./Complication");
const fs = require("fs");
const path = require("path");

class Compiler {
    constructor(options) {
        this.options = options; // 保存配置
        this.hooks = { // 存放钩子
            run: new SyncHook(), // 开始编译时候触发
            done: new SyncHook(), // 结束编译时候触发
        }
    }

    run(callback) {
        this.hooks.run.call();

        // 中间为编译过程...
        // 开始一次新的编译(错误 描述 文件依赖:本地打包涉及哪些文件？)
        const onCompiled = (err, stats, fileDependencies) => {
            // 获取编译生成的资源
            const {assets} = stats;
            // 遍历资源，将资源写入输出目录
            for (let filename in assets) {
                let filePath = path.posix.join(this.options.output.path, filename);
                fs.writeFileSync(filePath, assets[filename], 'utf-8');
            }
            // 调用外部传入的回调函数
            callback(err, {toJson: () => stats});
        }

        this.compile(onCompiled)

        // 编译结束
        this.hooks.done.call();

    }

    compile(onCompiled) {
        // todo: compile厂长（单例、发布命令）   Complication车间主任（多个、干活的、负责一次编译）
        const complication = new Complication(this.options);
        complication.build(onCompiled);
    }
}

module.exports = Compiler
