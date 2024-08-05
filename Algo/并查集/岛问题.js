let arr = [
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 1, 0],
];

// let arr = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]



// 并查集类->将二维数组转换为一维数组坐标
class UnionFind {
    constructor(M) {
        this.parent = []; // 对应的父节点
        this.size = []; // 每个节点的大小
        this.help = [];
        this.col = 0;
        this.sets = 0;

        this.init(M);
    }

    init(M) {
        let row = M.length;
        let col = M[0].length;
        this.col = col;
        // 初始化将父亲节点默认指向自己，并且设置size属性
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
               if (M[r][c] === 1) {
                   let index = this.getIndex(r, c);
                   this.parent[index] = index;
                   this.size[index] = 1;
                   this.sets++;
               }
            }
        }
    }
    // 将二维数组的坐标转换为一维数组的坐标
    getIndex(r, c) {
        return r * this.col + c;
    }

    // 查找顶级节点,i = 下标值，原始位置被下标替代了
    find(i) {
        let hi = 0;
        while (i !== this.parent[i]) {
            this.help[hi++] = i;
            i = this.parent[i];
        }
        for (hi--; hi >= 0; hi--) {
            this.parent[this.help[hi]] = i;
        }
        return i;
    }

    // 合并
    union(r1, c1, r2, c2) {
        let i1 = this.getIndex(r1, c1);
        let i2 = this.getIndex(r2, c2);
        // 代表节点
        let f1 = this.find(i1);
        let f2 = this.find(i2);


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

// 方式2 -> 利用并查集，将
function getLands2(M) {
    let row = M.length;
    let col = M[0].length;
    let uf = new UnionFind(M);
    // 第一个行单独处理
    for (let i = 1; i < col; i++) {
        if (M[0][i] === 1 && M[0][i - 1] === 1) {
            uf.union(0, i-1, 0, i);
        }
    }
    // 第一列单独处理
    for (let i = 1; i < row; i++) {
        if (M[i][0] === 1 && M[i - 1][0] === 1) {
            uf.union(i-1, 0, i, 0);
        }
    }
    // 其他区域处理
    for (let r = 1; r < row; r++) {
        for (let c = 1; c < col; c++) {
            // 必须自己等于1才可以进行合并
            if (M[r][c] === 1) {
                // 左节点
                if (M[r][c - 1] === 1) {
                    uf.union(r, c-1, r, c);
                }
                // 上节点
                if (M[r - 1][c] === 1) {
                    uf.union(r - 1, c, r, c);
                }
            }
        }
    }
    return uf.sets;
}

console.log(getLands2(arr));


// let uf = new UnionFind(arr);
// uf.union(0, 0, 0, 1);
// uf.union(0, 0, 0, 2);
// console.log(uf);




function getLands1(M) {
    let rowLen = M.length;
    let colLen = M[0].length;
    let island = 0;
    for(let r = 0; r < rowLen; r++) {
        for (let c = 0; c < colLen; c++) {
            let cur = M[r][c];
            if (cur === 1) {
                island++; // 只有for循环才能修改island值，infect只能感染无法修改
                infect(M, r, c);
            }
        }
    }

    return island;

    function infect(M, r, c) {
        // 边界判断，越界或者该节点值不等于1则跳出
        if (r < 0 || c < 0 || r >= rowLen || c >= rowLen || M[r][c] !== 1) {
            return
        }
        // 需要先进行感染，不然递归会进行死循环
        M[r][c] = 2;
        // 感染上下左右
        infect(M, r - 1, c); // 上
        infect(M, r + 1, c); // 下
        infect(M, r, c - 1); // 左
        infect(M, r, c + 1); // 右边
    }
}
