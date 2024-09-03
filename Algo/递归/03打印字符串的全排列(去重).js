
let strArr = ["a", "c", "c"];




function f2(strArr, index, ans) {
    if (index === strArr.length) {
        ans.push(strArr.join(""));
        return;
    }
    // 创建登记表
    let visited = [];
    for (let i = index; i < strArr.length; i++) {
       if (!visited.includes(strArr[i])) {
           visited.unshift(strArr[i]);
           // 交换数组顺序
           swap(strArr, index, i);
           f2(strArr, index + 1, ans);
           // 递归处理完成后要恢复现场，进行下次递归取值
           swap(strArr, index, i);
       }
    }
    return ans;
}

console.log(f2(strArr, 0, []));


function swap(strArr, i, j) {
    let temp = strArr[i];
    strArr[i] = strArr[j];
    strArr[j] = temp;
}


