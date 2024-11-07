const babelCore = require('@babel/core');
const types = require('@babel/types');
const importPlugin = require('./importPlugin');


const sourceCode = `
 import {add, min} from "lodash";
`


let target = babelCore.transform(sourceCode, {
    plugins: [importPlugin({ libraryName: "lodash", libraryDirectory: "" })]
})


console.log(target.code);
