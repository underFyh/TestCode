const { Node, Edge, Graph } = require("./01dataBase");

let matrix = [
    [5, 0, 6],
    [1, 0, 3],
    [2, 3, 6],
];


function createGraph(matrix) {
    let graph = new Graph();

    for (let i = 0; i < matrix.length; i++) {
        let auth = matrix[i][0]; // 边权重值
        let from = matrix[i][1]; // 起始值
        let to = matrix[i][2]; // 终点值

        if (!graph.nodes.has(from)) {
            graph.nodes.set(from, new Node(from));
        }
        if (!graph.nodes.has(to)) {
            graph.nodes.set(to, new Node(to));
        }

        // 获取起始节点
        let fromNode = graph.nodes.get(from);
        // 获取目标节点
        let toNode = graph.nodes.get(to);

        // 创建边信息
        let edge = new Edge(auth, fromNode, toNode);
        fromNode.out++; // 起始节点出度+1
        toNode.in++; // 目标节点入度+1
        fromNode.next.push(toNode); // 起始节点直接邻居
        fromNode.edges.push(edge); // 起始边信息
        graph.edges.add(edge); // 记录在图结构中
    }

    return graph;
}

// console.dir(createGraph(matrix), {depth: 5});


module.exports = {
    createGraph
}