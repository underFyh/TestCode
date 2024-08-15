
// 点类
class DirectedGraphNode {
    constructor(x) {
        this.label = x; // 点值
        this.neighbors = []; // 直接邻居
    }
}

// 记录类型
class Record {
    constructor(node, nodeCount) {
        this.node = node; // 当前点
        this.nodeCount = nodeCount; // 当前点路径有多少个点次
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


// curNode: 当前来到cur点，并且返回cur点后续所有的点次
// order: 缓存，key为某一个点 value记录点次多少
function f(curNode, order) {
    if (order.has(curNode)) return order.get(curNode);

    let nodeCount = 0;
    for (let i = 0; i < curNode.neighbors.length; i++) {
        let nextNode = curNode.neighbors[i];
        nodeCount += f(nextNode, order).nodeCount;
    }
    // 加上自己的节点
    let ans = new Record(curNode, nodeCount + 1);
    order.set(curNode, ans);
    return ans;
}

console.log(f(nodeA, new Map()));