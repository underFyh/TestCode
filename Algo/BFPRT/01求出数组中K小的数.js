// 在一个无须数组的找到第k小的数
let arr = [100, 20, 50, 70, 60, 30, 10, 10, 55];

// 1. 排序获取
function f1(arr, k) {
    if (k > arr.length) return null;
    let sortArr = [...arr].sort((a, b) => a - b);
    return sortArr[k - 1];
}

// console.log(f1(arr, 3));


// 2. 修改快排进行获取
function f2(arr, k) {
    return process(arr, 0, arr.length - 1, k - 1);
}


function process(arr, L, R, index) {
    if (L === R) return arr[L];
    // 获取随机值
    let pivot = arr[Math.floor(Math.random() * arr.length)];
    let range = partRang(arr, L, R, pivot);

    if (index >= range[0] && index <= range[1]) {
        return arr[index];
        // 小于区间处理
    } else if (index < range[0]) {
        return process(arr, L, range[0] - 1, index);
    } else {
        // 大于区间处理
        return process(arr, range[1] + 1, R, index);
    }
}


// 根据值获取分组索引
function partRang(arr, L, R, pivot) {
    let less = L - 1;
    let more = R + 1;
    let cur = L;
    while (cur < more) {
        if (arr[cur] < pivot) {
            swap(arr, ++less, cur++);
        } else if (arr[cur] > pivot) {
            swap(arr, cur, --more);
        } else {
            cur++;
        }
    }
    return [less + 1, more - 1];
}

function swap(arr, i1, i2) {
    [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}

