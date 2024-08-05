// 如果 m * n 的矩阵特别大，但是空降的K值有很少，只有几个点如何进行处理
// 不进行对矩阵的初始化，而是通过表记录空间的节点信息
// 通过字符串代表选中的集合

class UnionFind {
    constructor(rowNum, colNum) {
        this.rowLen = rowNum;
        this.colLen = colNum;
        // 位置信息记录 "0_1" -> "0_0" 说明01位置的代表集合为00
        this.parent = new Map();
        this.size = new Map();
        this.sets = 0;
    }

    connect(r, c) {
        // [0,1] => 0_1   [11, 12] => 11_12
        let posString = `${r}_${c}`;
        // 如果没有改值，则说明这个路径信息为初始化
        if (!this.parent.has(posString)) {
            this.parent.set(posString, posString);
            this.size.set(posString, 1);
            this.sets++;

            // 上下左右进行合并
            this.union(r - 1, c, r, c);
            this.union(r + 1, c, r, c);
            this.union(r, c + 1, r, c);
            this.union(r, c - 1, r, c);
        }
    }

    // 寻找代表节点
    // [0,0]和[0,1]合并 [0,2]和[0,3]合并，然后再将两个集合进行合并
    // 0_0 -> 0_0   0_1 -> 0_0  |  0_2 -> 0_2   0_3->0_2
    // 0_0 -> 0_0   0_1 -> 0_0     0_2 -> 0_0   0_3->0_2 (需要扁平化这个链条直接指向0_0)
    find(r, c) {
        let pos = `${r}_${c}`;
        let help = []
        let recordIndex = 0;
        while (this.parent.get(pos) !== pos) {
            help[recordIndex++] = pos;
            pos = this.parent.get(pos);
        }
        for (recordIndex--; recordIndex >= 0; recordIndex--) {
            let path = help[recordIndex];
            this.parent.set(path, pos);
        }
        return pos;
    }

    union(r1, c1, r2, c2) {
        // 越界
        if (r1 < 0 || r1 >= this.rowLen || r2 < 0 || r2 >= this.rowLen || c1 < 0 || c1 > this.colLen || c2 < 0 || c2 > this.colLen) return
        // 其中一个没有被点过，则不用进行合并
        let pos1 = `${r1}_${c1}`;
        let pos2 = `${r2}_${c2}`;
        if (!this.parent.has(pos1) || !this.parent.has(pos2)) return;

        let f1 = this.find(r1, c1);
        let f2 = this.find(r2, c2);

        if (f1 !== f2) {
            let f1Size = this.size.get(pos1);
            let f2Size = this.size.get(pos2);
            if (f1Size >= f2Size) {
                this.parent.set(f2, f1);
                this.size.set(f1, f1Size + f2Size);
            } else {
                this.parent.set(f1, f2);
                this.size.set(f2, f1Size + f2Size);
            }
            this.sets--;
        }
    }
}

function dynamicIsland(row, col, path) {
    let uf = new UnionFind(row, col);
    let res = [];
    for (let i = 0; i < path.length; i++) {
        let r = path[i][0];
        let c = path[i][1];
        uf.connect(r, c);
        res.push(uf.sets);
    }

    console.log(uf);
    return res;
}

console.log(dynamicIsland(4, 4, [[0, 0], [0, 1], [3, 3], [2, 3]]));

