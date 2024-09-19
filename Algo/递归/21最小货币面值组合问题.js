const {generateRandomArray, genRange} = require("../utils/array");

function f(arr, aim) {
    if (arr.length === 0 || aim <= 0) return 0;

    return process(arr, aim, 0, 0);
}
function process(arr, rest, index, count) {
    if (rest === 0) return count;
    if (index === arr.length) return rest === 0 ? count : Number.MAX_VALUE;

    let value = arr[index];
    let res = [];
    for (let zhang = 0; zhang * value <= rest; zhang++) {
        res.push(process(arr, rest - zhang * value, index + 1, zhang + count));
    }

    return Math.min(...res);
}
console.log(f([1, 2, 3], 8));


function f1(arr, aim) {
    if (arr.length === 0 || aim <= 0) return 0;
    return process1(arr, aim, 0);
}
function process1(arr, rest, index) {
    if (rest < 0) return Number.MAX_VALUE; // 上游已经卡主了,rest就不可能小于0
    if (index === arr.length) {
        return rest === 0 ? 0 : Number.MAX_VALUE;
    } else {
        let ans = Number.MAX_VALUE;
        let value = arr[index];
        // 上游
        for (let zhang = 0; zhang * value <= rest; zhang++) {
            let next = process1(arr, rest - zhang * value, index + 1);
            // 说明有效，某个分支已经改了
            if (next !== Number.MAX_VALUE) {
                // 获取每种情况的最小值
                ans = Math.min(ans, next + zhang);
            }
        }
        return ans;
    }

}
console.log(f1([1, 2, 3], 8));


function dp(arr, aim) {
    let N = arr.length;
    let dp = Array.from({length: N + 1}, () => Array.from({length: aim + 1}, () => Number.MAX_VALUE));

    dp[N][0] = 0;

    for (let index = N - 1; index >= 0; index--) {
        for (let rest = 0; rest <= aim; rest++) {
            let ans = Number.MAX_VALUE;
            let value = arr[index];
            for (let zhang = 0; zhang * value <= rest; zhang++) {
                let next = dp[index + 1][rest - zhang * value];
                if (next !== Number.MAX_VALUE) {
                    ans = Math.min(ans, next + zhang);
                }
            }
            // 每个分支无效则设置为系统最大
            dp[index][rest] = ans;
        }
    }
    return dp[0][aim];
}
dp([1,2,3], 4);


function test() {
    for (let i = 0; i < 10000; i++) {
        let arr = generateRandomArray(genRange(1, 8), 1, 100);
        let aim = genRange(1, 100);

        let ans1 = dp(arr, aim);
        let ans2 = f1(arr, aim);

        if (ans1 !== ans2) {
            console.log("error", ans1, ans2);
            break;
        }
    }
    console.log("结束");
}
test();