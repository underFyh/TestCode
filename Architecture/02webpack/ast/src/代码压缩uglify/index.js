const babelCore = require('@babel/core');
const types = require('@babel/types');
const uglifyPlugin = require('./uglifyPlugin');


const sourceCode = `
 var thisIsAlongName = "name";
 function fn() { var thisIsAlongName = "innerName" };
 fn();
`


let target = babelCore.transform(sourceCode, {
    plugins: [uglifyPlugin()]
})


console.log(target.code.replace(/[\r\n]/g, "").replace(/\s{2}/g, " "));
