const { singleStack, Stack } = require("./01dataBase");
const {generateRandomArray, genRange} = require("../utils/array");

/**
 * 给定一个只包含正数的数组arr,arr中任何一个子数组sub,
 * 一定都可以算出(sub累加和)*(Sub中的最小值)是什么，
 * 那么所有子数组中，这个值最大是多少？
 *
 * 1. 前缀和数组快速求出区间值
 * 2.
 */


let arr = [3, 4, 2, 3, 4, 6];
function f(arr) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        let sub = getSubArr(i, arr);
        let sum = sub.reduce((prev, curr) => prev + curr, 0);
        max = Math.max(max, arr[i] * sum);
    }
    return max;
    function getSubArr(index, arr) {
        let val = arr[index];
        let sub = [val];
        let left = index - 1;
        while (left >= 0 && arr[left] >= val) {
            sub.unshift(arr[left]);
            left--;
        }

        let right = index + 1;
        while (right <= arr.length && arr[right] >= val) {
            sub.push(arr[right]);
            right++;
        }
        return sub;
    }
}


// console.log(f([ 444, 825 ]));


function f1(arr) {
    // 前缀和
    let sum = arr.reduce((prev, curr, index) => {
        index === 0 ? prev[index] = curr : (prev[index] = prev[index - 1] + curr);
        return prev;
    }, []);

    // 公式求出前缀和l到r范围值
    function getRangeSum(sum, l, r) {
       if (l === 0) return sum[r];
       return sum[r] - sum[l - 1];
    }

    let max = 0;
    let stack = new Stack();
    for (let i = 0; i < arr.length; i++) {
        while (!stack.isEmpty && arr[i] <= arr[stack.peek()]) {
            let j = stack.pop();
            let rang = [stack.isEmpty ? 0 : stack.peek() + 1, i - 1];
            max = Math.max(max, (getRangeSum(sum, rang[0], rang[1]) * arr[j]));
        }
        stack.push(i);
    }
    while (!stack.isEmpty) {
        let j = stack.pop();
        let rang = [stack.isEmpty ? 0 : stack.peek() + 1, arr.length - 1];
        max = Math.max(max, (getRangeSum(sum, rang[0], rang[1]) * arr[j]));
    }
    return max;
}

// console.log(f1([3, 4, 2, 3, 4, 6] ));


function test() {
    for (let i = 1; i < 100000; i++) {
        let arr = generateRandomArray(genRange(1, 30), 1, 1000);

        let a1 = f(arr);
        let a2 = f1(arr);

        if (a1 !== a2) {
            console.log("error", arr, a1, a2);
            break;
        }
    }
    console.log("结束");
}
test();

