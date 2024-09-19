// 空间压缩技巧
const {generateRandomArray, genRange} = require("../utils/array");


let matrix = [
    [1, 10, 1, 2],
    [2, 1, 1, 2],
    [2, 1, 1, 2]
]

/**
 * 暴力递归方法
 * @param matrix
 * @return {number|*}
 */
function f(matrix) {
    let a = matrix.length - 1;
    let b = matrix[0].length - 1;
    return process(matrix, 0, 0, a, b);
}
function process(matrix, x, y, a, b,) {
    // 越界则不处理
    if (x > a || y > b) return 0;
    if (a === x && b === y) {
        return matrix[x][y];
    }
    // 每次走就修改原数组值
    // 当前方块值
    let cur = matrix[x][y];
    // 选择左边
    let p1 = process(matrix, x, y + 1, a, b);
    // 选择右边
    let p2 = process(matrix, x + 1, y, a, b);
    return cur + Math.max(p1, p2);
}

/**
 * 根据递归进行改写，填报顺序从后往前
 * @param matrix
 * @return {number}
 */
function dp(matrix) {
    let a = matrix.length - 1;
    let b = matrix[0].length - 1;
    let dp = Array.from({
        length: a + 1,
    }, () => Array.from({length: b + 1}, () => 0));

    // 1. 基础
    dp[a][b] = matrix[a][b];

    // 先填写最后一行
    for (let y = b - 1; y >= 0; y--) {
        let cur = matrix[a][y]
        dp[a][y] = cur + dp[a][y + 1];
    }
    // 在填写最后一列
    for (let x = a - 1; x >= 0; x--) {
        let cur = matrix[x][b];
        dp[x][b] = cur + dp[x + 1][b];
    }

    for (let x = a - 1; x >= 0; x--) {
        for (let y = b - 1; y >= 0; y--) {
            let cur = matrix[x][y];
            let p1 = dp[x][y + 1];
            let p2 = dp[x + 1][y];
            dp[x][y] = cur + Math.max(p1, p2);
        }
    }
    return dp[0][0];
}
// dp(matrix);


/**
 * 创建一个和二维数组一样大小的表，进行按顺序填写
 * @param m
 * @return {number}
 */
function dp1(m) {
    let a = m.length - 1;
    let b = m[0].length - 1;
    let dp = Array.from({
        length: a + 1,
    }, () => Array.from({length: b + 1}, () => 0));

    // 1. 先填写初始位置
    dp[0][0] = m[0][0];

    // 2. 第一行数据只能从左边依此往右填写
    for (let i = 1; i <= b; i++) {
        dp[0][i] = dp[0][i - 1] + m[0][i];
    }

    // 3. 第一列的数据只能从上往下填写
    for (let i = 1; i <= a; i++) {
        dp[i][0] = dp[i - 1][0] + m[i][0];
    }

    // 4. 依此填写表格
    for (let i = 1; i <= a; i++) {
        for (let j = 1; j <= b; j++) {
            // 上边的值
            let p1 = dp[i - 1][j];
            // 左边的值
            let p2 = dp[i][j - 1];

            // 表格填写的值选当前较大的
            let cur = m[i][j];
            dp[i][j] = cur + Math.max(p1, p2);
        }
    }


    console.log(dp);
    // 返回最后
    return dp[a][b];
}
dp1(matrix);

/**
 * 空间优化，两个数组代替二维数组
 * @param m
 */
function dp2(m) {
    let a = m.length - 1;
    let b = m[0].length - 1;
    // 第一列数组只能从左往右填写，取二维数组的第一列进行累加
    let firstRow = m[0];
    let curRowArr = firstRow.reduce((prev, cur, index) => {
        if (index === 0) {
            prev[index] = cur;
        } else {
            prev[index] = cur + prev[index - 1];
        }
        return prev;
    }, []);
    let nextRowArr = [];

    for (let i = 1; i <= a; i++) {
        nextRowArr[0] = curRowArr[0] + m[i][0];
        for (let j = 1; j <= b; j++ ) {
            // nextRowArr[j] =
            // 上边值
            let p1 = curRowArr[j];
            // 左边值
            let p2 = nextRowArr[j - 1];

            // 当前值
            let cur = m[i][j];
            nextRowArr[j] = cur + Math.max(p1, p2);
        }
        curRowArr = nextRowArr;
        nextRowArr = [];
    }
    return curRowArr[b];
}
// dp2(matrix);
/**
 * 空间继续优化，用一个数组代替两个数组
 * @param m
 */
function dp3(m) {
    let a = m.length - 1;
    let b = m[0].length - 1;
    // 第一列数组只能从左往右填写，取二维数组的第一列进行累加
    let firstRow = m[0];
    let curRowArr = firstRow.reduce((prev, cur, index) => {
        if (index === 0) {
            prev[index] = cur;
        } else {
            prev[index] = cur + prev[index - 1];
        }
        return prev;
    }, []);

    for (let i = 1; i <= a; i++) {
        for (let j = 0; j <= b; j++) {
            // 当前网格值
            let cur = m[i][j];
            // 上面的值
            let prevUpValue = curRowArr[j];
            // 第0列，只依赖上面数据
            if (j === 0) {
                curRowArr[j] = prevUpValue + cur;
            } else {
                let prevLeftValue = curRowArr[j - 1];
                curRowArr[j] = cur + Math.max(prevUpValue, prevLeftValue);
            }
        }
    }

    console.log(curRowArr);
    return curRowArr[b];
}

console.log(dp3(matrix));


// 对数器
function test() {
    let time = 1000;
    for (let i = 0; i <= time; i++) {
        let arr = creatMa();
        let ans1 = f(arr);
        let ans2 = dp2(arr);
        let ans3 = dp1(arr);
        let ans4 = dp3(arr);
        if (ans1 !== ans2 || ans2 !== ans3 || ans1 !== ans4) {
            // console.log(ans1);
            console.log(`Error: ${ans2} !== ${ans3}`)
            break;
        }
    }
    console.log("结束");
    function creatMa() {
        let arr = [];
        let outLen = genRange(1, 15);
        let innerLen = genRange(1, 15);
        for (let i = 0; i < outLen; i++) {
            arr.push(generateRandomArray(innerLen, 1, 100))
        }
        return arr;
    }
}
// test();

