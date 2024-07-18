class ListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    // 添加新元素到链表尾部
    add(addNode) {
        let node = addNode;
        let current;

        if (this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }

    // 插入元素到指定位置
    insertAt(value, index) {
        if (index < 0 || index > this.size) {
            return false;
        } else {
            const node = new ListNode(value);
            let current = this.head;
            let previous;

            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                current = this.head;
                let it = 0;

                while (it < index) {
                    it++;
                    previous = current;
                    current = current.next;
                }

                node.next = current;
                previous.next = node;
            }
            this.size++;
        }
    }

    // 打印链表元素
    printList() {
        let current = this.head;
        let listValues = '';
        while (current) {
            listValues += current.value + ' -> ';
            current = current.next;
        }
        console.log(listValues + 'null');
    }

    // get
    getByIndex(index) {
        let v = this.head;
        while (index > 0) {
            v = v.next;
            index--;
        }
        return v;
    }
}

// 链表分组：根据3将链表分为小于、等于、大于3三个区域
let list1 = new LinkedList();
let list2 = new LinkedList();
let node0 = new ListNode(0);
let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);
let node4 = new ListNode(4);
let node5 = new ListNode(5);
let node6 = new ListNode(6);
let node7 = new ListNode(7);

list1.add(node0);
list1.add(node1);
list1.add(node2);
list1.add(node3);
list1.add(node4);

list2.add(node3);
list2.add(node6);
list2.add(node7);
// list.getByIndex(4).next = list.getByIndex(2);
// console.dir(list, {depth: 10});


// 通过快慢指针来获取第一个入环节点，如果不是环状则返回null
function getLoopNode(list) {
    let F = list.head;
    let S = list.head;

    // 尝试相遇
    while (F) {
        // 快指针后续没有值了则说明是单项链表
        if (F.next === null || F.next.next === null) {
            return null;
        }
        F = F.next.next;
        S = S.next;
        // 如果相遇终止循环
        if(F === S) {
            break;
        }
    }

    // 获取第一个入环节点,相遇则是第一个入环节点
    F = list.head;
    while (F) {
        F = F.next;
        S = S.next;
        if (F === S) break;
    }

    // 返回F S都可
    return F;
}

// 两者都是单向链表判断
function noLoopList(list1, list2) {
    if (list1 === null || list2 === null) {
        return null;
    }
    // 节点最后一个一定是相同地址
    let cur1 = list1.head;
    let cur2 = list2.head;

    let n = 0;
    while (cur1.next) {
        cur1 = cur1.next;
        n++;
    }

    while (cur2.next) {
        cur2 = cur2.next;
        n--;
    }

    // 如果最后一个节点都不同则都不相交，如果相交一定是Y字形状
    if (cur1 !== cur2) return null;


    // 相交，通过数值来获取相遇的节点
    cur1 = n >= 0 ? list1.head : list2.head;
    cur2 = n < 0 ? list2.head : list1.head;

    // 过滤掉长的节点
    n = Math.abs(n);
    while (n !== 0) {
        cur1 = cur1.next;
        n--;
    }

    while (cur2 !== cur2) {
        cur1 = cur1.next;
        cur2 = cur2.next;
    }

    // 返回其中任意一个即可
    return cur1

}

// 两者都是环状
function bothLoopList(list1, loop1, list2, loop2) {
    // 1. 入环的时候已经相交,将入环节点看为尾节点，进行对比
    if (loop1 === loop2) {
        let cur1 = list1.head;
        let cur2 = list2.head;
        let n = 0;
        while (cur1.next) {
            cur1 = cur1.next;
            n++;
        }
        while (cur2.next) {
            cur2 = cur2.next;
            n--;
        }
        cur1 = n >= 0 ? list1.head : list2.head;
        cur2 = n < 0 ? list2.head : list1.head;
        n = Math.abs(n);

        while (n !== 0) {
            cur1 = cur1.next;
            n--;
        }

        // 相交的节点可能在入环第一个，也可以在入环前一段距离
        while (cur1 !== cur2) {
            cur1 = cur1.next;
            cur2 = cur2.next;
        }
        return cur1;
    } else {
        // 2. 两者都不想交，或者入环后才相交
        cur1 = loop1.next;
        // 将入环节点进行跑一圈，看看里面是否包含另外一个链表的入环节点
        while (cur1 !== loop1) {
            if (cur1 === loop2) {
                return loop1 // 或者loop2也可
            }
            cur1 = cur1.next;
        }
        return null;
    }
}



function intersect(list1, list2) {
    let loop1 = getLoopNode(list1);
    let loop2 = getLoopNode(list2);

    // 情况1：两个都为单向链表
    if (loop1 === null && loop2 === null) {
        return noLoopList(list1, list2);
    }
    // 情况3：两者都是环状
    if (loop1 !== null && loop2 !== null) {
        return bothLoopList(list1, loop1, list2, loop2);
    }
    // 情况2：一个单向一个环向链表永不相交
    return null;
}


console.log(intersect(list1, list2));