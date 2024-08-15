const { createGraph } = require("./02结构转换");

// 构造出无向图
let matrix = [
    [50, "a", "b"],
    [50, "b", "a"],
    [2, "a", "c"],
    [2, "c", "a"],
    [100, "a", "e"],
    [100, "e", "a"],
    [3, "b", "c"],
    [3, "c", "b"],
    [1, "c", "e"],
    [1, "e", "c"],
]

let graph = createGraph(matrix);

function primMST(graph) {
    // 记录结果
    let result = [];
   // 1. 随机获得一个点这里假设获取第一个点,循环一层即可
    let nodes = [...graph.nodes.values()];
    for (let i = 0; i < nodes.length; i++) {
        let selectedNode = nodes[i];
        let touchedNode = new Set();
        touchedNode.add(selectedNode);

        // 2. 获取当前点所有的边并且根据权值进行排序(可以用小堆进行优化),这里先每次排序
        let edges = ([...selectedNode.edges]).sort((a, b) => a.weight - b.weight);

        // 3. 选择权重最小的边出来解锁其他访问过的点和边
        while (edges.length > 0) {
            let curEdge = edges.shift();

            // 当前路径访问的节点没有被处理过
            if (!touchedNode.has(curEdge.to)) {
                result.push(curEdge);
                touchedNode.add(curEdge.to);
                // 将该节点下所有的边加入，并且重新从小到大排序
                let nextNodeEdges = [...curEdge.to.edges];
                edges = edges.concat(...nextNodeEdges);
                edges.sort((a, b) => a.weight - b.weight);
            }
        }
        break;
    }
    return result;
}

// [2, 1, 3]
primMST(graph);