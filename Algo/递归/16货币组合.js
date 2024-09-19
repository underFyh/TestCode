const {generateRandomArray, genRange} = require("../utils/array");

let arr = [1, 1, 1];

function f(arr, aim) {
    return process(arr, aim, 0);
}
function process(arr, rest, index) {
    if (rest < 0) return 0; // 说明不满足
    // if (rest === 0) return 1;  // 也可以不要
    // 如果越界了并且剩余目标为0，则说明满足
    if (index === arr.length) return rest === 0 ? 1 : 0;

    // 当前项选或者不选
    let total = 0;
    // 当前项不要
    total += process(arr, rest, index + 1);
    // 当前项要
    total += process(arr, rest - arr[index], index + 1);
    return total;
}

// console.log(f(arr, 2));
function dp(arr, aim) {
    // 1. 参数变化范围,根据这个范围创建dp表
    // index 为 0 - arr.length 递归条件会到0
    // aim 为 0 - aim  递归条件也回到0
    let N = arr.length;
    let dp = Array.from({
        length: N + 1
    }, () => Array.from({length: aim + 1}, () => 0));

    // 1. 递归基础条件分析
    dp[N][0] = 1;
    for (let i = N; i <= 0; i++) {
        dp[i][0] = 1;
    }

    for (let index = N - 1; index >= 0; index--) {
        for (let rest = 0; rest <= aim; rest++) {
            // 如果rest - arr[index] >= 0 说明不满足条件 if (rest < 0) return 0;
            dp[index][rest] = dp[index + 1][rest] + (rest - arr[index] >= 0 && dp[index + 1][rest - arr[index]]);
        }
    }

    // 2. 根据递归入参返回返回值
    return dp[0][aim];
}
// console.log(dp(arr, 2));


function test() {
    let times = 10000;
    for (let i = 0; i <= times; i++) {
        let arr = generateRandomArray(genRange(1, 20), 1, 1000);
        let aim = genRange(1, 100);
        let ans1 = f(arr, aim);
        let ans2 = dp(arr, aim);

        if (ans1 !== ans2) {
            console.log("error");
            break;
        }
    }
    console.log("结束");
}
test();