const { createGraph } = require("./02结构转换");

let matrix = [
    [0, "a", "d"],
    [0, "b", "d"],
    [0, "b", "e"],
    [0, "d", "e"],
    [0, "e", "f"],
]

let graph = createGraph(matrix);

function sortedTopology(graph) {
    // Node -> 入度个数 为了不改变之前的图结构数据
    let inMap = new Map();
    // 入度为0的进入队列
    let queue = [];
    // 拓扑顺序
    let result = [];

    for (let [key, value] of graph.nodes) {
        inMap.set(value, value.in);
        if (value.in === 0) {
            queue.unshift(value);
        }
    }

    while (queue.length > 0) {
        let cur = queue.pop();
        result.push(cur.value);
        // 邻居节点
        let next = cur.next;
        for (let i = 0; i < next.length; i++) {
            let nextNode = next[i];
            inMap.set(nextNode, inMap.get(nextNode) - 1);
            if (inMap.get(nextNode) === 0) {
                queue.unshift(nextNode);
            }
        }
    }

    return result;
}

console.log(sortedTopology(graph));