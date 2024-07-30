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

// 层序遍历方式看每个节点
// 1. 如果某个节点有右孩子，并且没有左孩子直接false
// 2. 如果第一次遇到两个孩子不全的情况，接下来的节点必须是叶子节点
function completeTree(root) {
    if (root === null) return true;
    let queue = [root];
    let flag = true;
    let mustLeaf = false;
    while (queue.length > 0) {
        let cur = queue.shift();
        // 情况1
        if (cur.left === null && cur.right) {
            flag = false;
            break;
        }
        // 情况2
        if (mustLeaf && (cur.left || cur.right)) {
            flag = false;
            break;
        }
        if (!cur.right) {
            mustLeaf = true;
        }
        if (cur.left) queue.push(cur.left);
        if (cur.right) queue.push(cur.right);
    }

    return flag;
}
console.log(completeTree(tree.root));



class Info {
    constructor(isFull, isCST, height) {
        this.isFull = isFull; //   是否满二叉树
        this.isCST = isCST;   //   是否是完全二叉树
        this.height = height; //   当前树高度
    }
}

function completeTree2(root) {
    if (root === null) return true;
    return process(root).isCST;

    function process(x) {
        if (x === null) return new Info(true, true, 0);

        let leftInfo = process(x.left);
        let rightInfo = process(x.right);

        // 高度
        let height = Math.max(leftInfo.height, rightInfo.height) + 1;
        // 是否为满树
        let isFull = leftInfo.isFull && rightInfo.isFull && (leftInfo.height === rightInfo.height);

        // 是否为完全，默认不是匹配上了条件就是
        let isCST = false;

        // 可能性1：左右两边都是满的的并且高度相等，组合后就是满二叉树
        if (leftInfo.isFull && rightInfo.isFull && (leftInfo.height === rightInfo.height)) {
            isCST = true;
            // 可能性2：左完全，右满，左比右高1
        } else if(leftInfo.isCST && rightInfo.isFull && leftInfo.height === rightInfo.height + 1) {
            isCST = true;
            // 可能性3： 左满、右满、左比右高1
        } else if(leftInfo.isFull && rightInfo.isFull && leftInfo.height === rightInfo.height + 1) {
            isCST = true
            // 可能性4： 左满、右完全、左右高相等
        } else if(leftInfo.isFull && rightInfo.isCST && leftInfo.height === rightInfo.height) {
            isCST = true;
        }

        return new Info(isFull, isCST, height);
    }
}

console.log(completeTree2(tree.root));


