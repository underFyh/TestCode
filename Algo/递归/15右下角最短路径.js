// 空间压缩技巧
const {generateRandomArray, genRange} = require("../utils/array");


let matrix = [
    [1, 10, 1, 2],
    [2, 1, 1, 2],
    [2, 1, 1, 2]
]


function f(matrix) {
    let a = matrix.length - 1;
    let b = matrix[0].length - 1;
    return process(matrix, 0, 0, a, b);
}

console.log(f(matrix));

function process(matrix, x, y, a, b,) {
    // 越界则不处理
    if (x > a || y > b) return 0;
    if (a === x && b === y) {
        return matrix[x][y];
    }
    // 每次走就修改原数组值
    // 当前方块值
    let cur = matrix[x][y];
    // 选择左边
    let p1 = process(matrix, x, y + 1, a, b);
    // 选择右边
    let p2 = process(matrix, x + 1, y, a, b);
    return cur + Math.max(p1, p2);
}


function dp(matrix) {
    let a = matrix.length - 1;
    let b = matrix[0].length - 1;
    let dp = Array.from({
        length: a + 1,
    }, () => Array.from({length: b + 1}, () => 0));

    // 1. 基础
    dp[a][b] = matrix[a][b];

    // 先填写最后一行
    for (let y = b - 1; y >= 0; y--) {
        let cur = matrix[a][y]
        dp[a][y] = cur + dp[a][y + 1];
    }
    // 在填写最后一列
    for (let x = a - 1; x >= 0; x--) {
        let cur = matrix[x][b];
        dp[x][b] = cur + dp[x + 1][b];
    }

    for (let x = a - 1; x >= 0; x--) {
        for (let y = b - 1; y >= 0; y--) {
            let cur = matrix[x][y];
            let p1 = dp[x][y + 1];
            let p2 = dp[x + 1][y];
            dp[x][y] = cur + Math.max(p1, p2);
        }
    }
    return dp[0][0];
}

dp(matrix);


function test() {

    let time = 1000;
    for (let i = 0; i <= time; i++) {
        let arr = creatMa();
        let ans1 = f(arr);
        let ans2 = dp(arr);
        if (ans1 !== ans2) {
            console.log(`Error: ${ans1} !== ${ans2}`)
            break;
        }
    }
    console.log("结束");
    function creatMa() {
        let arr = [];
        let outLen = genRange(1, 15);
        let innerLen = genRange(1, 15);
        for (let i = 0; i < outLen; i++) {
            arr.push(generateRandomArray(innerLen, 1, 100))
        }
        return arr;
    }
}

test();

