const {singleStack1, Stack} = require("./01dataBase");
/**
 * 给定一个非负数组arr,代表直方图返回直方图的最大长方形面积
 */

let arr = [3, 2, 4, 2, 5];


function f(arr) {
    let max = 0;
    let single = singleStack1(arr);

    for (let i = 0; i < arr.length; i++) {
        let rang = single[i];
        if (rang[1] === -1) rang[1] = arr.length - 1;
        let count = (rang[1] - 1) - (rang[0] + 1) + 1;
        max = Math.max(max, count * arr[i]);
    }

    console.log(max);
    return max;
}

f([1, 2, 3, 4, 5, 6]);

// 相同值处理情况分析

function f1(arr) {
    let stack = new Stack();
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        // 如果即将进入栈顶的数据比
        while (!stack.isEmpty && arr[i] < arr[stack.peek()]) {
            let popIdx = stack.pop();
            let left = stack.isEmpty ? -1 : stack.peek();
            // 区间个数
            let count = (i - 1) - (left + 1) + 1;
            max = Math.max(max, count * arr[popIdx]);
        }
        stack.push(i);
    }

    while (!stack.isEmpty) {
        let popIdx = stack.pop();
        let left = stack.isEmpty ? -1 : stack.peek();
        let right = arr.length - 1;
        // 区间个数
        let count = (right - 1) - (left + 1) + 1;
        max = Math.max(max, count * arr[popIdx]);
    }

    return max;
}

f1([1, 2, 3, 4, 5, 6]);