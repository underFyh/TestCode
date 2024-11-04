const babelCore = require("@babel/core");
const types = require("@babel/types");


const sourceCode = `
    console.log("hi")
`


babelCore.transformAsync(sourceCode, {
    plugins: [logParamPlugin()]
})




// 插件其实是一个函数返回一个对象访问器
function logParamPlugin() {
    const visitor = {
        CallExpression(nodePath, state) {
            const { node } = nodePath;
            console.log(node);
        }
    }
    return {
        visitor
    }
}
