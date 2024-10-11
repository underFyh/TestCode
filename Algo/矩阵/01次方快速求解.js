
// console.log(Math.pow(10, 75));

// let bin = Number(30).toString(2);


// let bin = "0b" + (Number(75).toString(2));
// let res = 1;
// let mi = 1;
// for (;bin !== 0; bin >>= 1) {
//     // console.log(mi, bin);
//     if ((bin & 1) !== 0) {
//         res *= Math.pow(3, mi);
//     }
//     mi *= 2;
// }
// console.log(res);
// console.log(res == Math.pow(3, 75));
// console.log(Math.pow(3, 75));

//
// const BigNumber = require('/bignumber.js');
//
// let bin = Number(75).toString(2);
// let res = new BigNumber(1);
// let mi = new BigNumber(1);
//
// for (let i = bin.length - 1; i >= 0; i--) {
//     if (bin[i] === '1') {
//         res = res.multipliedBy(BigNumber(3).pow(mi));
//     }
//     mi = mi.multipliedBy(2);
// }
//
// console.log(res.toString());
// console.log(res.isEqualTo(BigNumber(3).pow(75)));


// let bin = "0b" + Number(30).toString(2);
let bin = "0b" + Number(75).toString(2);
let res = 1; // 结果
let mi = 1; // 次方
for (; bin !== 0; bin >>= 1) {
    // 查看最后一位是否为0，如果为0则不算入结果
    if (bin & 1 !== 0) {
        console.log(mi); // 1 2 8 64
        res *= Math.pow(5, mi);
    }
    mi *= 2;
}

console.log(res === Math.pow(5, 75));


