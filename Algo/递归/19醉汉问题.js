const {generateRandomArray, genRange} = require("../utils/array");

function f(N, M, row, col, k) {
    // return process(N, M, row, col, k) / Math.pow(4, k)
    // 生存次数校验
    return process(N, M, row, col, k);
}

function process(N, M, row, col, rest) {
    // 越界旧判断死亡
    if (row >= N || col >= M || row < 0 || col < 0) {
        return 0
    }
    // 走完了还在区域里
    if (rest === 0) return 1;

    let up = process(N, M, row - 1, col, rest - 1);
    let down = process(N, M, row + 1, col, rest - 1);
    let left = process(N, M, row, col - 1, rest - 1);
    let right = process(N, M, row, col + 1, rest - 1)

    return up + down + left + right;
}

// console.log(f(5, 5, 0, 0, 2));

function dp(N, M, row, col, k) {
    let dp = Array.from(
        {length: N},
        () =>
            Array.from({length: M},
                () => Array.from({length: k + 1}, () => 0)
            )
    );

    // 1. 基础情况
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            dp[i][j][0] = 1;
        }
    }
    console.log(dp);


    // for (let row = 0; row < N; row++) {
    //     for (let col = 0; col < M; col++) {
    //         for (let rest = 1; rest <= k; rest++) {
    //             let up = pick(dp, N, M, row - 1, col, rest - 1);
    //             let down = pick(dp, N, M, row + 1, col, rest - 1);
    //             let left = pick(dp, N, M, row, col - 1, rest - 1);
    //             let right = pick(dp, N, M, row, col + 1, rest - 1)
    //             dp[row][col][rest] = up + down + left + right;
    //         }
    //     }
    // }

    // 需要按照rest依此填写上述循环有问题
    for (let rest = 1; rest <= k; rest++) {
        for (let row = 0; row < N; row++) {
            for (let col = 0; col < M; col++) {
                let up = pick(dp, N, M, row - 1, col, rest - 1);
                let down = pick(dp, N, M, row + 1, col, rest - 1);
                let left = pick(dp, N, M, row, col - 1, rest - 1);
                let right = pick(dp, N, M, row, col + 1, rest - 1)
                dp[row][col][rest] = up + down + left + right;
            }
        }
    }

    console.log(dp);

    return dp[row][col][k];
}

console.log(dp(5, 5, 0, 0, 1), "dp");

function dp2(N, M, row, col, k) {
    let base = Array.from({length: M}, () => Array.from({length: k + 1}, () => 0));
    base.forEach(r => r[0] = 1);
    let prev = null;
    let cur = JSON.parse(JSON.stringify(base));
    let next = JSON.parse(JSON.stringify(base));


    for (let i = 0; i < N; i++) {
        for (let rest = 1; rest <= k; rest++) {
            for (let col = 0; col < M; col++) {
                let up = pick2(prev, col, rest - 1);
                let down = pick2(next, col, rest - 1);
                let left = pick2(cur, col - 1, rest - 1);
                let right = pick2(cur, col + 1, rest - 1);
                cur[col][rest] = up + down + left + right;
            }
        }
        prev = JSON.parse(JSON.stringify(cur));
        cur = JSON.parse(JSON.stringify(next));
        // prev = JSON.parse(JSON.stringify(base));
        // if (i === 3) next = null;
    }

    console.log(prev);
    console.log(cur);
    console.log(next);

    return cur[col][k];

    function pick2(arr, col, rest) {
        if(arr === null) return 0;
        if (col >= M || col < 0 || rest < 0) {
            return 0;
        } else {
            return arr[col][rest];
        }
    }
}

console.log(dp2(5, 5, 0, 0, 1), "dp2");


function pick(dp, N, M, row, col, k) {
    if (row >= N || col >= M || row < 0 || col < 0 || k < 0) {
        return 0;
    } else {
        return dp[row][col][k]
    }
}

// console.log(dp(5, 5, 0, 0, 1));

function test() {
    for (let i = 0; i <= 10000; i++) {
        let N = genRange(1, 10);
        let M = genRange(1, 10);
        let row = genRange(0, N - 1);
        let col = genRange(0, M - 1);
        let k = genRange(1, 10);

        let ans1 = f(N, M, row, col, k);
        let ans2 = dp(N, M, row, col, k);

        if (ans1 !== ans2) {
            console.log("error", ans1, ans2);
            console.log(N, M, row, col, k);
            break
        }
    }
    console.log("结束");
}

// test();