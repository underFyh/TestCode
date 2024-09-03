let arr = ["0", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


function f(str, index) {
    // 101 -> A 0无法进行转换所以单个考察无效
    if (str[index] === "0") return 0;
    if (index === str.length) {
        return 1
    }

    // 考察单个
    let count = f(str, index + 1);

    // 如果满足条件则考察两个
    if (index + 1 <= str.length - 1 && +str.substr(index, 2) < 27) {
        count += f(str, index + 2);
    }

    return count;
}

console.log(f("7210231231232031203123", 0));


function dp(str) {
    let dp = new Array(str.length + 1);

    // 基础base case
    dp[dp.length - 1] = 1;

    for (let index = dp.length - 2; index >= 0; index--) {
        // 如果当前项等于0说明转换不成立
        if (str[index] !== "0") {
            let count = dp[index + 1];
            if (index + 1 <= str.length - 1 && +str.substr(index, 2) < 27) {
                count += dp[index + 2];
            }
            dp[index] = count;
        } else {
            dp[index] = 0;
        }
    }

    console.log(dp);

    return dp[0]
}

// console.log(dp("111"));
console.log(dp("7210231231232031203123"));



// 123   [123] [12][3] [1][23]

