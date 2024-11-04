const importModuleHelper = require('@babel/helper-module-imports');
const template = require("@babel/template");
const types = require("@babel/types");

function autoLoggerPlugin(options) {
    return {
        visitor: {
            Program: {
                enter(path, state) {
                    // 代表 import logger from "logger" 前面的logger,也就是需要添加的函数名
                    let loggerFnName = null;
                    path.traverse({
                        // 1. 遍历是否有引入
                        ImportDeclaration(importPath) {
                            // 1.1 判断引入的库名称是否和配置名称相同
                            // 通过path.get可以快速获取引入名称
                            if(options.libName === importPath.get("source").node.value) {
                                // 1.2相同则说明已经手动引入了,直接获取到该标识符信息并赋值给loggerFnName
                                // import xxx from "logger" 则会将xxx赋值给loggerFnName
                                // specifiers的值为数组通过.0可以获取第一项
                                loggerFnName = importPath.get("specifiers.0").node.local.name;
                                // 停止Program遍历ImportDeclaration
                                path.stop();
                            }
                        }
                    })

                    // 2. 遍历完后如果没有值则说明没有引入需要手动创建
                    if (!loggerFnName) {
                        let libName = options.libName; // logger
                        // 通过babel提供的这个函数快速创建import语句插入到全局Program中,并且把名字传递给loggerFnName
                        loggerFnName = importModuleHelper.addDefault(path, libName, {
                            // 如果该作用域已经有声明了logger则换一个变量代替
                            // 如果有 var logger = xxx; 则会生成 import _logger2 from "logger";
                            nameHint: path.scope.generateUid(libName)
                        }).name
                    }

                    // 3. 通过上面两个步骤后一定有loggerId标识符，挂载到state中去提供给后面的访问器使用
                    // 可以理解为访问器共享参数，但是要注意访问器的执行顺序
                    console.log(loggerFnName);
                    state.loggerFnName = loggerFnName;
                }
            },
            "FunctionDeclaration|FunctionExpression|ArrowFunctionExpression|ClassMethod"(path, state) {
                const { node } = path;
                let loggerFnName = state.loggerFnName;
                // 1. 通过之前处理的loggerFnName创建函数表达式 logger('函数名')插入到函数中
                // let loggerNode = types.expressionStatement(
                //     types.callExpression(
                //         types.identifier(loggerFnName),
                //         // 参数列表因为各个不同的函数声明获取name方式不一样这里用callFnName简化
                //         [types.stringLiteral("callFnName")]
                //     )
                // )
                // 或者使用@babel/template简化生成AST,注意需要执行
                let loggerNode = template.statement(`${loggerFnName}("callFnName")`)();


                // 如果函数内部是语句块 {} 则可以直接插入
                if (types.isBlockStatement(node.body)) {
                    node.body.body.unshift(loggerNode);
                } else {
                    // 非代码块形式 (a, b) => a - b
                    const newNode = types.blockStatement([
                        loggerNode,
                        types.returnStatement(node.body)
                    ]);
                    path.get('body').replaceWith(newNode);
                }
            }
        }
    }
}

module.exports = autoLoggerPlugin;
