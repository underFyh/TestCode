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

// 链表分组：根据3将链表分为小于、等于、大于3三个区域
let list = new LinkedList();
list.add(3);
list.add(5);
list.add(1);
list.add(6);
list.add(2);
list.add(3);
list.add(7);
list.printList();


function part(list, pivot) {
    let sH = null; // 小于区域头结点
    let sE = null; // 小于区域尾结点, 注意尾节点为最后一个元素，并非null
    let eH = null; // 等于区域头结点
    let eE = null; // 等于区域尾结点
    let mH = null; // 大于区域头结点
    let mE = null; // 大于区域尾结点

    let head = list.head;
    while (head) {
        let value = head.value;
        // 给各个头尾节点设置值
        setValue(value, pivot);
        head = head.next;
    }

    // 小于区域有值
    if (sE !== null) {
        sE.next = eH; // 小于区域的尾指向等于头
        // 等于区域尾节点赋值, 有值则用原有值，无值则用小于区域尾节点
        eE = eE === null ? sE : eE;
    }

    // 链接所有
    if (eE != null) {
        eE.next = mH;
    }

    return sH !== null ? sH : (eH != null ? eH : mH);



    // 判断区域并非赋值节点
    function setValue(value, pivot) {
        let node = new ListNode(value);
        if (value > pivot) {
            gt(node);
        } else if (value === pivot) {
            equal(node);
        } else {
            lt(node)
        }
    }

    function gt(node) {
        // 大于区域没有
        if (mH === null) {
            mH = node;
            mE = node;
            mH.next = mE;
        } else {
            mE.next = node;
            mE = mE.next;
        }
    }
    function lt(node) {
        // 小于区域没有
        if (sH === null) {
            sH = node;
            sE = node;
            sH.next = sE;
        } else {
            sE.next = node;
            sE = sE.next;
        }
    }
    function equal(node) {
        // 大于区域没有
        if (eH === null) {
            eH = node;
            eE = node;
            eH.next = eE;
        } else {
            eE.next = node;
            eE = eE.next;
        }
    }
}


console.dir(part(list, 3), {depth: 7});
