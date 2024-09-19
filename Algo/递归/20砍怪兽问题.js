// g
const {generateRandomArray, genRange} = require("../utils/array");

// N = HP  M = harmValue K = times
function f(N, M, K) {
    return process(N, M, K);
}

// 计算出能砍死的次数
function process(HP, harmValue, times) {
    // 如果血量已经小于0了但是还剩余可以砍的次数，则需要根据公式计算怪物死亡情况数
    if (HP <= 0 && times > 0) {
        return Math.pow(harmValue + 1, times);
    }
    if (times === 0) {
        return HP <= 0 ? 1 : 0;
    }

    let surviveCount = 0;

    for (let i = 0; i <= harmValue; i++) {
        surviveCount += process(HP - i, harmValue, times - 1);
    }

    return surviveCount;
}

console.log(f(10, 10, 1));


// 动态规划
function dp(HP, harmValue, times) {
    // 假设y轴记录砍杀次数，x轴记录剩余血量
    let dp = Array.from({
        length: times + 1
    }, () => Array.from({length: HP + 1}, () => 0));

    // 基础情况
    for (let i = 0; i <= times; i++) {
        if (i === 0) {
            dp[i][0] = 1;
        } else {
            // 统计了所有hp为0并且times大于0的情况
            dp[i][0] = Math.pow(harmValue + 1, i);
        }
    }

    // 每次依赖后面的 times - 1 所以按照顺序从上往下填，并且第0行已经填写完成
    for (let curTime = 1; curTime <= times; curTime++) {
        for (let curHp = 1; curHp <= HP; curHp++) {
            let surviveCount = 0;
            for (let i = 0; i <= harmValue; i++) {
                if (curHp - i <= 0) {
                    // 小于或者等于0，都可以用公式进行计算后续存活次数
                    // 这里必须使用curTime - 1,因为当前循环已经使用了一次，所以剩余的次数必须减去1
                    // 递归直接使用times是因为递归先减去次数了在进行计算
                    surviveCount += Math.pow(harmValue + 1, curTime - 1);
                } else {
                    surviveCount += dp[curTime - 1][curHp - i];
                }
            }
            dp[curTime][curHp] = surviveCount;
        }
    }

    return dp[times][HP];
}

function dp1(HP, harmValue, times) {
    // 假设y轴记录砍杀次数，x轴记录剩余血量
    let dp = Array.from({
        length: times + 1
    }, () => Array.from({length: HP + 1}, () => 0));

    // 基础情况
    for (let i = 0; i <= times; i++) {
        if (i === 0) {
            dp[i][0] = 1;
        } else {
            // 统计了所有hp为0并且times大于0的情况
            dp[i][0] = Math.pow(harmValue + 1, i);
        }
    }

    for (let curTime = 1; curTime <= times; curTime++) {
        for (let curHp = 1; curHp <= HP; curHp++) {
            dp[curTime][curHp] = dp[curTime][curHp - 1] + dp[curTime - 1][curHp];
            if (curHp - 1 - harmValue >= 0) {
                // 说明够减
                dp[curTime][curHp] -= dp[curTime - 1][curHp - 1 - harmValue];
            } else {
                dp[curTime][curHp] -= Math.pow(harmValue + 1, curTime - 1);
            }
        }
    }

    return dp[times][HP];
}

console.log(dp(10, 10, 1));


function test() {
    for (let i = 0; i < 10000; i++) {
        let hp = genRange(1, 10);
        let times = genRange(1, 8);
        let k = genRange(1, 6);

        let ans1 = dp1(hp, k, times);
        let ans2 = dp(hp, k, times);

        if (ans1 !== ans2) {
            console.log("err");
            break;
        }
    }
    console.log("结束");
}

test();