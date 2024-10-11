const {generateRandomArray, genRange} = require("../utils/array");
class Stack {
    constructor() {
        this.value = [];
    }

    get isEmpty() {
        return this.value.length === 0;
    }

    push(value) {
        this.value.push(value);
    }

    peek() {
        return this.value[this.value.length - 1];
    }

    pop() {
        return this.value.pop();
    }
}

// 数组没有重复值情况
function singleStack(arr) {
    let res = [];
    let stack = new Stack();

    for (let i = 0; i < arr.length; i++) {
        let cur = arr[i];
        // 栈不为空，并且放入的值小于栈顶值时候需要记录
        while (!stack.isEmpty && cur < arr[stack.peek()]) {
            let recordIndex = stack.pop();
            let left = stack.isEmpty ? -1 : stack.peek();
            res[recordIndex] = [left, i];
        }
        stack.push(i);
    }

    // 处理剩余栈中记录
    while (!stack.isEmpty) {
        let recordIndex = stack.pop();
        res[recordIndex] = [stack.isEmpty ? -1 : stack.peek(), -1];
    }
    return res
}

// console.log(singleStack([3, 1, 2, 4]));


// stack里面存放的是链表，链表里面存放的是索引，如果相等则放入一个链表中（用数组代替）
function singleStack1(arr) {
    let res = [];
    let stack = new Stack();

    for (let i = 0; i < arr.length; i++) {
        let cur = arr[i];  // 当前要放入的值

        // 如果新进入的数据比栈顶的数据小， arr[stack.peek()[0]获取栈顶的值是什么
        while (!stack.isEmpty && cur < arr[stack.peek()[0]]) {
            let popIs = stack.pop(); // 链表集合进行弹出设置
            // 如果栈顶还有数据，则选择栈顶链表中最后一个作为左边界值
            let leftLink = stack.peek();
            let left = stack.isEmpty ? -1 : leftLink[leftLink.length - 1];
            // 设置弹出索引的左、右两边值
            for (let j = 0; j < popIs.length; j++) {
                let idx = popIs[j];
                res[idx] = [left, i];
            }
        }

        // 新进入的数据和栈相等，直接在链表中追加
        if (!stack.isEmpty && cur === arr[stack.peek()[0]]) {
            stack.peek().push(i);
        } else {
            // 新进入的数据需要放入栈顶，此时先要将索引变为一个链表
            stack.push([i]);
        }
    }

    // 处理剩余的栈数据
    while (!stack.isEmpty) {
        let popIs = stack.pop();
        let leftLink = stack.peek();
        let left = stack.isEmpty ? -1 : leftLink[leftLink.length - 1];
        for (let j = 0; j < popIs.length; j++) {
            let idx = popIs[j];
            res[idx] = [left, -1];
        }
    }

    return res;
}

// console.log(singleStack1([3, 1, 2, 3]));
// let res = singleStack1([3, 1, 2, 3]);
// console.log(v(res, [3, 1, 2, 3]));
console.log(singleStack1([3, 3, 3]));


function generateUniqueRandomArray(length, min, max) {
    if (max - min + 1 < length) {
        throw new Error("范围内的数字不足以生成所需长度的数组");
    }
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < length) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        uniqueNumbers.add(randomNumber);
    }
    return Array.from(uniqueNumbers);
}

function test() {
    for (let i = 0; i < 10000; i++) {
        let arr = generateUniqueRandomArray(1000, -1000, 1000)
        let a1 = singleStack(arr);
        let a2 = singleStack1(arr);
        if (a1 !== a2) {
            console.log("error", a1, a2);
            break;
        }
    }
    console.log("结束");
}
// test();



// 检验结果是否正确
function check(res, arr) {
    let flag = true;
    for (let i = 0; i < res.length; i++) {
        let value = arr[i];
        let left = res[i][0];
        let right = res[i][1];

        if (arr[left] >= value || arr[right] >= value) {
            flag = false;
            // break;
        }
    }
    return flag;
}


// 校验有相同项的单调栈函数
function test1() {
    for (let i = 0; i < 100000; i++) {
        let arr = generateRandomArray(genRange(1, 200), -10000, 10000);
        let res = singleStack1(arr);
        let checkValue = check(res, arr);
        if (!checkValue) {
            console.log("error");
            break;
        }
    }
    console.log("结束");
}
// test1();


module.exports = {
    singleStack,
    singleStack1,
    Stack
}