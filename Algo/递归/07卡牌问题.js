let scoreArr = [60, 90, 30, 20];

function main(scoreArr) {
    let firstScore = f(scoreArr, 0, scoreArr.length - 1);
    let secondScore = g(scoreArr, 0, scoreArr.length - 1);

    return Math.max(firstScore, secondScore);
}

// console.log(main(scoreArr));


// L表示左边，R表示右边 利用L和R来代表当前选的边界
function f(arr, L, R) {
    // 1. 基础情况,l === r 先手只有一张牌了则只能选择这个
    if (L === R) {
        return arr[L];
    }

    let s1 = arr[L] + g(arr, L + 1, R);
    let s2 = arr[R] + g(arr, L, R - 1);

    return Math.max(s1, s2);
}

function g(arr, L, R) {
    // 1. 基础情况 L === R 只有一张牌了，先手一定会拿去，等到执行后手函数一定是空了
    if (L === R) {
        return 0;
    }

    // 同样在剩余的卡牌中获取最优解
    let s1 = f(arr, L + 1, R);
    let s2 = f(arr, L, R - 1);

    // 需要配合先手返回最小值

    return Math.min(s1, s2);
}



function main2(scoreArr) {
    let N = scoreArr.length;
    let fMap = [];
    let gMap = [];
    for (let i = 0; i < N; i++) {
        fMap.push(new Array(N).fill(-1));
        gMap.push(new Array(N).fill(-1));
    }

    let firstScore = f1(scoreArr, 0, scoreArr.length - 1, fMap, gMap);
    let secondScore = g1(scoreArr, 0, scoreArr.length - 1, fMap, gMap);

    console.log(firstScore, secondScore);
    return Math.max(firstScore, secondScore);
}

function f1(arr, L, R, fMap, gMap) {
    // 之前已经计算过
    if (fMap[L][R] !== -1) {
        return fMap[L][R];
    } else {
        // 没有计算过
        let ans = 0;
        if (L === R) {
            ans = arr[L];
            fMap[L][R] = ans;
            return ans;
        } else {
            let s1 = arr[L] + g1(arr, L + 1, R, fMap, gMap);
            let s2 = arr[R] + g1(arr, L, R - 1, fMap, gMap);
            ans = Math.max(s1, s2);
            fMap[L][R] = ans;
            return ans;
        }
    }
}

function g1(arr, L, R, fMap, gMap) {
    // 之前已经计算过
    if (gMap[L][R] !== -1) {
        return gMap[L][R];
    } else {
        // 没有计算过
        let ans = 0;
        if (L === R) {
            // 最后一项登记返回值0
            gMap[L][R] = ans;
            return ans;
        } else {
            let s1 = f1(arr, L + 1, R, fMap, gMap);
            let s2 = f1(arr, L, R - 1, fMap, gMap);
            ans = Math.min(s1, s2);
            gMap[L][R] = ans;
            return ans;
        }
    }
}

// console.log(main2(scoreArr));
// console.log(main(scoreArr));


function main3(arr) {
    let N = arr.length;
    let fMap = [];
    let gMap = [];
    for (let i = 0; i < N; i++) {
        fMap.push(new Array(N).fill(0));
        // 对角线也设置为了0
        gMap.push(new Array(N).fill(0));
    }

    // 1.基础条件对角线设置值
    for (let i = 0; i < N; i++) {
        fMap[i][i] = arr[i];
    }

    // 2. 分别处理每张表的对角线
    for (let startCol = 1; startCol < N; startCol++) {
        let L = 0;
        let R = startCol;
        while (R < N) {
            fMap[L][R] = Math.max(arr[L] + gMap[L + 1][R], arr[R] + gMap[L][R-1]);
            gMap[L][R] = Math.min(fMap[L + 1][R], fMap[L][R-1]);
            L++;
            R++;
        }
    }


    console.log(fMap, gMap);
}

main3(scoreArr);

