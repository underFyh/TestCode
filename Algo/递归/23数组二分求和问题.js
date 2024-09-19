const {generateRandomArray, genRange} = require("../utils/array");
let arr = [1, 2, 3, 4, 12];

function f(arr) {
    if (arr === null || arr.length <= 1) return 0;
    let num = arr.reduce((prev, cur) => prev + cur, 0) >> 1;
    return process(arr, 0, num);
}

function process(arr, index, rest) {
    if (index === arr.length) return 0;
    // 不要
    let p1 = process(arr, index + 1, rest);
    // 要,并且剩余数必须大于挑选的数据
    let p2 = 0;
    if (arr[index] <= rest) {
        p2 = arr[index] + process(arr, index + 1, rest - arr[index]);
    }
    return Math.max(p1, p2);
}


// console.log(f(arr));

function dp(arr) {
    let flagNum = arr.reduce((prev, cur) => prev + cur, 0) >> 1;
    let N = arr.length;
    let dp = Array.from({length: N + 1}, () => Array.from({length: flagNum + 1}, () => 0));

    // 基础条件已经写完，并且都是依赖下一行的值
    for (let index = N - 1; index >= 0; index--) {
        for (let rest = 0; rest <= flagNum; rest++) {
            let p1 = dp[index + 1][rest];
            let p2 = 0;
            if (arr[index] <= rest) {
                p2 = arr[index] + dp[index + 1][rest - arr[index]];
            }
            dp[index][rest] = Math.max(p1, p2);
        }
    }
    return dp[0][flagNum];
}

// console.log(dp(arr));


function test() {
    for (let i = 0; i <= 1000; i++) {
        let arr = generateRandomArray(genRange(1, 20), 1, 100);
        let a1 = f(arr);
        let a2 = dp(arr);

        if (a1 !== a2) {
            console.log("error", a1, a2);
        }
    }

    console.log("结束");
}

test();