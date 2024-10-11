const { Stack } = require("./01dataBase");

let matrix = [
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1],
    [0, 1, 1, 0, 1, 1],
];


function f(matrix) {
    if (matrix == null || matrix.length === 0 || map[0].length === 0) {
        return 0;
    }
    let max = 0;
    let baseArr = [];
    for (let i = 0; i < matrix.length; i++) {
        baseArr[i] = [];
        let item = matrix[i];
        for (let j = 0; j < item.length; j++) {
            baseArr[i][j] = item[j] === 0 ? 0 : ( i - 1 >= 0 ? baseArr[i - 1][j] + item[j] : item[j] );
        }
    }


    for (let i = 0; i < baseArr.length; i++) {
        let item = baseArr[i];
        let stack = new Stack();
        for (let j = 0; j < item.length; j++) {
            while (!stack.isEmpty && item[j] < item[stack.peek()]) {
                let popIdx = stack.pop();
                let left = stack.isEmpty ? -1 : stack.peek();
                let count = j - 1 - left;
                // console.log([left, j], item[popIdx], count * item[popIdx], `index:${i}行${popIdx}`);
                max = Math.max(max, count * item[popIdx]);
            }
            stack.push(j);
        }

        while (!stack.isEmpty) {
            let popIdx = stack.pop();
            let left = stack.isEmpty ? -1 : stack.peek();
            let count = item.length - 1 - left;
            // console.log(count, item[popIdx]);
            // console.log([left, item.length - 1], item[popIdx], popIdx, count * item[popIdx], `index:${i}行${popIdx}`);
            max = Math.max(max, count * item[popIdx]);
        }

    }

    return max;
}

f(matrix);


