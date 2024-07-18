const { BinaryTree, TreeNode } = require("./baseData");

// 使用示例
const tree = new BinaryTree();
let A = new TreeNode("A");
let B = new TreeNode("B");
let C = new TreeNode("C");
let D = new TreeNode("D");
let E = new TreeNode("E");
let F = new TreeNode("F");
let G = new TreeNode("G");
A.left = B;
A.right = C;
B.left = D;
B.right = E;
C.left = F;
C.right = G;
tree.root = A;

/*
*     A
*   B    C
* D  E  F  G
*
* */


function prev(root) {
    if (root === null) return;
    // console.log(root.value);
    prev(root.left);
    console.log(root.value);
    prev(root.right);
}
prev(tree.root);

console.log("-------------先序遍历----------------");
// 头-左-右
function prev2(root) {
    if (root !== null) {
        let stack = [];
        // 1. 先将头节点压入栈
        stack.push(root);
        while (stack.length !== 0) {
            root = stack.pop();
            // 2. 弹出的时候就打印，然后优先推入右节点、再推入左节点
            console.log(root.value);
            if (root.right !== null) stack.push(root.right);
            if (root.left !== null) stack.push(root.left);
        }
    }
}

// prev2(tree.root);
console.log("-------------后序遍历----------------");
// 将先序中的入栈循序改为先左节点然后右节点，则打印属性为头-右-左，然后再逆序则是左-右-头后序遍历
function back2(root) {
    if (root !== null) {
        let stack = [];
        let consoleStack = [];
        stack.push(root);
        while (stack.length !== 0) {
            root = stack.pop();
            consoleStack.push(root);
            if (root.left !== null) stack.push(root.left);
            if (root.right !== null) stack.push(root.right);
        }
        // 打印后序
        while (consoleStack.length !== 0) {
            root = consoleStack.pop();
            console.log(root.value);
        }
    }
}

// back2(tree.root);

console.log("-------------中序遍历----------------");
// 中序遍历
function inOrder(cur) {
    if (cur !== null) {
        let stack = [];
        while (stack.length !== 0 || cur !== null) {
            if (cur !== null) {
                stack.push(cur);
                cur = cur.left;
            } else {
                cur = stack.pop();
                console.log(cur.value);
                cur = cur.right;
            }
        }
    }
}

inOrder(tree.root);

