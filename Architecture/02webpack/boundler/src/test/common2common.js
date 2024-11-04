// tittle.js  module.exports = "titleMod"

// 依赖模块
let allModules = {
    "./src/tittle.js": (module, exports, require) => {
        module.exports = "titleMod"
    }
}

// 运行时
function myRequire(chunkId) {
    let module = {
        exports: {}
    }
    allModules[chunkId](module, module.exports, require);
    return module.exports;
}


let tittle = myRequire("./src/tittle.js");

console.log(tittle);
