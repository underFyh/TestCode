const {generateRandomArray, genRange} = require("../utils/array");
let arr = [1, 2, 3, 4, 12];


function f(arr) {
    let flagNum = arr.reduce((prev, cur) => prev + cur, 0) >> 1;
    if ((arr.length & 1) === 0) {
        return process(arr, arr.length >> 1, 0, flagNum);
    } else {
        return Math.max(process(arr, arr.length >> 1, 0, flagNum), process(arr, (arr.length >> 1) + 1, 0, flagNum));
    }
}


function process(arr, picks, index, rest) {
    if (index === arr.length) {
        // 如果越界了并且还需要选择数字则说明不符合条件;
        return picks === 0 ? 0 : -1;
    }
    // 不选
    let p1 = process(arr, picks, index + 1, rest);
    // 选
    let p2 = -1;
    let next = -1
    if (rest >= arr[index]) {
        next = process(arr, picks - 1, index + 1, rest - arr[index]);
    }
    if (next !== -1) {
        p2 = arr[index] + next;
    }
    return Math.max(p1, p2);
}

// console.log(f(arr));


function dp(arr) {
    let flagNum = arr.reduce((prev, cur) => prev + cur, 0) >> 1;
    let N = arr.length;
    let picks = ((arr.length & 1) === 0) ? (arr.length >> 1) : ((arr.length >> 1) + 1);
    let dp =
        Array.from(
            {length: N + 1},
            () => Array.from({length: flagNum + 1},
                () => Array.from({length: picks + 1},
                    () => 0))
        );
    // 基础情况
    for (let index = 0; index <= N; index++) {
        for (let rest = 0; rest <= flagNum; rest++) {
            for (let pick = 1; pick <= picks; pick++) {
                if (index === N) {
                    dp[index][rest][pick] = -1;
                }
            }
        }
    }


    // 递归改造
    for (let index = N - 1; index >= 0; index--) {
        for (let rest = 0; rest <= flagNum; rest++) {
            for (let pick = 0; pick <= picks; pick++) {
                let p1 = dp[index + 1][rest][pick];

                let p2 = -1;
                let next = -1;
                if (rest >= arr[index] && pick - 1 >= 0) {
                    next = dp[index + 1][rest - arr[index]][pick - 1];
                }

                if (next !== -1) {
                    p2 = arr[index] + next;
                }

                dp[index][rest][pick] = Math.max(p1, p2);
            }
        }
    }


    if ((arr.length & 1) === 0) {
        return dp[0][flagNum][picks];
    } else {
        return Math.max(dp[0][flagNum][picks - 1], dp[0][flagNum][picks]);
    }
}


function test() {
    for (let i = 0; i <= 1001; i++) {
        let arr = generateRandomArray(genRange(1, 20), 1, 100);
        let a1 = f(arr);
        let a2 = dp(arr);

        if (a1 !== a2) {
            console.log("error", a1, a2);
        }
    }

    console.log("结束");
}

test();