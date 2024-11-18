const path = require("path");
const fs = require("fs");

const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;


module.exports = class Complication {
    constructor(options) {
        this.options = options;
        this.options.context = this.options.context || process.cwd();
        // 存放本次编译所有产生的模块
        this.modules = [];
        // 存放所有的依赖,需要编译的文件路径
        this.fileDependencies = new Set();
        // 存放所有chunk代码块
        this.chunks = []
        // 存放输出的文件,属性为文件名,值为文件内容
        this.assets = {}
    }

    build(onCompiled) {
        // 5. 根据入口信息找到需要打包的模块
        let entry = {};
        if (typeof this.options.entry === 'string') {
            // 说明为单入口
            entry.main = this.options.entry;
        } else {
            entry = this.options.entry;
        }

        for (let entryName in entry) {
            // 获取到入口文件的绝对路径,让后放入进依赖
            let context = this.options.context;
            let entryFilePath = path.posix.join(context, entry[entryName]);
            this.fileDependencies.add(entryFilePath);
            // 从入口文件开始编译模块
            let entryModule = this.buildModule(entryName, entryFilePath);
            this.createChunk(entryName, entryModule);
        }
        this.chunkToAssets(onCompiled);
    }

    createChunk(entryName, entryModule) {
        let chunk = {
            name: entryName, // 该chunk的入口名字
            entryModule, // 处理后入口模块
            modules: this.modules.filter(module => module.names.includes(entryName))
        }
        this.chunks.push(chunk);
    }

    chunkToAssets(onCompiled) {
        this.chunks.forEach(chunk => {
            // 根据output文件名进行配置
            let outputFileName = this.options.output.filename.replace("[name]", chunk.name);
            // 生成打包后的文件代码（运行时代码）
            this.assets[outputFileName] = getSourceCode(chunk);
        })

        // 调用onCompiled回调函数，传入构建结果
        onCompiled(null, {
            modules: this.modules,
            chunks: this.chunks,
            assets: this.assets
        }, this.fileDependencies);
    }

    /**
     *
     * @param entryName 入口配置名称这里为 entry1 entry2 包括子模块也会使用这个名称记录
     * @param modulePath
     */
    // 6. 获取loader进行编译入口
    buildModule(entryName, modulePath) {
        // 获取入口源码
        let sourceCode = fs.readFileSync(modulePath, "utf-8");
        // 获取loaders转换
        let {rules} = this.options.module;
        // 找到适合当前模块的loader,此时为loader1和loader2
        let loaders = [];
        rules.forEach(rule => {
            if (modulePath.match(rule.test)) {
                loaders.push(...rule.use);
            }
        })
        // 使用loader函数对源码进行改造
        let transformedSourceCode = loaders.reduceRight((rawSourceCode, loader) => {
            return require(loader)(rawSourceCode);
        }, sourceCode);

        // 打印通过loader转换后的入口文件
        let context = this.options.context;
        let moduleId = "./" + path.posix.relative(context, modulePath);

        // 创建模块记录,只要编译的模块都进行记录
        let module = {
            id: moduleId,
            names: [entryName], // 这个模块是从哪个入口进入的
            dependencies: new Set()
        }

        // 7. 找到该模块的依赖递归处理
        // 先将模块代码转换为ast语法树分析依赖
        let ast = parser.parse(transformedSourceCode, {sourceType: "module"});
        traverse(ast, {
            CallExpression: ({node}) => {
                // 先获取入口文件依赖的模块名，这里为 ./components/title
                let depModuleName = node.arguments[0].value;
                // 将当前编译模块的路径拼接该依赖模块名组合出该依赖模块的路径
                let dirName = path.posix.dirname(modulePath);
                // D:/TestCode/webpack-test/flow/src/components/title
                let depModulePath = path.posix.join(dirName, depModuleName);

                // 根据配置的extensions来尝试获取该文件的后缀
                const {extensions} = this.options.resolve;
                depModulePath = tryExtensions(depModulePath, extensions);
                // 并且把该子模块title添加到依赖列表中
                this.fileDependencies.add(depModulePath);

                // 创建该子模块的模块id (都已以src为基本文件夹创建出来的)
                // 此时title模块的模块id为 ./src/components/title.js
                let depModuleId = "./" + path.posix.relative(this.options.context, depModulePath);

                // 修改引入该模块的语法树
                // require("./components/title") 转换为 require("./src/components/title.js")
                node.arguments[0] = types.stringLiteral(depModuleId);

                // 并且把子模块添加依赖
                module.dependencies.add({
                    depModuleId,
                    depModulePath
                })
            }
        })

        // 修改完成后再转换为源代码记录到module.__source属性上
        const {code} = generator(ast);
        console.log("code", code);
        module.__source = code;


        // 继续递归处理子模块依赖,需要判断之前的模块是否已经处理
        module.dependencies.forEach(({depModuleId, depModulePath}) => {
            let existModule = this.modules.find(item => item.id === depModuleId);
            // 存在则直接在该模块添加入口名字
            if (existModule) {
                existModule.names.push(entryName);
            } else {
                // 不存在则需要编译
                this.buildModule(entryName, depModulePath);
            }
        })

        // 处理完成后把这个模块放入到依赖中记录,然后返回当前处理的module
        this.modules.push(module);
        return module;
    }
}


function tryExtensions(depModulePath, extensions) {
    // 引入的时候已经带了.js后缀
    if (fs.existsSync(depModulePath)) {
        return depModulePath;
    }
    for (let i = 0; i < extensions.length; i++) {
        let filePath = depModulePath + extensions[i];
        if (fs.existsSync(filePath)) {
            return filePath;
        }
    }
    throw new Error("未找到该模块");
}


function getSourceCode(chunk) {
    // 模块定义和模块执行不一样，运行时一样的
    return `
            (() => {
            var modules = {
              ${chunk.modules.filter(module => module.id !== chunk.entryModule.id).map(module => `
                    "${module.id}": module => {
                       ${module.__source}
                      }
                    `)}  
            };
            var cache = {};
            function require(moduleId) {
              var cachedModule = cache[moduleId];
              if (cachedModule !== undefined) {
                return cachedModule.exports;
              }
              var module = cache[moduleId] = {
                exports: {}
              };
              modules[moduleId](module, module.exports, require);
              return module.exports;
            }
            var exports = {};
            (() => {
              ${chunk.entryModule.__source}
            })();
            })();
         `;
}
