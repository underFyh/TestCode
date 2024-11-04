// 假设引入的tittle.js模块内容为一个esModule
/**
 * export default "tittle_de_value"
 * export age = "age"
 */


// 入口文件引入使用
/**
 * const tittle = require("./src/tittle.js")
 * console.log(tittle)
 */



// 1. 通过webpack引入分析为以下模块依赖
let allModules = {
    "./src/tittle.js": (module, exports, require) => {
        // webpack分析出导出的变量进行创建
        let DEFAULT = "tittle_de_value";
        let age = "age";

        // 1.1 定义当前为esModule
        myRequire.r(module);
        // 1.2 执行d函数给exports对象上设置上取值的getter
        myRequire.d(exports, {
            default: () => DEFAULT,
            age: () => age
        })
    }
}

// 模块调用结果缓存
let cache = {};
function myRequire(moduleId) {
    let moduleValue = cache[moduleId];
    if (moduleValue !== undefined) return moduleValue;

    // 说明需要载入模块（创建模块进行赋值）
    let module = cache[moduleId] = {
        exports: {}
    }

    // 执行模块依赖关系给创建的module赋值然后返回
    allModules[moduleId](module, module.exports, myRequire);
    return module.exports;
}

myRequire.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {value: "Module"});
    }
    Object.defineProperty(exports, "__esModule", {value: true})
}
myRequire.d = function (exports, define) {
    for (let key in define) {
        if (define.hasOwnProperty(key)) {
            Object.defineProperty(exports, key, {
                get: define[key]
            })
        }
    }
}



// 入口文件执行
let aaa = {};
(() => {
    const tittle = myRequire("./src/tittle.js");
    console.log(tittle.age);
    console.log(tittle.default);
})()


