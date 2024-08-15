
// 点类
class DirectedGraphNode {
    constructor(x) {
        this.label = x; // 点值
        this.neighbors = []; // 直接邻居
    }
}

// 记录类型
class Record {
    constructor(node, deep) {
        this.node = node; // 当前点
        this.deep = deep; // 当前点最大深度
    }
}


let nodeA = new DirectedGraphNode("a");
let nodeB = new DirectedGraphNode("b");
let nodeC = new DirectedGraphNode("c");
let nodeE = new DirectedGraphNode("e");
let nodeF = new DirectedGraphNode("f");
let nodeH = new DirectedGraphNode("h");

nodeA.neighbors = [nodeB];
nodeB.neighbors = [nodeE, nodeC];
nodeE.neighbors = [nodeF];
nodeC.neighbors = [nodeF, nodeH];


/**
 *
 * @param curNode 要求的节点深度
 * @param order   key：当前节点  value: 深度值Record对象
 * @return Record
 */
function f(curNode, order) {
    if (order.has(curNode)) return order.get(curNode);
    let childDeepArr = [];
    // 最大值优化方案： let deep = 0;
    for (let i = 0; i < curNode.neighbors.length; i++) {
        let nextNode = curNode.neighbors[i];
        childDeepArr.push(f(nextNode, order).deep);
        // 最大值优化方案： deep = Math.max(deep, f(nextNode, order).deep)
    }
    let deepValue = childDeepArr.length === 0 ? 0 : Math.max(...childDeepArr);
    let ans = new Record(curNode, deepValue + 1);
    order.set(curNode, ans);
    return ans;
}

console.log(f(nodeA, new Map()));
// console.log(f(nodeF, new Map()));

