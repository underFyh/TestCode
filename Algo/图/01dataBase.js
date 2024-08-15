
class Node {
    constructor(value) {
        this.value = value;
        this.in = 0;
        this.out = 0;
        this.next = [];
        this.edges = [];
    }
}


class Edge {
    constructor(weight, from, to) {
        this.weight = weight; // 权重值
        this.from = from; // 来源Node节点
        this.to = to; // 目标Node节点
    }
}

class Graph {
    constructor() {
        // 1 -> Node(1) 通过点值找到对应的Node点
        this.nodes = new Map();
        // 存放每一条边 new Edge(...)
        this.edges = new Set();
    }
}

module.exports = {
    Node,
    Edge,
    Graph
}