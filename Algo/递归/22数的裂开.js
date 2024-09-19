const {generateRandomArray, genRange} = require("../utils/array");

function f(num) {
    if (num < 0) return 0;
    if (num === 1) return 1;
    return process(1, num, "");
}


function process(prev, rest) {
    // 必须在最上，因为来处理(2 7)情况，当前置增加到7了后，后者0此时满足这个退出条件
    if (rest === 0) {
        return 1;
    }
    if (prev > rest) return 0;
    if (prev === rest) {
        return 1;
    }
    let count = 0;
    for (let first = prev; first <= rest; first++) {
        count += process(first, rest - first);
    }
    return count;
}




function dp(num) {
    if (num < 0) return 0;
    if (num === 1) return 1;

    // prev和rest都是相同范围,y轴prev,x轴rest
    let dp = Array.from({length: num + 1}, () => Array.from({length: num + 1}, () => 0));

    for (let prev = 1; prev <= num; prev++) {
        dp[prev][0] = 1;
        // prev === rest return 1 对角线都是1
        dp[prev][prev] = 1;
    }
    // rest - first 下面依赖上面位置,所以从下往上填写，并且最后一行已经填写好，第一行不用填(prev不会等于0)
    for (let prev = num - 1; prev >= 1; prev--) {
        for (let rest = prev + 1; rest <= num; rest++) {
            let count = 0;
            // dp[1][3] 依赖 dp[1][2] dp[2][1] dp[3][0]
            // dp[2][3] 依赖 dp[2][1] dp[3][0]
            for (let first = prev; first <= rest; first++) {
                count += dp[first][rest - first];
            }
            dp[prev][rest] = count;
        }
    }

    // console.log(dp);
    return dp[1][num];
}

dp(4)

function dp1(num) {
    if (num < 0) return 0;
    if (num === 1) return 1;

    // prev和rest都是相同范围,y轴prev,x轴rest
    let dp = Array.from({length: num + 1}, () => Array.from({length: num + 1}, () => 0));

    for (let prev = 1; prev <= num; prev++) {
        dp[prev][0] = 1;
        // prev === rest return 1 对角线都是1
        dp[prev][prev] = 1;
    }
    // rest - first 下面依赖上面位置,所以从下往上填写，并且最后一行已经填写好，第一行不用填(prev不会等于0)
    for (let prev = num - 1; prev >= 1; prev--) {
        for (let rest = prev + 1; rest <= num; rest++) {
            // let count = 0;
            // dp[1][3] 依赖 dp[1][2] dp[2][1] dp[3][0]
            // dp[2][3] 依赖 dp[2][1] dp[3][0]
            // for (let first = prev; first <= rest; first++) {
            //     count += dp[first][rest - first];
            // }
            // dp[prev][rest] = count;
            dp[prev][rest] = dp[prev + 1][rest] + dp[prev][rest - prev];
        }
    }

    // console.log(dp);
    return dp[1][num];
}

dp1(4)


function test() {
    for (let i = 0; i <= 10000; i++) {
        let num = genRange(1, 30);
        let a1 = f(num);
        let a2 = dp(num);
        let a3 = dp1(num);

        if (a1 !== a2 || a2 !== a3) {
            console.log("error", a1, a2);
        }
    }
    console.log("结束");
}

test();

// dp[1][3] =