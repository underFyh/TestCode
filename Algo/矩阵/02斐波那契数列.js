

function fb(n) {
    if (n <= 2) return 1;
    return fb(n - 2) + fb(n - 1)
}

// console.log(fb(4));

// 1 1 2 3


function f3(n) {
    if (n < 1) return 0;
    if (n === 1 || n === 2) return 1;

    let base = [
        [1,0],
        [1,0]
    ]

    let res = matrixPower(base, n - 2);
    console.log(res, 1);
    return res[0][0] + res[1][0];
}

function matrixPower(m, p) {
    let res = Array.from({length: m.length}, () => Array.from({length: m[0].length}, () => 0));
    for (let i = 0; i < res.length; i++) {
        res[i][i] = 1;
    }
    console.log(res, 2);
    // res = 矩阵中的1
    let t = JSON.parse(JSON.stringify(m));
    for (; p !== 0; p >>= 1) {
        if ((p & 1) !== 0) {
            res = muliMatrix(res, t);
        }
        t = muliMatrix(t, t);
    }

    return res;
}

function muliMatrix(m1, m2) {
    let res = Array.from({length: m1.length}, () => Array.from({length: m2[0].length}, () => 0));
    console.log(res, 3);
    for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m2[0].length; j++) {
            for (let k = 0; k < m2.length; k++) {
                res[i][j] += (m1[i][k] * m2[k][j]);
            }
        }
    }
    return res;
}

// console.log(muliMatrix(b, b));

console.log(f3(4));

