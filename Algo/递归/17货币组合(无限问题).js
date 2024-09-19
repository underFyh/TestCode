const {generateRandomArray, genRange} = require("../utils/array");

//
let arr = [1, 2];
let aim = 4;


function f(arr, aim) {
    return process(arr, aim, 0);
}

function process(arr, rest, index) {
    if (index === arr.length) return rest === 0 ? 1 : 0;
    let ways = 0;
    let value = arr[index]
    for (let count = 0; count * value <= rest; count++) {
        ways += process(arr, rest - count * value, index + 1);
    }
    return ways;
}



function dp(arr, aim) {
    let N = arr.length;
    let dp = Array.from({
        length: N + 1
    }, () => Array.from({length: aim + 1}, () => 0));

    // 1. 基础条件
    dp[N][0] = 1;

    // 递归中每个值都依赖index + 1，所以是从后往前填写
    for (let index = N - 1; index >= 0; index--) {
        for (let rest = 0; rest <= aim; rest++) {
            let ways = 0;
            let curValue = arr[index];
            for (let count = 0; count * curValue <= rest; count++) {
                ways += dp[index + 1][rest - count * curValue];
            }
            dp[index][rest] = ways;
        }
    }
    console.log(dp);
    return dp[0][aim];
}

console.log(dp(arr, 4));

function dp2(arr, aim) {
    let N = arr.length;
    let dp = Array.from({
        length: N + 1
    }, () => Array.from({length: aim + 1}, () => 0));
    dp[N][0] = 1;

    // 递归中每个值都依赖index + 1，所以是从后往前填写
    for (let index = N - 1; index >= 0; index--) {
        for (let rest = 0; rest <= aim; rest++) {
           dp[index][rest] = dp[index + 1][rest];
           if (rest - arr[index] >= 0) {
               dp[index][rest] += dp[index][rest - arr[index]];
           }
        }
    }
    return dp[0][aim];
}



function test() {
    let times = 10000;
    for (let i = 0; i <= times; i++) {
        let arr = generateRandomArray(genRange(1, 20), 1, 1000);
        let aim = genRange(1, 100);
        let ans1 = f(arr, aim);
        let ans2 = dp2(arr, aim);

        if (ans1 !== ans2) {
            console.log("error");
            break;
        }
    }
    console.log("结束");
}
test();