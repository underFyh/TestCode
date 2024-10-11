/**
 * 给定一个数组arr, 返回所有子数组最小值的累加和
 */
const {Stack} = require("./01dataBase");

let arr = [11,81,94,43,3];

function f(arr) {
    let res = 0;
    let stack = new Stack();
    for (let i = 0; i < arr.length; i++) {
        // 如果新进入的数比栈顶小，则记录
        while (!stack.isEmpty && arr[i] < arr[stack.peek()]) {
            let popIdx = stack.pop();
            let left = stack.isEmpty ? -1 : stack.peek();
            let start = left + 1;
            let end = i - 1;
            res += getSubArrMinValue(start, end, popIdx, arr);
        }
        stack.push(i);
    }

    while (!stack.isEmpty) {
        let popIdx = stack.pop();
        let left = stack.isEmpty ? -1 : stack.peek();
        let right = -1;

        let start = left + 1;
        let end = arr.length - 1;
        res += getSubArrMinValue(start, end, popIdx, arr);
    }

    console.log(res);

    /**
     *
     * @param start 当前index作为最小值区间开始位置
     * @param end   当前index作为最小值区间结束位置
     * @param index 当前最小项的位置
     * @param arr   取值数组
     */
    function getSubArrMinValue(start, end, index, arr) {
        // [ 3, 4, 2, 6 ]  => [3,4,2] [3,4,2,6]   [4,2] [4,2,6]  [2] [2,6]
        let sum = 0;
        for (let i = start; i <= index; i++) {
            let innerStart = index;
            while (innerStart <= end) {
                sum += arr[index];
                innerStart++;
            }
        }
        return sum;
    }

}

f(arr)


// [ a...i...b ]  a - b位置的和


// 记录数组里每项最左边的位置
function nearLessEqualLeft(arr) {
    let leftArr = [];
    let stack = new Stack();

    for (let i = arr.length - 1; i >= 0; i--) {
        while (!stack.isEmpty && arr[i] <= arr[stack.peek()]) {
            let popIdx = stack.pop();
            leftArr[popIdx] = i;
        }
        stack.push(i);
    }

    while (!stack.isEmpty) {
        let popIdx = stack.pop();
        leftArr[popIdx] = -1;
    }

    return leftArr;
}

function nearLessRight(arr) {
    let rightArr = [];
    let stack = new Stack();

    for (let i = 0; i <= arr.length - 1; i++) {
        while (!stack.isEmpty && arr[i] < arr[stack.peek()]) {
            let popIdx = stack.pop();
            rightArr[popIdx] = i;
        }
        stack.push(i);
    }

    while (!stack.isEmpty) {
        let popIdx = stack.pop();
        rightArr[popIdx] = arr.length;
    }
    return rightArr;
}

function main(arr) {
    let left = nearLessEqualLeft(arr);
    let right = nearLessRight(arr);

    let ans = 0;
    for (let i = 0; i < arr.length; i++) {
        let start = i - left[i];
        let end = right[i] - i;
        ans += start * end *  arr[i];
        // ans %= 1000000007;
    }
    console.log(left);
    console.log(right);
    return ans;

}

main([3,1,2,4]);