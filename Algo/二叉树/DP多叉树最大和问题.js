class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}

let n0 = new Node(2);

let n1 = new Node(4);
let n2 = new Node(1);
let n3 = new Node(7);

let n4 = new Node(0);
let n5 = new Node(3);
let n6 = new Node(2);

let n7 = new Node(1);
let n8 = new Node(8);
let n9 = new Node(9);

let n10 = new Node(10);
let n11 = new Node(4);
let n12 = new Node(8);

n0.children = [n1, n2, n3];
n1.children = [n4, n5, n6];
n2.children = [n7, n8, n9];
n3.children = [n10, n11, n12];

console.log(n0);


class Info {
    constructor(selected, notSelected) {
        this.selected = selected; // 选择头结点的值
        this.notSelected = notSelected; // 不选择头节点值
    }
}


function process(x) {
    if (x === null) return new Info(0, 0);
    let children = x.children;
    let selectedValue = x.value;
    let notSelectedValue = 0;
    for (let i = 0; i < children.length; i++) {
        let item = children[i];
        let itemInfo = process(item);

        // 这个X树选择头结点的获取的值
        selectedValue += itemInfo.notSelected;
        // 这个X树不选择头结点获取的值
        notSelectedValue += Math.max(itemInfo.selected, itemInfo.notSelected);
    }
    return new Info(selectedValue, notSelectedValue);
}

function getMaxValue(root) {
    if (root === null) return 0;
    let info = process(root);
    return Math.max(info.selected, info.notSelected);
}

console.log(getMaxValue(n0));