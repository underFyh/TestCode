const path = require("node:path");
const fs = require("fs");
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;



// 路径统一
function toUnixSeq(filePath) {
    return filePath.replace(/\\/g, "/");
}

class Complication {
    constructor(options) {
        this.options = options;
        this.options.content = toUnixSeq(options.content) || toUnixSeq(process.cwd());
        this.fileDependencies = new Set(); // 存放依赖,需要编译的文件路径
        this.modules = []; // 存放本次编译所有产生的模块
    }

    // 执行
    build(onCompiled) {
        // 5. 根据配置中的entry找到入口文件
        // 判断是字符串还是对象
        let entry = {};
        if (typeof this.options.entry === 'string') {
            entry.main = this.options.entry;
        } else {
            entry = this.options.entry;
        }
        for(let entryName in entry) {
            // 入口文件绝对路径
            let entryFilePath = path.posix.join(
                this.options.content,
                entry[entryName]
            )
            // 添加文件依赖
            this.fileDependencies.add(entryFilePath);
            // console.log(entryFilePath);
            // 从入口文件出发开始编译模块
            this.buildModule(entryName, entryFilePath);
        }
    }

    /**
     * 模块编译:
     * 1. 入口出发调用所有的loader对模块进行转换（css/js）
     * @param entryName 当前编译的模块名字 entry1 entry2
     * @param modulePath 当前编译的模块路径
     */
    buildModule(entryName, modulePath) {
        // 1. 获取源码
        let sourceCode = fs.readFileSync(modulePath, "utf-8");
        // 2. 获取loader转换
        let { rules } = this.options.module;
        // 适用于此模块的loader，里面都是函数
        let loaders = [];
        rules.forEach(rule => {
            // 用模块路径匹配正则表达式
            if (modulePath.match(rule.test)) {
                loaders.push(...rule.use);
            }
        });

        // 6. loader转换 插件是从后往上进行转换
        let transformedSourceCode = loaders.reduceRight((rawSourceCode, loader) => {
            // 返回loader函数进行处理老源码返回新源码
            return require(loader)(rawSourceCode)
        }, sourceCode);

        // console.log(transformedSourceCode);
        // 记录该模块在哪里使用和它的依赖
        // 获取当前编译模块的id ./src/entry1.js 相对于根目录的相对路径
        let moduleId = "./" + path.posix.relative(toUnixSeq(this.options.context), modulePath);
        let module = {
            id: moduleId,
            names: [entryName], // 当前模块属于哪个入口entry1
            dependencies: new Set() // 依赖哪些模块
        }

        // 转换后肯定是一个字符串了 transformedSourceCode
        // 7. 找出该模块的依赖模块，在递归本步骤直到找到所有入口依赖的文件都经过了本步骤的处理
        let ast = parser.parse(transformedSourceCode, {sourceType: "module"});
        // 遍历语法树找出引入语句进行修改 require("./title") => require("./src/title.js")
        traverse(ast, {
            CallExpression: ({node}) => {
                // .代表着当前正在编译模块的目录，需要获取引入模块的绝对路径
                // 先获取依赖名称 ./title
                let depModuleName = node.arguments[0].value;
                console.log(depModuleName);
                // 获取当前编译模块的目录
                let dirName = path.posix.dirname(modulePath);
                let depModulePath = path.posix.join(dirName, depModuleName);
                const { extensions } = this.options.resolve;
                depModulePath = tryExtensions(depModulePath, extensions);
                // 并且把该子模块加入到依赖列表中
                this.fileDependencies.add(depModulePath);

                // 创建该子模块的模块id (模块id名字都已以src为基本文件夹创建出来的) ./src/title.js
                let depModuleId = "./" + path.posix.relative(toUnixSeq(this.options.context), depModulePath);
                // 修改语法树并且添加依赖
                node.arguments[0] = types.stringLiteral(depModuleId);
                module.dependencies.add({
                    depModuleId,
                    depModulePath
                })
            }
        })

        // 8. 遍历完AST修改后生成代码
        const { code } = generator(ast);
        // 把转换的源代码放入到创建module对象上记录
        module.__source = code;
        console.log(module);

        // 9. 递归处理依赖模块
        [...module.dependencies].forEach(({depModuleId, depModulePath}) => {
            this.buildModule(entryName, depModulePath);
        })
        // 加入到模块依赖中
        this.modules.push(module);

    }
}

function tryExtensions(depModulePath, extensions) {
    // 默认写了后缀
    if (fs.existsSync(depModulePath)) {
        return depModulePath;
    }
    for (let i = 0; i < extensions.length; i++) {
        let filePath = depModulePath + extensions[i];
        if (fs.existsSync(filePath)) {
            return filePath;
        }
    }
    throw new Error(`未找到该模块`);
}

module.exports = Complication;

