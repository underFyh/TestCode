
// 5

function fn(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;

    // 第一次爬一次后面有多少方法 + 第二次爬两次后面多少种方法
    return fn(n - 1) + fn(n - 2);
}

console.log(fn(5));