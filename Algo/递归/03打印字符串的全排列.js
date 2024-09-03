
let strArr = ["a", "c", "c"];

function f(strArr, path, ans) {
    if (strArr.length === 0) {
        ans.push(path);
        return
    }
    // 每个数组做第一位
    for (let i = 0; i < strArr.length; i++) {
        let cur = strArr[i];
        strArr.splice(i, 1);
        f(strArr, path + cur, ans);
        // 恢复现场 a作为第一个处理完后需要将数组恢复为[a,b,c]再拿b作为第一个进行分析
        // 不恢复下次只有[b,c]进行全排列
        strArr.splice(i, 0, cur);
    }
    return ans;
}

// console.log(f(strArr, "", []));



// index只能和后面索引进行交换
function f2(strArr, index, ans) {
    if (index === strArr.length) {
        ans.push(strArr.join(""));
        return;
    }
    for (let i = index; i < strArr.length; i++) {
        // 交换数组顺序
        swap(strArr, index, i);
        f2(strArr, index + 1, ans);
        // 递归处理完成后要恢复现场，进行下次递归取值
        swap(strArr, index, i);
    }
    return ans;
}

console.log(f2(strArr, 0, []));


function swap(strArr, i, j) {
    let temp = strArr[i];
    strArr[i] = strArr[j];
    strArr[j] = temp;
}


