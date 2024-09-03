class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    swap(index1, index2) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (this.getParentIndex(index) >= 0 && this.heap[this.getParentIndex(index)] > this.heap[index]) {
            this.swap(this.getParentIndex(index), index);
            index = this.getParentIndex(index);
        }
    }

    extractMin() {
        if (this.heap.length === 0) {
            return null;
        }
        if (this.heap.length === 1) {
            return this.heap.pop();
        }
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown();
        return min;
    }

    heapifyDown() {
        let index = 0;
        while (this.getLeftChildIndex(index) < this.heap.length) {
            let smallerChildIndex = this.getLeftChildIndex(index);
            if (this.getRightChildIndex(index) < this.heap.length && this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]) {
                smallerChildIndex = this.getRightChildIndex(index);
            }
            if (this.heap[index] <= this.heap[smallerChildIndex]) {
                break;
            }
            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }
    }
}
// 使用示例
const minHeap = new MinHeap();
class Machine {
    constructor(t, w) {
        this.timePoint = t;
        this.workTime = w;
    }
    valueOf() {
        return this.timePoint + this.workTime;
    }
}


/**
 *
 * @param arr    每天机器工作时间
 * @param N      N个人需要泡咖啡
 * @return {*[]} 返回每个人喝完的时间点
 */
function minTimeLine(arr, N) {
    let minHeap = new MinHeap();
    // arr => 转换为对象并且入堆
    arr.forEach(time => {
        minHeap.insert(new Machine(0, time));
    });

    let timeLineArr = [];
    for (let i = 0; i < N; i++) {
        let machine = minHeap.extractMin();
        // 下次可用时间点，也就是当前人喝完时间
        machine.timePoint += machine.workTime;
        timeLineArr[i] = machine.timePoint;
        minHeap.insert(machine);
    }

    return timeLineArr;
}

/**
 *
 * @param timeLine  N个人喝完的时间点
 * @param washTime  洗干净的时间
 * @param airTime   挥发时间
 * @param index     当前洗到哪个杯子
 * @param free      洗咖啡机可用的时间点
 * @return {number} 洗干净的时间点
 */
function bestTime(timeLine, washTime, airTime, index, free) {
    if (index === timeLine.length) return 0;

    // 1.选择洗的情况，要么喝完了洗，要么等洗咖啡机空闲了才能洗，两者取大
    // [ 1,2 ] 第一杯1时间可以洗，需要洗5个时间段，第二杯2时间段就可以洗了，但是要等第一杯洗完也就是在6时间段才能洗
    // 选择机器洗完的时间点
    let washCleanPoint = Math.max( timeLine[index], free ) + washTime;
    // 选择机器洗后还剩余杯子清洗需要的时间
    let restCleanPoint = bestTime(timeLine, washTime, airTime, index + 1, washCleanPoint);
    // 需要取大的值，因为木桶原理，最后得到的值必须是所有杯子都清洗干净后的时间点
    let p1 = Math.max(washCleanPoint, restCleanPoint);

    // 2.选择挥发
    let washCleanPoint2 = timeLine[index] + airTime;
    // 挥发不影响机器使用时间，直接使用上一个时间点即可
    let restCleanPoint2 = bestTime(timeLine, washTime, airTime, index + 1, free);
    let p2 = Math.max(washCleanPoint2, restCleanPoint2);

    return Math.min(p1, p2);
}

// console.log(bestTime(timeLine, 1, 5, 0, 0));


// 改动态规划 业务限制模型
// 可变参数为index 和 free （不好估测，那就拿最差的情况，每个杯子都去洗）
/**
 *
 * @param timeLine  记录所有人喝完的时间点，也就是开始洗咖啡杯时间点
 * @param washTime  洗咖啡需要多久
 * @param airTime   挥发需要多久
 * @return {any}
 */
function dp(timeLine, washTime, airTime) {
    let N = timeLine.length; // (0 - N)
    let maxTimePoint = 0;
    timeLine.forEach(time => {
        maxTimePoint = Math.max(time, maxTimePoint) + washTime;
    })

    let dp = Array.from({ length: N + 1 }, () => new Array(maxTimePoint + 1).fill(0));

    // 1.基础情况 index === timeLine.length = 0  N行为0基本情况已经填写

    // 2. bestTime(index + 1) 可知每一行依赖下一行，所以是自底向上,并且左右没有依赖关系那就从左到右
    for (let i = N - 1; i >= 0; i--) {
        for (let free = 0; free < maxTimePoint; free++) {
            // 假设每个杯子都去清洗，并且最大洗完时间点为100.那么则没有必要讨论
            if (Math.max(timeLine[i], free) + washTime > maxTimePoint) {
                continue;
            }

            // 1. 机器洗
            let washPoint = Math.max(timeLine[i], free) + washTime;
            let restPoint = dp[i+1][washPoint];
            let p1 = Math.max(washPoint, restPoint);

            // 2. 挥发
            let washPoint2 = timeLine[i] + airTime;
            let restPoint2 = dp[i+1][free];
            let p2 = Math.max(washPoint2, restPoint2);

            dp[i][free] = Math.min(p1, p2);
        }
    }

    // 递归入参为0 0
    return dp[0][0]
}

// console.log(dp([1, 2, 3, 4], 1, 5));

function main1(arr, n, a, b) {
    let timeLine = minTimeLine(arr, n);
    return bestTime(timeLine, a, b, 0, 0);
}

function main2(arr, n, a, b) {
    let timeLine = minTimeLine(arr, n);
    return dp(timeLine, a, b);
}

// console.log(main1([1, 2, 3, 4], 4, 1, 2));
// console.log(main2([1, 2, 3, 4], 4, 1, 2));


// 生成随机数组
function generateRandomArray(length, min, max) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function test() {
    let len = 5;
    let max = 9;
    let testTime = 50000;
    for (let i = 1; i < testTime; i++) {
        let arr = generateRandomArray(len, 1, max);
        let n = Math.floor(Math.random() * 5) + 1;
        let a = Math.floor(Math.random() * 5) + 1;
        let b = Math.floor(Math.random() * 10) + 1;

        let ans1 = main1(arr, n, a, b);
        let ans2 = main2(arr, n, a, b);

        if (ans1 !== ans2) {
            console.log(arr);
            break;
        }
    }
    console.log("success");
}

test();

