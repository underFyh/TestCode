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
C.left = null;
C.right = G;
tree.root = A;


console.dir(tree, { depth: 10 });


// 1. 先序序列化
function preSerialization(head, array = []) {
    if (head === null) {
        array.push(null);
        return;
    }
    array.push(head.value);
    preSerialization(head.left, array);
    preSerialization(head.right, array);
    return array;
}

let sqList = preSerialization(tree.root);
console.log(sqList, 1);

// 2. 先序反序列化 - 一个节点来到了三次
function rePreSerialization(array) {
    if (!array || array.length === 0) return null;
    return gen(array);

    function gen(array) {
        let v = array.shift();
        if (v === null) return null;
        let head = new TreeNode(v);
        head.left = gen(array);
        head.right = gen(array);

        return head;
    }
}

console.dir(rePreSerialization(sqList), { depth: 10 });



// 3. 层序序列化
function levelSerialization(head) {
    if (head === null) return [];
    let queue = [head];
    let sqList = [];
    while (queue.length > 0) {
        let node = queue.shift();
        if (node === null) {
            sqList.push(null);
        } else {
            sqList.push(node.value);
            // 需要保留空节点，所以需要直接推入到队列中，下次弹出的时候判断
            queue.push(node.left);
            queue.push(node.right);
        }
    }
    return sqList;
}

console.log(levelSerialization(tree.root));
const sqListLevel = levelSerialization(tree.root);

// 4. 层序遍历反序列化
function reLevelSerialization(array) {
    if (!array || array.length === 0) return null;
    return gen(array);

    function gen(array) {
        let value = array.shift();
        if (value === null) return null;
        let head = new TreeNode(value);
        let queue = [head];
        while (queue.length > 0) {
            let cur = queue.shift();
            let leftValue = array.shift();
            let rightValue = array.shift();
            if (leftValue === null) {
                cur.left = null
            } else {
                cur.left = new TreeNode(leftValue);
            }
            if (rightValue === null) {
                cur.right = null
            } else {
                cur.right = new TreeNode(rightValue);
            }
            if (cur.left) queue.push(cur.left);
            if (cur.right) queue.push(cur.right);
        }
        return head;
    }
}

function buildByLevelQueue(list) {
    if (!list || list.length === 0) return null;
    // 生成头结点,可能为null则直接返回null
    let head = genNode(list.shift());
    let queue = [];
    // 如果为null则while不会执行
    if (head !== null) {
        queue.push(head);
    }
    while (queue.length > 0) {
        let cur = queue.shift();
        cur.left = genNode(list.shift());
        cur.right = genNode(list.shift());

        if (cur.left) queue.push(cur.left);
        if (cur.right) queue.push(cur.right);
    }

    return head;

    // 生成一个节点
    function genNode(value) {
        if (value === null) return null;
        return new TreeNode(value);
    }
}

// console.dir(reLevelSerialization(sqListLevel), {depth: 10 });
console.dir(buildByLevelQueue(sqListLevel), {depth: 10 });




