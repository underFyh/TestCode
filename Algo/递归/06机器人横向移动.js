//
// function f(N, S, K, P) {
//     // 1. 基础情况 到达了目标地点并且剩余步骤为0则达到方法+1
//     if (K === 0) {
//         return S === P ? 1 : 0;
//     }
//
//     // 在1位置只能往右边移动,步骤减去1
//     if (S === 1) {
//         return f(N, S + 1, K - 1, P);
//     }
//
//     // 在N位置只能往左边移动，步骤减去1
//     if (S === N) {
//         return f(N, S - 1, K - 1, P);
//     }
//
//     // 其他情况可以左也可以右，则取它们的累计达到个数
//     return f(N, S + 1, K - 1, P) + f(N, S - 1, K - 1, P);
// }


// 13
// console.log(f(5, 2, 6, 4));

function main(N, S, K, P) {
    let map = [];
    // 外层创建长度N
    for (let i = 0; i <= N; i++) {
        // 内存创建步骤K
        let item = new Array(K + 1).fill(-1);
        map.push(item);
    }
    return f2(N, S, K, P, map);
}

console.log(main(5, 2, 6, 4));

function f2(N, S, K, P, map) {
    // 说明之前已经计算过
    if (map[S][K] !== -1) {
        return map[S][K];
    } else {
        // 没有计算
        let ans = 0;

        // 递归base case
        if (K === 0) {
            if (S === P) {
                ans = 1;
            }
            map[S][K] = ans;
            return ans;
        }

        if (S === 1) {
            ans = f2(N, S + 1, K - 1, P, map);
        } else if (S === N) {
            ans = f2(N, S - 1, K - 1, P, map);
        } else {
            ans = f2(N, S + 1, K - 1, P, map) + f2(N, S - 1, K - 1, P, map);
        }
        // 记录值然后返回
        map[S][K] = ans;
        return ans;
    }
}


function f3(N, S, K, P) {
    let dp = [];
    for (let i = 0; i <= N; i++) {
        // 默认初始化值为-1
        let item = new Array(K + 1).fill(-1);
        dp.push(item);
    }

    // 1. K = 0 数列先填入基础值
    for (let i = 1; i <= N; i++) {
        if (i === P) {
            dp[i][0] = 1;
        } else {
            dp[i][0] = 0;
        }
    }

    // 2. 依此处理K=1 K=2 直到K=6的列值
    for (let i = 1; i <= K; i++) {
        // 第一列的值去左下角
        dp[1][i] = dp[2][i - 1];
        // 中间值
        for (let j = 2; j <= N - 1; j++) {
            // 分别去取左上角和左下角和
            dp[j][i] = dp[j + 1][i - 1] + dp[j - 1][i - 1];
        }
        // 最后一列取左上角
        dp[N][i] = dp[N - 1][i - 1];
    }

    return dp[S][K];
}

console.log(f3(5, 2, 6, 4));