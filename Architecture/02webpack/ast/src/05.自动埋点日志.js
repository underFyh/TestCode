const babelCore = require("@babel/core");
const types = require("@babel/types");


function logger(dispatchName, ...args) {
    console.log("日志:",dispatchName, args);
}

const sourceCode = `
    function sum(a,b) {
        return a + b;
    }
    sum(1,2)
`


let target = babelCore.transform(sourceCode, {
    plugins: [autoLogger()]
})

console.log(target.code);
eval(target.code);


// 插件其实是一个函数返回一个对象访问器
function autoLogger() {
    const visitor = {
        FunctionDeclaration(path) {
            let { node } = path;
            // 判断函数内是否已经调用了该方法
            let body = node.body.body;
            let hasLogger = body.some(i => i.type === "ExpressionStatement" && i.expression && i.expression.callee.name === "logger");
            // todo: 应该用path.travels变量看看是否使用了 例如 console.log(logger()) 这样判断不出来
            console.log(hasLogger);
            body.unshift(createLoggerAst(node));
        }
    }
    return {
        visitor
    }
}

function createLoggerAst(parentNode) {
    // 获取函数名称
    let functionName = types.stringLiteral(parentNode.id.name);
    // 创建 logger 标识符
    const loggerIdentifier = types.identifier('logger');
    // 创建函数调用,并且传入参数
    const loggerCallExpression = types.callExpression(loggerIdentifier, [functionName, ...parentNode.params]);
    // 创建一个完整的表达式语句
    const loggerStatement = types.expressionStatement(loggerCallExpression);
    return loggerStatement;
}
