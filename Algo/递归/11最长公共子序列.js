function main(str1, str2) {
    let s1 = str1.split("");
    let s2 = str2.split("");

    return process(s1, s2, s1.length - 1, s2.length - 1);
}

function process(s1, s2, i, j) {
    // 1. 基础情况i=0;j=0
    if (i === 0 && j === 0) {
        return s1[i] === s2[j] ? 1 : 0;
    } else if (i === 0) {
        // 如果i = 0 j > 0
        if (s1[i] === s2[j]) {
            return 1;
        } else {
            return process(s1, s2, i, j - 1);
        }
    } else if (j === 0) {
        // 如果j = 0 i > 0
        if (s1[i] === s2[j]) {
            return 1
        } else {
            return process(s1, s2, i - 1, j);
        }
    } else {
        // i !== 0  j !== 0
        // 1. 不可能i结尾，但是可能j结尾(j可要可不要)
        let p1 = process(s1, s2, i - 1, j);
        // 2. 可能i结尾(i可要可不要)，但是不可能j结尾
        let p2 = process(s1, s2, i, j - 1);
        // 3. 必须以i j作为结尾
        let p3 = s1[i] === s2[j] ? (1 + process(s1, s2, i - 1, j - 1)) : 0;

        return Math.max(p1, Math.max(p2, p3));
    }
}

// console.log(process(["a", "b", "c"], ["d", "e", "f"], 1, 1));

console.log(main("abc", "def"));


function main1(str1, str2) {
    let s1 = str1.split("");
    let s2 = str2.split("");
    let N = s1.length;
    let M = s2.length;
    // y轴i, x轴j
    let dp = [];
    for (let i = 0; i < N; i++) {
        dp.push(new Array(s2.length).fill(-1));
    }

    // 基础情况 i = 0;  j = 0
    s1[0] === s2[0] ? dp[0][0] = 1 : dp[0][0] = 0

    // i = 0; j !== 0
    for (let j = 1; j < M; j++) {
        s1[0] === s2[j] ? dp[0][j] = 1 : (dp[0][j] = dp[0][j - 1]);
    }

    // i != 0; j = 0
    for (let i = 1; i < N; i++) {
        s1[i] === s2[0] ? dp[i][0] = 1 : (dp[i][0] = dp[i - 1][0])
    }

    // i和j都不等于0
    for (let i = 1; i < N; i++) {
        for (let j = 1; j < M; j++) {
            let p1 = dp[i - 1][j];
            let p2 = dp[i][j - 1];
            let p3 = s1[i] === s2[j] ? (1 + dp[i - 1][j - 1]) : 0
            dp[i][j] = Math.max(p1, Math.max(p2, p3));
        }
    }

    return dp[N - 1][M - 1];
}

// console.log(main1("abc", "def"));