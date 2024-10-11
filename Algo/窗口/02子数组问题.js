const {List} = require("./baseData");

let arr = [2, 3, 4, 5, 6, 7];

let arr1 = [0, 0, 0, 5] // 3  r = 3


function f(arr, num) {
    let count = 0;
    for (let left = 0; left < arr.length; left++) {
        for (let right = left; right < arr.length; right++) {
            let min = arr[left];
            let max = arr[left];

            // min和max都和子数组的第一个值进行比较
            for (let x = left + 1; x <= right; x++) {
                min = Math.min(arr[x], min);
                max = Math.max(arr[x], max);
            }

            if (max - min <= num) {
                count++;
            }
        }
    }
    return count;
}

//
console.log(f1([0, 0, 0, 5], 3));


function f1(arr, num) {
    let maxList = new List();
    let minList = new List();
    let count = 0;
    let right = 0;

    for (let left = 0; left < arr.length; left++) {
        while (right < arr.length) {
            // 最大队列和最小队列各自维护最大和最小值
            while (!maxList.isEmpty && arr[maxList.peekLast()] <= arr[right]) {
                maxList.pollLast();
            }
            maxList.addLast(right);

            while (!minList.isEmpty && arr[minList.peekLast()] >= arr[right]) {
                minList.pollLast();
            }
            minList.addLast(right);

            let min = arr[minList.peekFirst()];
            let max = arr[maxList.peekFirst()];

            if (max - min > num) {
                break;
            } else {
                right++;
            }
        }
        count += right - left;

        if (maxList.peekFirst() === left) maxList.pollFirst();
        if (minList.peekFirst() === left) minList.pollFirst();
    }
    return count;
}

// f1(arr, 3)




