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
    // 1. 初始化登记表，默认只有自己，然后每条边进行考察，解锁出能到的点，表中没有登记的说明目前不可达
    let distance = new Map();
    let touchedNode = new Set();
    distance.set(node, 0);
    let minNode = node;
    while (minNode !== null) {
        let edges = [...minNode.edges];
        for (let i = 0; i < edges.length; i++) {
            let edge = edges[i];
            // 需要登记的点
            let toNode = edge.to;
            // 没有登记过去的点距离则进行登记
            if (!distance.has(toNode)) {
                distance.set(toNode, edge.weight);
            } else {
                // 登记过获取旧距离和新距离进行比较
                let oldDistance = distance.get(toNode);
                let newDistance = distance.get(edge.from) + edge.weight;
                if (newDistance < oldDistance) {
                    distance.set(toNode, newDistance);
                }
            }
        }
        touchedNode.add(minNode);
        minNode = findMinNode(distance, touchedNode);
    }


    console.dir(distance, {depth: 1});

    // 根据距离表和已访问的节点来获取剩余最小点（可用加强堆优化）
    function findMinNode(distanceMap, touchedNode) {
        // 根据distanceMap中的value选择当前表中最短路径
        let minNode = null;
        let minValue = Infinity;
        for (let [key, value] of distanceMap) {
            if (value < minValue && !touchedNode.has(key)) {
                minValue = value;
                minNode = key;
            }
        }
        return minNode;
    }
}

// { a->0, b->1, c->3, d->2, e->4 }
dijkstra1(graph.nodes.get("a"));