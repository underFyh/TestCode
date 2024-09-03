/**
 *
 * @param length 数组长度
 * @param min    数组最小值
 * @param max    数组最大值
 * @return {unknown[]} 随机数组
 */
function generateRandomArray(length, min, max) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function genRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


module.exports = {
    generateRandomArray,
    genRange
}