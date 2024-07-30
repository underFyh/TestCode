const {BinaryTree, TreeNode} = require("./baseData");

let node4 = new TreeNode(4);
let node3 = new TreeNode(3);
let node5 = new TreeNode(5);
let node1 = new TreeNode(1);
let node6 = new TreeNode(6);
let node2 = new TreeNode(2);
let node8 = new TreeNode(8);
let node0 = new TreeNode(0);

node4.left = node3;
node4.right = node5;
node3.left = node1;
node3.right = node6;
node5.left = node2;
node5.right = node8;
node1.left = node0;


class Info {
    constructor(min, max, allSize, maxBSTSize) {
        this.min = min; // 最小值
        this.max = max; // 最大值
        this.allSize = allSize; // 树的节点个数
        this.maxBSTSize = maxBSTSize; // 二叉树的最大节点（如果等于allSize则说明是搜索二叉树）
    }
}

function maxBSTTree(root) {
    if (root === null) return 0;
    return process(root).maxBSTSize;

    function process(x) {
        if (x === null) return null; // 最大值和最小值不好设置，所以返回null上游判断
        let leftInfo = process(x.left);
        let rightInfo = process(x.right);

        let max = x.value;
        let min = x.value;
        // 1. 更新X树的最大和最小值
        if (leftInfo !== null) {
            max = Math.max(max, leftInfo.max);
            min = Math.min(min, leftInfo.min);
        }
        if (rightInfo !== null) {
            max = Math.max(max, rightInfo.max);
            min = Math.min(min, rightInfo.min);
        }

        // 2.判断X树是否为搜索二叉树
        let xBST = true; // 默认将X树看做搜索二叉树，如果条件不匹配则改为false
        let leftBST = leftInfo === null ? true : (leftInfo.allSize === leftInfo.maxBSTSize);
        let rightBST = rightInfo === null ? true : (rightInfo.allSize === rightInfo.maxBSTSize);
        if (leftBST && rightBST) {
            if (leftInfo && leftInfo.max >= x.value) {
                xBST = false;
            }
            if (rightInfo && rightInfo.min <= x.value) {
                xBST = false;
            }
        } else {
            xBST = false;
        }

        // 3. 根据X树是否为搜索二叉树来组装参数
        let leftMaxBSTSize = leftInfo === null ? 0 : leftInfo.maxBSTSize;
        let rightMaxBSTSize = rightInfo === null ? 0 : rightInfo.maxBSTSize;
        let leftAllSize = leftInfo === null ? 0 : leftInfo.allSize;
        let rightAllSize = rightInfo === null ? 0 : rightInfo.allSize;

        // 如果X都是搜索二叉树，则最大maxBSTSize肯定是左树+右树+X节点
        let maxBSTSize = xBST ?  (leftMaxBSTSize + rightMaxBSTSize + 1) : (Math.max(leftMaxBSTSize, rightMaxBSTSize));
        let allSize = leftAllSize + rightAllSize + 1;

        return new Info(min, max, allSize, maxBSTSize);
    }

}

console.log(maxBSTTree(node4));
// console.log(node4);