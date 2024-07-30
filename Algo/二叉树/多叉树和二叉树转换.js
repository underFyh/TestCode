const {BinaryTree, TreeNode} = require("./baseData");

class MultipleTree {
    constructor(value, children) {
        this.value = value;
        this.children = children || [];
    }
}

let A = new MultipleTree("A");
let B = new MultipleTree("B");
let C = new MultipleTree("C");
let D = new MultipleTree("D");
let E = new MultipleTree("E");
let F = new MultipleTree("F");
let G = new MultipleTree("G");
let H = new MultipleTree("H");

A.children = [B, C, D];
B.children = [E];
D.children = [F, G, H];

console.dir(A, {depth: 10});

function toBinaryTree(multipleTree) {
    if (multipleTree === null || multipleTree.children.length === 0) return null;
    let head = new TreeNode(multipleTree.value);
    // 转换的二叉树头结点一定只有左子树
    head.left = en(multipleTree.children);

    function en(children) {
        let head = null;
        let cur = null
        for (let i = 0; i < children.length; i++) {
            let node = new TreeNode(children[i].value);
            // 将第一个设置为左子树头结点
            if (head === null) {
                head = node
            } else {
                // 其他的子节点设置为左子树的右边界
                cur.right = node;
            }
            cur = node;
            cur.left = en(children[i].children);
        }
        return head
    }
    return head;
}

// console.dir(toBinaryTree(A), { depth: 10 });

let binTree = toBinaryTree(A);
console.log(binTree);


function binaryTreeToMultipleTree(tree) {
    let head = new MultipleTree(tree.value);
    if (tree.left) {
        // head.children.push(new MultipleTree(tree.left.value));
        head.children.push(binaryTreeToMultipleTree(tree.left));
        let right = tree.left.right;
        while (right) {
            if (right.left === null) {
                // 说明同级节点
                head.children.push(new MultipleTree(right.value));
            } else {
                head.children.push(binaryTreeToMultipleTree(right));
            }
            right = right.right;
        }
    }
    return head;
}

// console.dir(binaryTreeToMultipleTree(binTree), {depth: 10});

function binaryTreeToMultipleTree2(root) {
    if (root === null) return null;
    return new MultipleTree(root.value, de(root.left));
    function de(root) {
        let children = [];
        while (root !== null) {
            let cur = new MultipleTree(root.value, de(root.left));
            children.push(cur);
            root = root.right;
        }
        return children;
    }
}

console.dir(binaryTreeToMultipleTree2(binTree), {depth: 10});

