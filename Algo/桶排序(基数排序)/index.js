
// 101  001  022  031  040
// count [ 1, 3, 1, 0 ... ] 下标表示末位数，值表示次数
// count2 个位前缀累加和为 [ 1, 4, 5, 5, 5... ]   <=0范围1个  <=1范围4个  <=2范围5个

// 开始从右往左轮询插入的数组
// 040 -> 末位为0,根据累加和数组0位置上的数为1，表示该范围只有一个所以放入到help数组中第一位 [ 040, .. ]
// 031 -> 末位为1,根据累加和数组1位置上的数为4, 表示该范围上有4个数,也就是help数组0-3位置,又因为是从右往左考察，所以放在最右边3位置 [040, null, null, 031]
// 022 -> 末位为2,根据累加和数组2位置上的数为5, 表示该范围上有5个数,也就是help数组0-4位置,又因为是从右往左考察，所以放在最右边4位置 [040, null, null, 031, 022]
// 001 -> 末位为1,根据累加和数组1位置上的数为4, 表示该范围上有4个数,也就是help数组0-3位置,又因为是从右往左考察, 但是由于3位置已经被占用所以放入到2位置 [040, null, 001, 031, 022]
// 101 -> 末位为1,根据累加和数组1位置上的数为4, 表示该范围上有4个数,也就是help数组0-3位置,又因为是从右往左考察, 但是由于3、2位置已经被占用所以放入到1位置 [040, 101, 001, 031, 022]

// 经过上述过程，就可以不依靠二维数组队列排序


let arr = [101, 1, 22, 31, 40]

function countSort(arr) {
    const maxValue = Math.max(...arr);
    const outCount = getCounts(maxValue);

    // 最大几位数轮询几次
    for (let i = 1; i <= outCount; i++) {
        arr = walk(arr, i);
    }
    return arr;

    function walk(arr, p) {
        let subCountArr = new Array(10).fill(0);
        // 记录arr当前的后缀是多少
        let tailArr = [];
        for (let i = 0; i < arr.length; i++) {
            let cur = arr[i];
            let tailNum = getTail(cur, p);
            subCountArr[tailNum]++;
            tailArr.push(tailNum);
        }
        // 获取累计和数组
        const totalCountArr = subCountArr.reduce((prev, cur, index) => {
            if (index === 0) {
                prev[index] = cur;
            } else {
                prev[index] = cur + prev[index - 1];
            }
            return prev;
        }, [])

        // 右往左遍历
        let r = arr.length - 1;
        // 根据位数放入
        let help = new Array(arr.length).fill(null);
        while (r >= 0) {
            let tail = tailArr[r];
            // 这里range不可能为负数，因为totalCountArr是累加和数组
            let range = totalCountArr[tail] - 1; // 当前数对应的范围，例如2则说明0-1索引位置
            while (help[range] !== null) {
                range--;
            }
            // 存入数
            help[range] = arr[r];
            r--;
        }
        return help;
    }
}

countSort(arr)

// 获取最大几位数
function getCounts(num) {
    let count = 1;
    let p = 10;
    while (num % p !== num) {
        count++;
        p *= 10;
    }
    return count;
}

function getTail(num, p) {
    // p = 1求个位  2求十位
    while (p - 1 >= 1) {
        num = Math.floor((num / 10));
        p--;
    }
    return num % 10;
}


// console.log(getTail(25, 1));

function generateRandomArray(length, min, max) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

let randomArray = generateRandomArray(100000, 0, 10000);

let a = randomArray.sort((a, b) => a - b);
let b = countSort(JSON.parse(JSON.stringify(randomArray)));

let flag = true;
for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
        flag = false;
        break;
    }
}
console.log(flag);



