const babelCore = require("@babel/core");
const types = require("@babel/types");
const autoLoggerPlugin = require("./autoLoggerPlugin.js");


const sourceCode = `
   function sum(a, b) {
        return a + b;
   };
   const div = function(a, b) {
        return a / b;
   }
   const minus = (a, b) => a - b;
   class Computer {
        getSum() {
            return 100;
        }
   }
`


let target = babelCore.transform(sourceCode, {
    plugins: [
        autoLoggerPlugin({libName: "logger"})
    ]
})

console.log(target.code);

