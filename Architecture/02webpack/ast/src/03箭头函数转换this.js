const babelCore = require("@babel/core") // 核心库
const types = require("@babel/types"); // 类型判断和类型创建（AST语法树上各种节点类型）


let sourceCode = `
    const sum = (a, b) => {
        console.log(this)
        const min = (a, b) => {
            console.log(this)
            return a - b;
        }
        return a + b;
    }
`
/**
 * var _this = this;
 * const sum = function (a, b) {
 *   console.log(_this);
 *   return a + b;
 * };
 */

let arrowToFunction = {
    visitor: {
        ArrowFunctionExpression(path) {
            const { node } = path;
            // 1. 先改为普通函数
            if (node.type === "ArrowFunctionExpression") {
                node.type = "FunctionExpression";
            }
            // 2. 判断内部是否使用了this
            hostArrowFunctionEnv(path);
        }
    }
}

function hostArrowFunctionEnv(path) {
    // 1. 判断内部是否使用了this，如果有则收集所有使用this的path信息
    const thisPaths = collectThisPaths(path);
    // console.log(thisPaths);

    // 2. 向上找到第一个非箭头函数（可以是普通函数或者全局环境）path环境
    let thisEnv = path.findParent((parent) => {
        return (parent.isFunction() && !parent.isArrowFunctionExpression()) || parent.isProgram();
    })

    // 3. 分析该环境使用已经使用变量保存了this,如果有则获取它的标识符（变量名字，如 var _self = this）
    let thisBinding = getBindingIdentifier(thisEnv.scope);
    console.log(thisBinding);

    // 4. 如果上层没有声明this则进行创建
    if (!thisBinding) {
        // 生成唯一变量名
        let varName = thisEnv.scope.generateUid('this');
        // 将变量名转换为标识符
        thisBinding = types.identifier(varName);
        // 放入当需要创建的环境中
        thisEnv.scope.push({
            id: thisBinding,
            init: types.thisExpression()
        })
    }

    // 5. 替换箭头函数里所有用到的this
    if (thisPaths.length > 0) {
        thisPaths.forEach(thisPath => {
            thisPath.replaceWith(thisBinding)
        })
    }

}

// 获取当前箭头函数里面所有用到的this
function collectThisPaths(path) {
    let thisPaths = [];
    // 也是一个AST树
    path.traverse({
        // 普通函数内部直接跳过
        FunctionDeclaration(path) {
            path.skip()
        },
        ThisExpression(path) {
            thisPaths.push(path)
        }
    })
    return thisPaths;
}

// 返回变量赋值为this的标识
function getBindingIdentifier(scope) {
    // 查看该作用域绑定了哪些变量,如果有的变量赋值了this则获取它的标识符
    for (const bindingName in scope.bindings) {
        const binding = scope.bindings[bindingName];
        if (binding.kind === "const" || binding.kind === "let" || binding.kind === "var" ) {
            const initValue = binding.path.node.init;
            if (types.isThisExpression(initValue)) {
                return binding.identifier;
            }
        }
    }
    return null;
}




let target = babelCore.transform(sourceCode, {
    plugins: [arrowToFunction]
})

console.log(target.code);


