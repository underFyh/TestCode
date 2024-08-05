class UnionFind {
    constructor(M) {
        this.parent = [];
        this.size = [];
        this.row = M.length;
        this.col = M[0].length;
        // 岛数量默认为0点（connect）一个会增加一个
        this.sets = 0;
        this.init(M);
    }

    init(M) {
        let row = M.length;
        let col = M[0].length;
        let len = row * col;
        for (let i = 0; i < len; i++) {
            this.parent[i] = i;
            // 集合默认0个，说明没有点开这个集合
            this.size[i] = 0;
        }
    }

    getIndex(r, c) {
        return r * this.col + c;
    }

    // 寻找代表节点
    find(i) {
        // 当做栈，记录每次寻找的父节点
        let help = [];
        let hi = 0;
        while (i !== this.parent[i]) {
            help[hi++] = i;
            i = this.parent[i];
        }
        for (hi--; hi >= 0; hi--) {
            this.parent[help[hi]] = i;
        }
        return i;
    }

    // 点击
    connect(r, c) {
        let index = this.getIndex(r, c);
        // 说明该区域第一次点击为1，避免重复点击
        if(this.size[index] === 0) {
            // 岛的数量++
            this.sets++;
            this.size[index] = 1;
            // 左右上下进行合并计算，如果符合合并条件则
            this.union(r - 1, c, r, c); // 上合并
            this.union(r + 1, c, r, c); // 下合并
            this.union(r, c - 1, r, c); // 左合并
            this.union(r, c + 1, r, c); // 右合并
        }
    }

    // 合并
    union(r1, c1, r2, c2) {
        // 越界则直接退出
        if (r1 >= this.row || r2 >= this.row || c1 >= this.col || c2 >= this.col || r1 < 0 || r2 < 0 || c1 < 0 || c2 < 0) return
        let i1 = this.getIndex(r1, c1);
        let i2 = this.getIndex(r2, c2);
        // 如果合并的节点某一个为0，则直接退出，说明没有被赋值过
        if (this.size[i1] === 0 || this.size[i2] === 0) return;
        let f1 = this.find(i1);
        let f2 = this.find(i2);
        // f1 f2为代表节点是什么
        if (f1 !== f2) {
            if (this.size[f1] >= this.size[f2]) {
                this.parent[f2] = f1;
                this.size[f1] += this.size[f2];
            } else {
                this.parent[f1] = f2;
                this.size[f2] += this.size[f1];
            }
            this.sets--;
        }
    }
}



let arr = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

// 此题就需要使用并查集进行处理
// M = arr   path = [[0, 0], [0, 1]]
function dynamicIsland(M, path) {
    let res = [];
    const uf = new UnionFind(M);
    for (let i = 0; i < path.length; i++) {
        let r = path[i][0];
        let c = path[i][1];
        uf.connect(r, c);
        res.push(uf.sets);
    }
    return res;
}

console.log(dynamicIsland(arr, [[0, 0], [0, 2]]));


