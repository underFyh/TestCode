let str = "euazbipzncptldueeuechubrcourfpftcebikrxhybkymimgvldiwqvkszfycvqyvtiwfckexmowcxztkfyzqovbtmzpxojfofbvwnncajvrvdbvjhcrameamcfmcoxryjukhpljwszknhiypvyskmsujkuggpztltpgoczafmfelahqwjbhxtjmebnymdyxoeodqmvkxittxjnlltmoobsgzdfhismogqfpfhvqnxeuosjqqalvwhsidgiavcatjjgeztrjuoixxxoznklcxolgpuktirmduxdywwlbikaqkqajzbsjvdgjcnbtfksqhquiwnwflkldgdrqrnwmshdpykicozfowmumzeuznolmgjlltypyufpzjpuvucmesnnrwppheizkapovoloneaxpfinaontwtdqsdvzmqlgkdxlbeguackbdkftzbnynmcejtwudocemcfnuzbttcoew";


function main(str) {
    let strArr = str.split("");
    return process(strArr, 0, strArr.length - 1);
}

function process(strArr, L, R) {
    if (L === R) return 1;
    if (L === R - 1) return strArr[L] === strArr[R] ? 2 : 1;

    // 1. 不以L开头也不以R结尾
    let p1 = process(strArr, L + 1, R - 1);
    // 1. 以L开头不以R结尾情况
    let p2 = process(strArr, L, R - 1);
    // 2. 不以L开头以R结尾情况
    let p3 = process(strArr, L + 1, R);
    // 3. 以L开头并且以R结尾情况
    let p4 = 0;
    if (strArr[L] === strArr[R]) {
        p4 = 2 + process(strArr, L + 1, R - 1)
    }
    return Math.max(Math.max(p1, p2), Math.max(p3, p4));
}

// console.log(main(str));


function main1(str) {
    let strArr = str.split("");
    let N = strArr.length;
    let dp = Array.from({length: N}, () => new Array(N).fill(0));


    // 基础情况  L === R
    for (let i = 0; i < N; i++) {
        dp[i][i] = 1;
    }


    // 基础情况 L === R - 1
    for (let i = 0; i < N - 1; i++) {
        strArr[i] === strArr[i + 1] ? (dp[i][i + 1] = 2) : (dp[i][i + 1] = 1)
    }
    console.log(dp);
    // 其他情况
    for (let L = N - 3; L >= 0; L--) {
        for (let R = L + 2; R < N; R++) {
            // 1. 常规版本
            // let p1 = dp[L + 1][R - 1];
            // let p2 = dp[L][R - 1];
            // let p3 = dp[L + 1][R];
            // let p4 = strArr[L] === strArr[R] ? (2 + dp[L + 1][R - 1]) : 0;
            // dp[L][R] = Math.max(Math.max(p1, p2), Math.max(p3, p4));

            // 2. 优化后版本
            dp[L][R] = Math.max(dp[L][R - 1], dp[L + 1][R]);
            if (strArr[L] === strArr[R]) {
                dp[L][R] = Math.max(dp[L][R], 2 + dp[L+1][R-1])
            }
        }
    }

    console.log(dp);
    return dp[0][N - 1];
}

console.log(main1("aaabb"));