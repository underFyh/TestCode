const { createGraph } = require("./02结构转换");

let matrix = [
    [1, "a", "b"],
    [6, "a", "c"],
    [2, "a", "d"],
    [2, "b", "c"],
    [6, "b", "e"],
    [5, "c", "d"],
    [1, "c", "e"],
    [10, "d", "e"],
    [2, "f", "e"],
]

let graph = createGraph(matrix);

/**
 *
 * @param node 需要求的点
 */
function dijkstra1(node) {
    // 1. 初始化登记表，默认只有自己，然后每条边进行考察，解锁出能到的点
    let distance = new Map();
    distance.set(node, 0);

    // 2. 开始考察节点的每条边(宽度优先遍历)
    let queue = [node];
    let set = new Set(); // 防止环状重复
    set.add(node);

    while (queue.length > 0) {
        // 当前考察的点
        let node = queue.pop();
        let edges = [...node.edges];
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            // 没有记录之前能到的点登记到表中
            if (!distance.has(edge.to)) {
                distance.set(edge.to, edge.weight);
            } else {
                // 之前登记过，对比距离
                let oldDistance = distance.get(edge.to);
                let newDistance = edge.weight + distance.get(edge.from);
                if (newDistance < oldDistance) {
                    distance.set(edge.to, newDistance);
                }
            }
        }
        // 所有直接邻居入队列进行下次考察
        for (let i = 0; i < node.next.length; i++) {
            let nextNode = node.next[i];
            if (!set.has(nextNode)) {
                queue.unshift(nextNode);
                set.add(nextNode);
            }
        }
    }


    console.dir(distance, {depth: 1});
}

dijkstra1(graph.nodes.get("a"));