

// let score = [1,1,1,1];
//
// let a = {sum: 0};
// let b = {sum: 0};
//
// function f(score, playA, playB) {
//     if (score.length === 0) {
//         return playA.sum >= playB.sum ? playA : playB;
//     }
//     playA.sum += getMaxScore(score);
//     playB.sum += getMaxScore(score);
//     return f(score, playA, playB);
// }
//
// function getMaxScore(score) {
//     if (score.length === 1) {
//         return score.pop();
//     }
//     let left = score[0]
//     let right = score[score.length - 1];
//     if (left >= right) {
//         return score.shift();
//     } else {
//         return score.pop();
//     }
// }
//
//
// f(score, a, b);
// console.log(a, b);




let res = [];
function f2(x, y, x1, y1, path) {
    // 越界
    if (x > x1 || y > y1) {
        return;
    }
    // 满足
    if (x === x1 && y === y1) {
        res.push(path);
        return;
    }
    // 只能往下
    if (x === x1 && y < y1) {
        let nextPath = path + "↓ "
        return f2(x, y + 1, x1, y1, nextPath);
    }
    // 只能往右
    if (y === y1 && x < x1) {
        let nextPath = path + "→ "
        return f2(x + 1, y, x1, y1, nextPath);
    }

    // 先右在考虑下,减少重复返回情况
    if (x + 1 <= x1) {
        let rightPath = path + "→ ";
        f2(x + 1, y, x1, y1, rightPath);
    }
    if (y + 1 <= y1) {
        let downPath = path + "↓ ";
        f2(x, y + 1, x1, y1, downPath);
    }
}

f2(0,0,2,2, "");
console.log(res);






function main(x, y, x1, y1) {
    let map = [];
    let  count = 0;
    for (let i = 0; i <= y1; i++) {
        map.push(new Array(x1 + 1).fill(-1));
    }


}

main(0,0,2,2);



let obj = {
    a: {
        a: 1,
        b: 2,
        c: 3,
        d: {
            c: 4
        }
    },
    b: {
        c: 5
    },
    c: 6
}

// a.d.c = 4   b.c = 5  c = 6


function o(obj, path, res) {
    if (typeof obj !== "object") return;

    let keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
        let curKey = keys[i];
        if (curKey !== "c") {
            o(obj[curKey], path + `.${curKey}`, res);
        } else {
            res.push({[`${path}.${curKey}`]: obj[curKey]})
        }
    }
    return res;
}

// console.log(o(obj, "", []));

// 宽度优先
let queue = [];
function o1(obj, path, res) {
    if (typeof obj !== "object") return;

    Object.keys(obj).forEach(key => {
        if (key === "c") {
            res.push({[`${path}.${key}`]: obj[key]});
        } else {
            queue.unshift([obj[key], `${path}.${key}`]);
        }
    })

    while (queue.length > 0) {
        let cur = queue.pop();
        o1(cur[0], cur[1], res);
    }

    return res;
}

console.log(o1(obj, "", []));