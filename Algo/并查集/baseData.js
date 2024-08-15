class Node {
    constructor(value) {
        this.value = value;
    }
}


// 假设集合为 a b c d e;
// let a = new Node('a');
// let b = new Node('b');
// let c = new Node('c');
// let d = new Node('d');
// let e = new Node('e');

// ["a", "b", "c", "d", "e"]
class UnionSet {
    constructor(list) {
        // 1. 值对应节点关系 value -> node(value)
        this.nodeMap = new Map();
        // 2. 直接父亲节点  node -> parentNode
        this.parentNode = new Map();
        // 3. 代表节点的大小 firstLevelNode -> num
        this.sizeMap = new Map();
        this.init(list);
    }

    // 根据传入的list初始化数据状态
    init(list) {
        for (let i = 0; i < list.length; i++) {
            let cur = list[i];
            let node = new Node(cur);
            // 设置节点和值进行对应
            this.nodeMap.set(cur, node);
            // 默认开始将自己的父节点指向自己  自己->父亲
            this.parentNode.set(node, node);
            // 设置当前代表节点的大小
            this.sizeMap.set(node, 1);
        }
    }

    // 判断是否是相同的集合
    isSameSet(valueA, valueB) {
        return this.findFirstLevel(this.nodeMap.get(valueA)) === this.findFirstLevel(this.nodeMap.get(valueB));
    }

    // 设置为相同集合
    union(valueA, valueB) {
        // // 先判断是否是相同集合
        // let isSameSet = this.isSameSet(valueA, valueB);
        // // 不同集合才进行设置
        // if (!isSameSet) {
        //     let nodeA = this.nodeMap.get(valueA);
        //     let nodeB = this.nodeMap.get(valueB);
        //     // 获取两者代表节点
        //     let nodeAFirstLevel = this.findFirstLevel(nodeA);
        //     let nodeBFirstLevel = this.findFirstLevel(nodeB);
        //     // 获取两者代表节点的size
        //     let nodeAFirstLevelSize = this.sizeMap.get(nodeAFirstLevel);
        //     let nodeBFirstLevelSize = this.sizeMap.get(nodeBFirstLevel);
        //
        //     // 小的挂大的
        //     let bigFistLevel = nodeAFirstLevelSize >= nodeBFirstLevelSize ? nodeAFirstLevel : nodeBFirstLevel;
        //     let smallFistLevel = bigFistLevel === nodeAFirstLevel ? nodeBFirstLevel : nodeAFirstLevel;
        //     this.parentNode.set(smallFistLevel, bigFistLevel);
        //     this.sizeMap.delete(smallFistLevel);
        //     this.sizeMap.set(bigFistLevel, nodeAFirstLevelSize + nodeBFirstLevelSize);
        // }

        // 优化可以直接获取头部节点进行设置
        let aHead = this.findFirstLevel(this.nodeMap.get(valueA));
        let bHead = this.findFirstLevel(this.nodeMap.get(valueB));

        if (aHead !== bHead) {
            let aHeadSize = this.sizeMap.get(aHead);
            let bHeadSize = this.sizeMap.get(bHead);
            let big = aHeadSize >= bHeadSize ? aHead : bHead;
            let small = big === aHead ? bHead : aHead;
            this.parentNode.set(small, big);
            this.sizeMap.set(big, aHeadSize + bHeadSize);
            this.sizeMap.delete(small);
        }
    }

    // 找出顶级代表节点
    findFirstLevel(cur) {
        let parentNode = this.parentNode.get(cur);
        let stack = [];
        // 如果当前节点不等于顶级节点则说明还未找打
        while (parentNode !== cur) {
            // 将链条上的节点放入栈中，之后依此进行扁平化
            stack.push(cur);
            cur = parentNode;
            parentNode = this.parentNode.get(cur);
        }
        while (stack.length > 0) {
            let node = stack.pop();
            this.parentNode.set(node, parentNode);
        }
        return parentNode;
    }
}

// let unionSet = new UnionSet(["a", "b", "c", "d", "e"]);

// unionSet.union("b", "c");
// unionSet.union("a", "b");

// console.log(unionSet.isSameSet("a", "c"));
// console.log(unionSet);


module.exports = {
    UnionSet
}