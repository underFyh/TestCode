// // 结果为[c,b,a]
// let stack = ["a", "b", "c", "d"];
//
//
// // 返回栈底部元素,
// function f(stack) {
//     let result = stack.pop();
//     if (stack.length === 0) {
//         return result;
//     } else {
//         let last = f(stack);
//         // 不是底部元素添加回栈
//         stack.push(result);
//         return last
//     }
// }
//
// // f1() -> result=c  last=f2()
// // f2() -> result=b  last=f3()
// // f3() -> result=a  直接返回a
//
//
// function reverse(stack) {
//     if (stack.length === 0) return
//     let res = f(stack);
//     reverse(stack);
//     stack.push(res);
// }
//
// reverse(stack);
// console.log(stack);
//
//
//
//
//
//
//



let stack = ["a", "b", "c"];

function f(stack) {
    let result = stack.pop();
    if (stack.length === 0) {
        return result;
    } else {
        let last = f(stack);
        stack.push(result);
        return last;
    }
}

// console.log(f(stack));
// console.log(stack);


function reverse(stack) {
    if (stack.length === 0) return;
    let res = f(stack);
    reverse(stack);
    stack.push(res);
}

reverse(stack);
console.log(stack);



function fb(n) {
    if (n <= 2) return 1;
    return fb(n-2) + fb(n-1);
}

function fb2(n) {
    let map = [0];
    for (let i = 1; i <= n; i++) {
        if (i === 1 || i === 2) {
            map.push(1)
            continue
        }
        map[i] = map[i - 2] + map[i - 1];
    }

    console.log(map);

    return map[n];

}

console.log(fb2(8));