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


console.dir(tree, {depth: 10});

function level(head) {
    if (head === null) return;
    let stack = [head];

    while (stack.length > 0) {
        let head = stack.shift();
        console.log(head.value);
        if (head.left) stack.push(head.left);
        if (head.right) stack.push(head.right);
    }
}

level(tree.root);


// 最宽层问题： 求出一个二叉树最宽的层为几个
function findMaxLevel(root) {
    if (root === null) return 0;
    let queue = [root];

    let curEnd = root; // 当前层最右节点
    let nextEnd = null; // 下一层最右节点
    let max = 0;
    let curLevelCount = 0;
    while (queue.length > 0) {
        let cur = queue.shift();
        if (cur.left) {
            queue.push(cur.left);
            nextEnd = cur.left;
        }
        if (cur.right) {
            queue.push(cur.right);
            nextEnd = cur.right;
        }
        curLevelCount++;
        // 当前层处理结束
        if (cur === curEnd) {
            max = Math.max(max, curLevelCount);
            curEnd = nextEnd;
            curLevelCount = 0;
            nextEnd = null; // 可以不用
        }
    }

    return max;
}

console.log(findMaxLevel(tree.root));