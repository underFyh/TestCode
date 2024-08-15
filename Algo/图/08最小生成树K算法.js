const { createGraph } = require("./02结构转换");
const { UnionSet } = require("../并查集/baseData");

let matrix = [
    [50, "a", "b"],
    [2, "a", "c"],
    [100, "a", "e"],
    [3, "b", "c"],
    [1, "c", "e"],
]

let graph = createGraph(matrix);

function kruskalMST(graph) {
    // 1. 将每一个节点作为一个集合父亲指向自己
    let unionFind = new UnionSet([...graph.nodes.values()]);
    // 2. 将边的权重值从小到大排序依此取出，这里没有用小堆
    let edges = [...graph.edges].sort((a, b) => a.weight - b.weight);

    // 3. 依此考察每一条边
    let result = [];
    while (edges.length > 0) {
        let curEdge = edges.shift();
        let from = curEdge.from;
        let to = curEdge.to;

        if (!unionFind.isSameSet(from, to)) {
            result.push(curEdge);
            unionFind.union(from, to);
        }
    }
    return result;
}

console.log(kruskalMST(graph));;