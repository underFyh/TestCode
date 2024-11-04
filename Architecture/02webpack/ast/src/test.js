const babelCore = require("@babel/core") // 核心库
const types = require("@babel/types"); // 类型判断和类型创建（AST语法树上各种节点类型）

// 引入插件转换
const arrowFunction = require("babel-plugin-transform-es2015-arrow-functions");

let sourceCode = `
    let name = "tiantian";
    function age() {
        return 5;
    }
`

const testPlugin = {
    visitor: {
        // 发现函数声明的时候打印出它的路径上下文
        Program(path) {
            console.log("全局path上下文:", path.state);
        },
        FunctionDeclaration(path) {
            // console.log("函数path上下文:", path);
        }
    }
}
let targetSource = babelCore.transform(sourceCode, {
    plugins: [
        testPlugin // 插件
    ]
})






