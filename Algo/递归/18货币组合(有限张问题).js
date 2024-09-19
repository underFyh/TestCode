const {generateRandomArray, genRange} = require("../utils/array");
let arr = [1, 2, 1, 1, 2, 1];
let arm = 4;


// [{value: 1, count: 4}, {value: 2, count: 2}]
function f(arr, aim) {
    let record = {};
    arr.forEach(i => {
        if (!record[i]) {
            record[i] = 1
        } else {
            record[i] = record[i] + 1;
        }
    })
    let formatArr = Object.keys(record).map(key => ({value: +key, count: record[key]}));
    return process(formatArr, 0, aim);
}


// console.log(f(arr, 4));
function process(arr, index, rest) {
    if (index === arr.length) {
        return rest === 0 ? 1 : 0;
    }
    let ways = 0;
    let item = arr[index];
    for (let count = 0; count * item.value <= rest && count <= item.count; count++) {
        ways += process(arr, index + 1, rest - count * item.value);
    }
    return ways;
}


function dp(arr, aim) {
    let record = {};
    arr.forEach(i => {
        if (!record[i]) {
            record[i] = 1
        } else {
            record[i] = record[i] + 1;
        }
    })
    let formatArr = Object.keys(record).map(key => ({value: +key, count: record[key]}));
    console.log(formatArr);
    let N = formatArr.length;
    let dp = Array.from({length: N + 1}, () => Array.from({length: aim + 1}, () => 0));
    dp[N][0] = 1;

    for (let index = N - 1; index >= 0; index--) {
        let item = formatArr[index];
        for (let rest = 0; rest <= aim; rest++) {
            let ways = 0;
            for (let count = 0; count <= item.count && item.value * count <= rest; count++) {
                ways += dp[index + 1][rest - count * item.value];
            }
            dp[index][rest] = ways;
        }
    }
    console.log(dp);
    return dp[0][aim];
}

console.log(dp(arr, 4));

function dp2(arr, aim) {
    let record = {};
    arr.forEach(i => {
        if (!record[i]) {
            record[i] = 1
        } else {
            record[i] = record[i] + 1;
        }
    })
    let formatArr = Object.keys(record).map(key => ({value: +key, count: record[key]}));
    let N = formatArr.length;
    let dp = Array.from({length: N + 1}, () => Array.from({length: aim + 1}, () => 0));
    dp[N][0] = 1;

    for (let index = N - 1; index >= 0; index--) {
        let item = formatArr[index];
        for (let rest = 0; rest <= aim; rest++) {
            // 加上b位置
            dp[index][rest] = dp[index + 1][rest];

            // 如果没有越界加上a'位置
            if(rest - item.value >= 0) {
                dp[index][rest] += dp[index][rest - item.value];
            }

            // 将总张数+1然后乘以面额，如果还小于rest剩余数则说明多算了e位置
            if (rest - item.value * (item.count + 1) >= 0) {
                dp[index][rest] -= dp[index + 1][rest - item.value * (item.count + 1)]
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
            console.log(arr, aim);
            console.log("error", ans1, ans2);
            break;
        }
    }
    console.log("结束");
}
test();


