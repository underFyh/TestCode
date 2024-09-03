let arr = [1, 1, 1];

function f(arr, aim) {
    if (aim < 0 || arr.length < 0) return 0;
    return process(arr, aim, 0);
}

function f1(arr, aim) {
    if (aim < 0 || arr.length < 0) return 0;
    return process2(arr, 0, aim);
}


/**
 *
 * @param arr
 * @param aim
 * @param index 从第几项开始选择
 * @return {number}
 */
function process(arr, aim, index) {
    console.log(index, aim);
    if (aim < 0 || index === arr.length) return 0;
    if (aim === 0) return 1;

    let cur = arr[index];
    let total = 0;

    // 要
    // for (let i = index + 1; i < arr.length; i++) {
    //     total += process(arr, aim - cur, i);
    // }
    total += process(arr, aim - cur, index + 1)
    total += process(arr, aim, index + 1)

    // 不要
    // for (let i = index + 1; i < arr.length; i++) {
    //     total += process(arr, aim, i);
    // }

    return total;
}

function process2(arr, index, rest) {
    if (rest < 0) {
        return 0;
    }
    if (index === arr.length) {
        return rest === 0 ? 1 : 0;
    }
    return process2(arr, index + 1, rest) + process2(arr, index + 1, rest - arr[index]);
}

// console.log(f([3, 3, 1], 2));


// aim 0 - aim
// index 0 - arr.length;
function dp(arr, aim) {
    let N = arr.length;
    let dp = Array.from({length: N + 1}, () => new Array(aim + 1).fill(-1));

    // 1. 基础
    for (let i = 0; i <= N - 1; i++) {
        dp[i][0] = 1;
    }
    dp[N] = new Array(aim + 1).fill(0);

    // 2. 依赖 [3][0] = 1 cur = 1 求出[3][1]
    for (let i = N - 1; i >= 0; i--) {
        let cur = arr[i];
        for (let j = 1; j <= aim; j++) {
            // dp[i][j] = dp[]
        }
    }

    console.log(dp);

    return dp[0][aim];
}

// console.log(dp([1, 1, 1], 2));


let a = [1, 1, 1];
let aim = 2;

console.log(f(a, aim), "res");
// console.log(f1(a, aim));
// console.log(f(a, aim) === f1(a, aim));
