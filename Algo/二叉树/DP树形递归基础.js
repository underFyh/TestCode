const {BinaryTree, TreeNode} = require("./baseData");

let Node4 = new TreeNode(4);
let Node3 = new TreeNode(3);
let Node5 = new TreeNode(5);
let Node1 = new TreeNode(1);
let Node6 = new TreeNode(6);
let Node0 = new TreeNode(0);
let Node8 = new TreeNode(8);

Node4.left = Node3;
Node4.right = Node5;
Node3.left = Node1;
Node3.right = Node6;
Node5.left = Node0;
Node5.right = Node8;

let root = Node4;
console.dir(root, {depth: 10});

class Info {
    constructor(isBalance, height) {
        this.isBalance = isBalance;
        this.height = height;
    }
}

function process(x) {
    if (x === null) {
        // 空树高度默认为0，并且是平衡树
        return new Info(true, 0);
    }

    let leftInfo = process(x.left);
    let rightInfo = process(x.right);

    // 重点求出当前节点的两个值信息
    // 当前树的高度是左右子树高的那个加上1
    let height = Math.max(leftInfo.height, rightInfo.height) + 1;
    // 默认为true如果不满足则改为false
    let isBalance = true;
    if (!leftInfo.isBalance) isBalance = false;
    if (!rightInfo.isBalance) isBalance = false;
    if (Math.abs(leftInfo.height - rightInfo.height) > 1) isBalance = false;

    return new Info(isBalance, height);
}


class Info2 {
    constructor(isSearch, min, max) {
        this.isSearch = isSearch;
        this.min = min;
        this.max = max;
    }
}

// 判断一棵树是否为搜索二叉树
function isSearchTree(root) {
    // 如果子节点为null的话则不知道左子树具体需要返回哪些信息，那就交给上游进行处理
    if (root === null) return null;

    // 1. 先假设能获取到左树和右树的相关信息
    let leftInfo = isSearchTree(root.left);
    let rightInfo = isSearchTree(root.right);

    // 需要对比左右两颗信息树，如果不满足则判断为非搜索二叉树
    // 开始默认最大值和最小值都为这个子树节点值，然后根据左右两树信息进行更新
    let max = root.value;
    let min = root.value;

    // 更新该树的最大值或者最小值
    if (leftInfo !== null) {
        max = Math.max(max, leftInfo.max);
    }
    if (rightInfo !== null) {
        max = Math.max(max, rightInfo.max);
    }
    if (leftInfo !== null) {
        min = Math.min(min, leftInfo.min);
    }
    if (rightInfo !== null) {
        min = Math.min(min, rightInfo.min);
    }

    // 默认为搜索树，如果满足了任意情况则判断为非搜索树
    let isSearch = true;
    if (leftInfo !== null && !leftInfo.isSearch) {
        isSearch = false;
    }
    if (rightInfo !== null && !rightInfo.isSearch) {
        isSearch = false;
    }
    if (leftInfo !== null && leftInfo.max >= root.value ) {
        isSearch = false;
    }
    if (rightInfo !== null && leftInfo.min <= root.value ) {
        isSearch = false;
    }
    return new Info2(isSearch, min, max);
}

console.log(isSearchTree(root));