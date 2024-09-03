/**
 * 左->右
 * @param N 代表当前汉诺塔个数 N = 3 代表现在左边有三个1 2 3汉诺塔需要移动到右边
 */
function leftToRight(N) {
    if (N === 1) {
        console.log("Move 1 from left to right");
        return
    }
    leftToMid(N-1);
    console.log(`Move ${N} from left to right`);
    midToRight(N-1);
}


// 左->中
// N = 2
function leftToMid(N) {
    if (N === 1) {
        console.log("Move 1 from left to middle");
        return
    }
    leftToRight(N - 1);
    console.log(`Move ${N} from left to middle`);
    rightToMid(N-1);
}

// 右到中
function rightToMid(N) {
    if (N === 1) {
        console.log("Move 1 from right to middle");
        return
    }
    rightToLeft(N-1);
    console.log(`Move ${N} from right to middle`);
    leftToMid(N - 1);
}

// 右到左
function rightToLeft(N) {
    if (N === 1) {
        console.log("Move 1 from right to left");
        return
    }
    rightToMid(N - 1);
    console.log(`Move ${N} from right to left`);
    midToLeft(N - 1);
}

// 中到左
function midToLeft(N) {
    if (N === 1) {
        console.log("Move 1 from middle to left");
        return
    }
    midToRight(N-1);
    console.log(`Move ${N} from middle to left`);
    rightToMid(N - 1);
}

// 中到右
function midToRight(N) {
    if (N === 1) {
        console.log("Move 1 from middle to right");
        return
    }
    midToLeft(N -1);
    console.log(`Move ${N} from middle to right`);
    leftToRight(N - 1);
}


function hanoi(n) {
    leftToRight(n);
}
hanoi(3);

console.log("___________________")



// 上述代码优化 - 通过参数减少递归情况
function hanoi2(n, from, to, other) {
    if (n === 1) {
        console.log(`1 handle ${from} -> ${to}`);
        return;
    }
    // 1. 将上面的（1-2）移动到另外区域
    hanoi2(n - 1, from, other, to);
    // 2. 将底部移动到右边打印
    console.log(`${n} handle ${from} -> ${to}`);
    // 3. 将另外区域的移动到右边
    hanoi2(n-1, other, to, from);
}

hanoi2(3, "left", "right", "middle");
