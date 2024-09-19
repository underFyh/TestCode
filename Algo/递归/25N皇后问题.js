function f(N) {
    let sum = N * N;
    let arr = [];
    for (let i = 0; i < sum; i++) {
        arr.push(i);
    }
    return process(arr, N, N);
}

console.log(f(8));

function process(arr, N, times) {
    if (arr.length === 0 && times > 0) return 0;
    if (times === 0) return 1;
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        let no = cannotSelect(i, N);
        let next = nextSelect(arr, no);
        total += process(next, N, times - 1);
    }
    return total;
}


function cannotSelect(index, N) {
    let res = [];
    let bounder = N - 1;
    let row = Math.floor(index / N);
    let col = index % N;

    // 右下找
    let nextRow = row + 1;
    let nextCol = col + 1;
    while (nextRow <= bounder && nextCol <= bounder) {
        res.push(nextRow * N + nextCol);
        nextRow++;
        nextCol++;
    }

    // 左上找
    nextRow = row - 1;
    nextCol = col - 1;
    while (nextRow >= 0 && nextCol >= 0) {
        res.push(nextRow * N + nextCol);
        nextRow--;
        nextCol--;
    }

    // 右上找
    nextRow = row - 1;
    nextCol = col + 1;
    while (nextRow >= 0 && nextCol <= bounder) {
        res.push(nextRow * N + nextCol);
        nextRow--;
        nextCol++;
    }

    // 左下找
    nextRow = row + 1;
    nextCol = col - 1;
    while (nextRow <= bounder && nextCol >= 0) {
        res.push(nextRow * N + nextCol);
        nextRow++;
        nextCol--;
    }

    // 加入行
    for (let i = row * N; i < row * N + N; i++) {
        if (!res.includes(i)) {
            res.push(i);
        }
    }

    // 加入列
    for (let i = col; i <= (N * (N - 1) + col); i += N) {
        if (!res.includes(i)) {
            res.push(i);
        }
    }
    return res;
}
function nextSelect(arr, no) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        if (!no.includes(i)) {
            res.push(i);
        }
    }
    return res;
}

cannotSelect(0, 4);