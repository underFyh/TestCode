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
    add(value) {
        let node = new ListNode(value);
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
}

// 使用LinkedList类
let list = new LinkedList();
list.add(1);
list.add(2);
list.add(1);
// list.insertAt(4, 2);
list.printList(); // 输出应为 1 -> 2 -> 4 -> 3 -> null


// 1 - 2 - 3 - 4
// 获取链表中点 不通过size属性
function getMiddle(list, prev) {
    // 利用fast指针每次比slow指针多走一步,只要fast走到了尾部节点，则slow走到了中点
    let fast = list.head;
    let slow = list.head;
    while (fast.next !== null) {
        if (fast.next.next === null) {
            // 如果是偶数个则会有中后节点
            // 继续往后跳获取靠后中节点
            if (prev) {
                // 不跳获取靠前中节点
                break;
            } else {
                fast = fast.next;
            }
        } else {
            fast = fast.next.next;
        }
        slow = slow.next;
    }
    // 中节点
    return slow;
}
//
// getMiddle(list);


// 翻转链表 通过栈空间
// function reverseLinkList1(list) {
//     let stack = [];
//     let head = list.head;
//     while (head) {
//         stack.push(head);
//         head = head.next;
//     }
//     let newHead = stack.pop();
//     let resHead = newHead;
//     while (stack.length > 0) {
//         let next = stack.pop();
//         newHead.next = next;
//         newHead = next;
//     }
//     newHead.next = null;
//     return resHead;
// }
// console.dir(reverseLinkList1(list), {depth: 3});

// 通过while循环
// function reverseLinkList2(list) {
//     let head = list.head;
//     // 1 -> 2 -> 3
//     let newHead = null;
//     while (head) {
//         let next = head.next;
//         head.next = newHead;
//         newHead = head;
//         head = next;
//     }
//     return newHead
// }
// console.dir(reverseLinkList2(list), {depth: 4});

// 通过递归形式
// 1 -> 2 -> 3 -> null
// function reverseLinkList3(head) {
//     if (head === null || head.next === null) return head;
//     let newHead = reverseLinkList3(head.next);
//     head.next.next = head;
//     head.next = null;
//     return  newHead
// }
//
// console.log(reverseLinkList3(list.head));


// 判断一个链表是否为逆序链表
// 1->2->2->1
// 不借助额外空间,就在原有链表上进行判断
function isReBackLink(list) {
    let center = getMiddle(list, true);
    let backList = center.next;
    center.next = null;

    // 翻转后半部分链表
    let newHead = center;
    while (backList) {
        let next = backList.next;
        backList.next = newHead;
        newHead = backList;
        backList = next;
    }

    // 原链表 1-> 2
    console.log(list);
    let prevHead = list.head;
    // 后半部分链表 1->2
    console.log(newHead);
    // 进行对比
    let flag = true;
    while (prevHead) {
        if (prevHead.value !== newHead.value) {
            flag = false;
            break;
        } else {
            prevHead = prevHead.next;
            newHead = newHead.next;
        }
    }
    return flag;
}

console.log(isReBackLink(list));