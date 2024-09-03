
// 1. 打印一个数组字符串的全部排列
let strArr = ["a", "b", "c"];

function f(strArr, index, path, ans) {
    if (index === strArr.length) {
        ans.push(path);
        return;
    }
    // 当前处理的字符串
    let cur = strArr[index];
    // 1. 先不要当前字符串逻辑
    let noPath = path;
    f(strArr, index + 1, noPath, ans);
    // 2. 要当前字符串逻辑
    let yesPath = path + cur;
    f(strArr, index + 1, yesPath, ans);

    // 所有递归走完返回结果
    return ans;
}

console.log(f(strArr, 0, "", []));