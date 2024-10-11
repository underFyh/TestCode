const {List} = require("./baseData");
const {generateRandomArray, genRange} = require("../utils/array");

// 1. 获取不重复的最大子串长度
function lengthOfLongestSubstring(s) {
    let charSet = new Set();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}


// 2. 找到和最大的子数组
let arr = [-1, 1, 2, -2, 3];

function subMaxArr1(arr) {
    let max = -Number.MAX_VALUE;
    for (let left = 0; left < arr.length; left++) {
        for (let right = left; right < arr.length; right++) {
            let sum = 0;
            for (let i = left; i <= right; i++) {
                sum += arr[i];
            }
            max = Math.max(max, sum);
        }
    }
    return max
}

console.log(subMaxArr1([-6]));

function subMaxArr(arr) {
    // let maxList = new List();
    // let max = Number.MIN_VALUE;
    // // let right = 0;
    //
    // for (let left = 0; left < arr.length; left++) {
    //     let right = left;
    //     while (right < arr.length) {
    //         while (!maxList.isEmpty && arr[maxList.peekLast()] <= arr[right]) {
    //             maxList.pollLast();
    //         }
    //         maxList.addLast(right);
    //         max = Math.max(arr[maxList.peekFirst()], max);``
    //         right++;
    //     }
    // }
    //
    // // console.log(max);
    // return max;
    let maxSum = arr[0];
    let currentSum = arr[0];

    // [-1, 1, 2, -2, 3];
    for (let i = 1; i < arr.length; i++) {
        currentSum = Math.max(arr[i], currentSum + arr[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}
subMaxArr(arr);


function test() {
    for (let i = 0; i < 10000; i++) {
        let arr = generateRandomArray(genRange(1, 20), -100, 1000);

        let a1 = subMaxArr(arr);
        let a2 = subMaxArr1(arr);

        if (a1 !== a2) {
            console.log("error", a1, a2, arr);
        }

    }
    console.log("结束");
}

test();