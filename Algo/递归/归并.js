let arr = [4, 3, 1, 2];

function mergeSort(arr, L, R) {
    if (L === R) return;
    let mid = Math.floor((L + R) / 2);
    mergeSort(arr, L, mid);
    mergeSort(arr, mid + 1, R);
    sort(arr, L, R, mid);
}


mergeSort(arr, 0, arr.length - 1);
console.log(arr);

function sort(arr, l, r, m) {
    let help = [];
    let p1 = l;
    let p2 = m + 1;
    let i = 0;

    while (p1 <= m && p2 <= r) {
        help[i++] = arr[p1] <= arr[p2] ? arr[p1++] : arr[p2++];
    }

    while (p1 <= m) {
        help[i++] = arr[p1++];
    }

    while (p2 <= r) {
        help[i++] = arr[p2++];
    }

    for (let i = 0; i < help.length; i++) {
        arr[l + i] = help[i];
    }
}


let str = "abc";


function f(strArr, index, path, res) {
    if (index === str.length) {
        res.push(path);
        return
    }

    // for (let i = 0; i < strArr.length; i++) {
    //     let cur = strArr[i];
    //     path += cur
    //     // 除去这个选择
    //     strArr.splice(i, 1);
    //     f(strArr, index + 1, path + cur, res);
    //     strArr.splice(i, 0, cur);
    // }

    for (let i = 0; i < strArr.length; i++) {
        let first = strArr[i];
        path += first;
        strArr.splice(i, 1);
        f(strArr, index + 1, path, res);
        strArr.splice(i, 0, first);
    }

    console.log(res);

}

// function f(strArr, path, res) {
//     if (strArr.length === 0) {
//         res.push(path);
//         return;
//     }
//
//     // for (let i = 0; i < strArr.length; i++) {
//     //     let cur = strArr[i];
//     //     path += cur
//     //     // 除去这个选择
//     //     strArr.splice(i, 1);
//     //     f(strArr, index + 1, path + cur, res);
//     //     strArr.splice(i, 0, cur);
//     // }
//
//     for (let i = 0; i < strArr.length; i++) {
//         let first = strArr[i];
//         path += first;
//         strArr.splice(i, 1);
//         f(strArr, path, res);
//         strArr.splice(i, 0, first);
//     }
//
//     console.log(res);
//
// }

f(["a", "b", "c"], 0, "", []);
