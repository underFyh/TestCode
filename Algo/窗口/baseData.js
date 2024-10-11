

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

// 是否添加由外部控制
class List {
    constructor() {
        this.value = []; // 只存放索引
    }
    get isEmpty() {
        return this.value.length === 0;
    }
    // 添加
    addLast(index) {
        this.value.push(index);
    }
    // 删除最后一个
    pollLast() {
        this.value.pop();
    }
    // 删除第一个
    pollFirst() {
        this.value.shift();
    }
    // 查看左边最值（大）
    peekFirst() {
        if (this.isEmpty) {
            return null;
        }
        return this.value[0];
    }
    // 查看最右边值
    peekLast() {
        if (this.isEmpty) {
            return null;
        }
        return this.value[this.value.length - 1];
    }
}


module.exports = {
    Queue,
    List
};