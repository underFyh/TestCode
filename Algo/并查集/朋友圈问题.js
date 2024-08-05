
// 正方形矩阵 i为行 j为列
// m[i][i] = 1;
// m[i][j] = m[j][i]


let array = [
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1]
];


function findCircleNum(M) {
    let N = M.length;
    let unionFind = new UnionFind(N);
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            if (M[i][j] === 1) {
                unionFind.union(i,j);
            }
        }
    }
    return unionFind.getSets();
}

class UnionFind {
    constructor(N) {
        // parent[i]=K  说明i的父节点为k
        this.parent = [];
        // size[i]=k 代表节点i的大小值为k,这个i必须是代表节点才有意义
        this.size = [];
        // help辅助栈
        this.help = [];
        // sets一共多少个集合
        this.sets = 0;

        this.init(N);
    }

    init(N) {
        this.sets = N;
        for (let i = 0; i < N; i++) {
            // [0,1,2,3,4] => 0号位置父亲为0
            this.parent[i] = i;
            this.size[i] = 1;
        }
    }

    // 根据位置号寻找父节点
    // 3 -> [0,0,0,2]
    // 3 !== 2
    // help[0] = 3
    // 2

    // 2 !== 0
    // help[1] = 2
    // i = 0

    // 0 === 0
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
    union(i, j) {
        let f1 = this.find(i);
        let f2 = this.find(j);
        if (f1 !== f2) {
            if (this.size[f1] >= this.size[f2]) {
                this.size[f1] += this.size[f2];
                this.parent[f2] = f1;
            } else {
                this.size[f2] += this.size[f1];
                this.parent[f1] = f2;
            }
            this.sets--;
        }
    }
    getSets() {
        return this.sets;
    }
}

let u= new UnionFind(4);
u.union(0, 1);
u.union(2, 3); // [0,0,2,2]
u.union(0, 2); // [0,0,0,2]
console.log(u.find(3));
console.log(u);


// console.log(findCircleNum(array));
// 0 1 2 3 4 代表每一个方块位置
//


// 将索引（0，4） （2，4） （3,6）合并后，还有几个独立的集合
let collect = [1,2,3,4,5,6,7,8,9];


let u1 = new UnionFind(9);
u1.union(0, 4);
u1.union(2, 4);
u1.union(3, 6);

console.log(u1.getSets());