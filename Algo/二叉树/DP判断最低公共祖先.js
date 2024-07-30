/*
*  给定一个二叉树的头结点head和另外两个节点a、b返回a和b的最低公共祖先
*
* */
const { BinaryTree, TreeNode } = require("./baseData");

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


console.log(tree.root);


class Info {
    constructor(findA, findB, ans) {
        this.findA = findA; // 是否找到A节点
        this.findB = findB; // 是否找到B节点
        this.ans = ans;     // 是否相聚
    }
}

function process(x, a, b) {
    if (x === null) return new Info(false, false, null);

    let leftInfo = process(x.left, a, b);
    let rightInfo = process(x.right, a, b);

    let findA = (x === a) || leftInfo.findA || rightInfo.findA;
    let findB = (x === b) || leftInfo.findB || rightInfo.findB;

    // 默认结果为null，如果下面条件没有则说明没有相交
    let ans = null;
    if (leftInfo.ans !== null) {
        ans = leftInfo.ans;
    } else if (rightInfo.ans !== null) {
        ans = rightInfo.ans;
    } else {
        if (findA && findB) {
            ans = x;
        }
    }

    return new Info(findA, findB, ans);
}

console.log(process(tree.root, D, E));

