let w = [1, 3, 1, 4];
let v = [0, 1, 2, 3];

function f(w, v, index, bag) {
    if (bag < 0) {
        return -1;
    }
    // 从左到右越界
    if (index === w.length) {
        return 0;
    }

    // 不要当前索引货物
    let v1 = f(w, v, index + 1, bag);

    // 要当前货物 - 需要根据下游函数判断
    // bag-当前重量很可能是一个负值，如f(w,v,index, -20)会返回一个-1说明该下游函数无效，应该不进行累加价值,直接判定为0价值
    let v2 = f(w, v, index + 1, bag - w[index]);
    if (v2 !== -1) {
        v2 = v2 + v[index];
    } else {
        v2 = 0;
    }
    return Math.max(v1, v2);
}

console.log(f(w, v, 0, 5));


// x轴代表bag重量，y轴代表index索引值
function main(w, v, bag) {
    let N = w.length;
    let map = [];

    for (let i = 0; i <= N; i++) {
        map.push(new Array(bag + 1).fill(-1));
    }

    return f1(w, v, 0, bag, map);

}

function f1(w, v, index, bag, map) {
    if (map[index][bag] !== -1) return map[index][bag];

    let ans = 0;
    if (bag < 0) {
        return -1;
    }
    // 从左到右越界
    if (index === w.length) {
        return 0;
    }
    let v1 = f(w, v, index + 1, bag, map);
    let v2 = f(w, v, index + 1, bag - w[index], map);
    if (v2 !== -1) {
        v2 = v2 + v[index];
    } else {
        v2 = 0;
    }
    ans = Math.max(v1, v2);
    map[index][bag] = ans;
    return ans;
}


console.log(main(w, v, 5));



function dp(w, v, bag) {
    let N = w.length;
    let dp = [];
    for (let i = 0; i <= N; i++) {
        dp.push(new Array(bag + 1).fill(-1));
    }

    // 1. 基本条件填写 index === w.length return 0
    dp[N] = new Array(bag + 1).fill(0);

    // 3. 依赖分析...
    // index 当前考察的货物索引
    for (let index = N - 1; index >= 0; index--) {
        // 当前背包剩余重量
        for (let rest = 0; rest <= bag; rest++) {
            let v1 = dp[index + 1][rest];
            let v2 = -1;
            // 当前重量减去需要装入的货物重量
            if (rest - w[index] >= 0) {
                v2 = v[index] + dp[index + 1][rest - w[index]];
            }
            dp[index][rest] = Math.max(v1, v2);
        }
    }

    // 2. 返回结果
    return dp[0][bag];
}

console.log(dp(w, v, 5));

// Ã À