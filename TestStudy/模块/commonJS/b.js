const fs = require("fs");
const path = require("path");


function req(modName) {
    let fileName = path.join(__dirname, modName);
    let content = fs.readFileSync(fileName, "utf-8");
    // 最后一项为函数体
    let fn = new Function('exports', 'require', 'module', '__filename', '__dirname', content + `\n return module.exports;`);
    let module = {
        exports: {}
    }

    return fn(module.exports, req, module, __filename, __dirname);
}

const a = req("a.js");

a();

console.log(exports === module.exports);