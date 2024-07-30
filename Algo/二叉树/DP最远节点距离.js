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
    constructor(maxDistance, height) {
        this.maxDistance = maxDistance;
        this.height = height;
    }
}

function getMaxDistance(root) {
    if (root === null) return 0;
    return process(root).maxDistance;


    function process(root) {
        // 1. 如果为null则默认最大距离0高度也是0
        if (root === null) return new Info(0,0,);

        // 2. 假设能直接获取到左右两树信息
        let leftInfo = process(root.left);
        let rightInfo = process(root.right);

        // 3. 组装出最远距离(maxDistance)和root树高度height
        let leftMaxDistance = leftInfo.maxDistance;
        let rightMaxDistance = rightInfo.maxDistance;
        let rootMaxDistance = leftInfo.height + rightInfo.height + 1;

        // 在左右子树、或者经过x节点找出最远距离节点
        let maxDistance = Math.max(Math.max(leftMaxDistance, rightMaxDistance), rootMaxDistance);
        let height = Math.max(leftInfo.height, rightInfo.height) + 1;

        return new Info(maxDistance, height);
    }
}

console.log(getMaxDistance(tree.root));



