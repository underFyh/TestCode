const babelCore = require("@babel/core") // 核心库
const types = require("@babel/types"); // 类型判断和类型创建（AST语法树上各种节点类型）

// 引入插件转换
const arrowFunction = require("babel-plugin-transform-es2015-arrow-functions");
// 编写该插件,对比新旧的ast树进行对比编写
const arrowFunction2 = {
    visitor: {
        // 当遍历到箭头函数类型时候执行此函数
        ArrowFunctionExpression(path) {
            const { node } = path;
            // 1. 先将这个箭头函数类型改为函数表达式
            node.type = "FunctionExpression";
            // 2. 这个箭头函数内部是直接返回值没有用return，它的body类型是BinaryExpression现在改为普通的return块级语句类型
            let body = node.body;
            if (!types.isBlockStatement(body)) {
                // 创建一个块级类型放入,并且内部放入返回类型
                node.body = types.blockStatement([
                    types.returnStatement(body)
                ])
            }
        }
    }
}


// 转化普通函数return形式
let sourceCode = `
    const sum = (a, b) => a + b;
`
let targetSource = babelCore.transform(sourceCode, {
    plugins: [
        arrowFunction2 // 插件
    ]
})
console.log(targetSource.code);



// // 箭头函数使用外部作用域的this
// let sourceCode2 = `
//     const sum = (a, b) => {
//         console.log(this);
//         return a + b;
//     };
// `
