const {BinaryTree, TreeNode} = require("./baseData");

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

// 高度为h的满二叉树 节点为 2^h次方 - 1个节点

class Info {
    constructor(isFull, height, nodeCount) {
        this.isFull = isFull;
        this.height = height;
        this.nodeCount = nodeCount;
    }
}


function fullTree(root) {
    if (root === null) return true;

    return process(root).isFull;

    function process(x) {
        if (x === null) return new Info(true, 0, 0);
        // 1. 向左右两树要信息
        let leftInfo = process(x.left);
        let rightInfo = process(x.right);

        // 2. 整合信息
        let height = Math.max(leftInfo.height, rightInfo.height) + 1;
        let nodeCount = leftInfo.nodeCount + rightInfo.nodeCount + 1;

        let isFull = false;
        if (Math.pow(2, height) - 1 === nodeCount) isFull = true;

        return new Info(isFull, height, nodeCount);
    }
}

console.log(fullTree(tree.root));