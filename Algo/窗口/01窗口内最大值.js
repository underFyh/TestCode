const {generateRandomArray, genRange} = require("../utils/array");
const {Queue, List} = require("./baseData");

let arr = [4, 3, 5, 4, 3, 3, 6, 7];

function f(arr, w) {
    let queue = new Queue(arr);
    let res = [];
    for (let i = 0; i < w; i++) {
        queue.push(i);
    }
    res.push(queue.peekFirst());

    let startIdx = w;
    while (startIdx < arr.length) {
        queue.push(startIdx);
        queue.popFirst(startIdx - w);
        res.push(queue.peekFirst());
        startIdx++;
    }
    // console.log(res);
    return JSON.stringify(res);
}

function f1(arr, w) {
    let N = arr.length;
    let res = [];

    let left = 0;
    let right = w - 1;

    for (let i = right; i < N; i++) {
        let v = [];
        let j = left;
        while (j <= i) {
            v.push(arr[j]);
            j++;
        }
        res.push(Math.max(...v));
        left++;
    }

    return JSON.stringify(res);
}

// f1(arr, 3);

function test() {
    for (let i = 0; i < 10000; i++) {
        let maxLen = genRange(3, 15);
        let arr = generateRandomArray(maxLen, 1, 100);
        let w = genRange(1, maxLen);

        let a1 = f(arr, w);
        let a2 = f1(arr, w);
        let a3 = f2(arr, w);

        if (a1 !== a2 || a2 !== a3) {
            console.log("error", a1, a2);
        }
        // console.log(arr, w);
    }

    console.log("结束");
}
test();


// 直接利用一个数组进行实现

function f2(arr, w) {
    let maxWindow = new List();
    let res = [];

    // 初始化
    for (let i = 0; i < w; i++) {
        while (!maxWindow.isEmpty && arr[maxWindow.peekLast()] <= arr[i]) {
            maxWindow.pollLast();
        }
        maxWindow.addLast(i);
    }
    res.push(arr[maxWindow.peekFirst()]);

    // 使用窗口滑动
    let left = 0;
    let right = w;
    while (right < arr.length) {
        // 即将出去的left指针如果是窗口内最大值，则窗口需要弹出该索引
        if (left === maxWindow.peekFirst()) {
            maxWindow.pollFirst();
        }
        // right右扩的内容进入队列
        while (!maxWindow.isEmpty && arr[maxWindow.peekLast()] <= arr[right]) {
            maxWindow.pollLast();
        }
        maxWindow.addLast(right);
        res.push(arr[maxWindow.peekFirst()]);
        right++;
        left++;
    }

    return JSON.stringify(res);
}

// f2(arr, 3);