const {generateRandomArray, genRange} = require("../utils/array");

let arr = [4, 3, 5, 4, 3, 3, 6, 7];


class Queue {
    constructor(rawArr) {
        this.arr = rawArr;
        this.queue = []; // 存放索引
    }

    // 获取队列最后的值
    getQueueLastValue() {
        let qLastIndex = this.queue.length - 1;
        // 越界
        if (qLastIndex === -1) return Number.MIN_VALUE;
        return this.arr[this.queue[qLastIndex]]
    }

    push(index) {
        if (this.queue.length === 0) {
            this.queue.push(index);
            return
        }
        let pushValue = this.arr[index];
        let queueLastValue = this.getQueueLastValue();

        if (queueLastValue > pushValue) {
            this.queue.push(index);
            return;
        }
        while (queueLastValue <= pushValue) {
            this.queue.pop();
            queueLastValue = this.getQueueLastValue();
            if (queueLastValue === Number.MIN_VALUE) {
                break;
            }
        }
        this.queue.push(index);
    }

    peekFirst() {
        if (this.queue.length === 0) return undefined;
        return this.arr[this.queue[0]];
    }

    popFirst(index) {
        if (this.queue.length === 0) return;
        if (this.queue[0] === index) {
            this.queue.shift();
        }
    }
}

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

// function test() {
//     for (let i = 0; i < 10; i++) {
//         let maxLen = genRange(3, 15);
//         let arr = generateRandomArray(maxLen, 1, 100);
//         let w = genRange(1, maxLen);
//
//         let a1 = f(arr, w);
//         let a2 = f1(arr, w);
//
//         if (a1 !== a2) {
//             console.log("error", a1, a2);
//         }
//         console.log(arr, w);
//     }
//
//     console.log("结束");
// }
// test();

console.log(f([84, 100, 23, 91], 2));
console.log(f1([84, 100, 23, 91], 2));