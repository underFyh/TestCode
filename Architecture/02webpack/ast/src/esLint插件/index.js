const babelCore = require('@babel/core');
const types = require('@babel/types');
const esLintRemoveConsole = require('./esLintRemoveConsole');


const sourceCode = `
    let a = 1;
    console.log(a);
    console.log(a);
    console.log(a);
`;


let target = babelCore.transform(sourceCode, {
    plugins: [
        esLintRemoveConsole({isAutoFix: true})
    ],
});


console.log(target.code);
