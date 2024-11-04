// JS转换为AST
const esprima = require("esprima");
// 遍历语法树，用来修改树上节点
const estraverse = require("estraverse");
// 把修改后的语法树重新生成源代码
const escodegen = require("escodegen");

// 1. 源代码转换为语法树
// 2. 遍历语法树,访问器(进入、离开)
// 3.

let indent = 0;
const padding = () => ' '.repeat(indent);

let sourceCode = `function as(){}`;
let ast =esprima.parse(sourceCode);

console.dir(ast, {depth: 3});
estraverse.traverse(ast, {
    enter(node) {
        console.log(`${padding()}进入:${node.type}`);
        if (node.type === "Identifier") { node.name = "aaaa" }
        indent += 2;
    },
    leave(node) {
        indent -= 2;
        console.log(`${padding()}离开:${node.type}`);
    }
})


console.log(escodegen.generate(ast));

