const { createGraph } = require("./02结构转换");

let matrix = [
    [0, "a", "b"],
    [0, "a", "c"],
    [0, "b", "c"],
    [0, "b", "d"],
    [0, "c", "e"],
    [0, "c", "f"],
    [0, "d", "e"],
    [0, "e", "f"],
]

let graph = createGraph(matrix);

function bfs(startNode) {
    if (startNode === null) return;
    let queue = [startNode];
    let set = new Set();
    set.add(startNode);

    while (queue.length > 0) {
        let cur = queue.pop();
        // 打印
        console.log(cur.value);
        let next = cur.next;
        for (let i = 0; i < next.length; i++) {
            let nextNode = next[i];
            if (!set.has(nextNode)) {
                queue.unshift(nextNode);
                set.add(nextNode);
            }
        }
    }
}

// a b c d e f
bfs(graph.nodes.get("a"));