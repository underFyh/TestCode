let target = "babac"
let arr = ["ba", "c", "abcd"]


function minStickers1(stickers, target) {
    let ans = process1(stickers, target);
    return ans === Number.MAX_VALUE ? -1 : ans;
}

function process1(stickers, target) {
    if (target.length === 0) return 0;
    let min = Number.MAX_VALUE;

    for (let i = 0; i < stickers.length; i++) {
        let firstStr = stickers[i];
        let restTarget = minus(target, firstStr);
        if (restTarget.length !== target.length) {
            min = Math.min(min, process1(stickers, restTarget));
        }
    }
    return min + (min === Number.MAX_VALUE ? 0 : 1);
}



function minus(target, firstStr) {
    let targetArr = target.split("");
    let firstStrArr = firstStr.split("");
    let last = new Array(26).fill(0);
    for (let i = 0; i < targetArr.length; i++) {
        let index = targetArr[i].charCodeAt(0) - 97;
        last[index] = ++last[index]
    }
    for (let i = 0; i < firstStrArr.length; i++) {
        let index = firstStrArr[i].charCodeAt(0) - 97;
        if (last[index] > 0) {
            last[index] = --last[index];
        }
    }
    return last.reduce((prev, cur, index) => {
        if (cur > 0) {
            for (let i = 1; i <= cur; i++) {
                prev += String.fromCharCode(index + 97)
            }
        }
        return prev;
    }, "");
}



// 优化通过词频统计
// ["a", "b"] => [1,1,0,0,...]
function minStickers2(stickers, target) {
    let N = stickers.length;
    // stickers 转换为二维数组统计每个字符出现的词频
    // a => [1,0,...]  b => [0,1,0,...]
    const counts = [];
    for (let i = 0; i < N; i++) {
        let item = new Array(26).fill(0);
        let cur = stickers[i];
        for (let j = 0; j < cur.length; j++) {
            item[cur[j].charCodeAt(0) - 97]++
        }
        counts.push(item)
    }

    let ans = process2(counts, target);
    return ans === Number.MAX_VALUE ? -1 : ans;
}

// console.log(minStickers1(["a", "b"], "ab"));
console.log(minStickers2(["a", "b"], "ab"));

function process2(stickers, target) {
    if (target.length === 0) {
        return 0;
    }
    // target也转换为词频统计
    let N = target.length;
    let targetArr = target.split("");
    let targetCount = new Array(26).fill(0);
    for (let i = 0; i < N; i++) {
        let curIndex = targetArr[i].charCodeAt(0) - 97;
        targetCount[curIndex]++;
    }
    let min = Number.MAX_VALUE;
    for (let i = 0; i < stickers.length; i++) {
        let sticker = stickers[i];
        // 关键优化，如果贴纸中有包含目标字符串第一个再进行后续操作
        if (sticker[target[0].charCodeAt(0) - 97] > 0) {
            let restStr = "";
            for (let j = 0; j < 26; j++) {
                if (targetCount[j] > 0) {
                    let restNums = targetCount[j] - sticker[j];
                    // 将剩下的转换为字符串
                    for (let k = 0; k < restNums; k++) {
                        restStr += String.fromCharCode(j + 97)
                    }
                }
            }
            min = Math.min(min, process2(stickers, restStr));
        }
    }
    return min + (min === Number.MAX_VALUE ? 0 : 1);
}



function minStickers3(stickers, target) {
    let N = stickers.length;
    // stickers 转换为二维数组统计每个字符出现的词频
    // a => [1,0,...]  b => [0,1,0,...]
    const counts = [];
    for (let i = 0; i < N; i++) {
        let item = new Array(26).fill(0);
        let cur = stickers[i];
        for (let j = 0; j < cur.length; j++) {
            item[cur[j].charCodeAt(0) - 97]++
        }
        counts.push(item)
    }
    // target => value
    let dp = new Map();
    let ans = process3(counts, target, dp);
    return ans === Number.MAX_VALUE ? -1 : ans;
}

// console.log(minStickers1(["a", "b"], "ab"));
console.log(minStickers3(["with","example","science"], "thehat"));

function process3(stickers, target, dp) {
    if (dp.get(target)) return dp.get(target);
    if (target.length === 0) {
        return 0;
    }
    // target也转换为词频统计
    let N = target.length;
    let targetArr = target.split("");
    let targetCount = new Array(26).fill(0);
    for (let i = 0; i < N; i++) {
        let curIndex = targetArr[i].charCodeAt(0) - 97;
        targetCount[curIndex]++;
    }
    let min = Number.MAX_VALUE;
    for (let i = 0; i < stickers.length; i++) {
        let sticker = stickers[i];
        // 关键优化，如果贴纸中有包含目标字符串第一个再进行后续操作
        if (sticker[target[0].charCodeAt(0) - 97] > 0) {
            let restStr = "";
            for (let j = 0; j < 26; j++) {
                if (targetCount[j] > 0) {
                    let restNums = targetCount[j] - sticker[j];
                    // 将剩下的转换为字符串
                    for (let k = 0; k < restNums; k++) {
                        restStr += String.fromCharCode(j + 97)
                    }
                }
            }
            min = Math.min(min, process3(stickers, restStr, dp));
        }
    }
    let ans = min + (min === Number.MAX_VALUE ? 0 : 1);
    dp.set(target, ans);
    return ans;
}