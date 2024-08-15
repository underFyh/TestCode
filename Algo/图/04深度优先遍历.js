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


function dfs(startNode) {
    if (startNode === null) return;
    console.log(startNode.value); // 初始入栈打印
    let stack = [startNode];
    let set = new Set();
    set.add(startNode);

    while (stack.length > 0) {
        let cur = stack.pop();
        let next = cur.next;
        for (let i = 0; i < next.length; i++) {
            let nextNode = next[i];
            // 如果该邻居没有遍历过则打印然后入栈并且登记,停止邻居节点遍历
            if (!set.has(nextNode)) {
                console.log(nextNode.value);
                stack.push(cur); // 当前节点重新入栈
                stack.push(nextNode); // 并且把该邻居入栈
                set.add(nextNode); // 登记
                break;
            }
        }
    }
}

// a b c e f d
dfs(graph.nodes.get("a"))
