// 1. 挑选P值
// function pivot(arr) {
//     let M = Array.from({length: Math.ceil(arr.length / 5)});
//     let range = [0, 5];
//     for (let i = 0; i < M.length; i++) {
//         let group = arr.slice(range[0], range[1]);
//         group.sort((a, b) => a - b);
//         if (group.length === 5) {
//             M[i] = group[2];
//         } else {
//             let idx = (group.length >> 1) === 0 ? 0 : (group.length >> 1) - 1
//             M[i] = group[idx];
//         }
//         range[0] = range[1];
//         range[1] += 5;
//     }
//     console.log(M);
// }
//
// pivot([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);


function bfptr(arr, L, R, index) {
    if (L === R) return arr[L];

    let pivot = medianOfMedians(arr, L, R);
    let range = partRang(arr, L, R, pivot);

    if (index >= range[0] && index <= range[1]) {
        return arr[index]
    } else if (index < range[0]) {
        return bfptr(arr, L, range[0] - 1, index)
    } else {
        return bfptr(arr, range[1] + 1, R, index)
    }
}


function medianOfMedians(arr, L, R) {
    let size = R - L + 1;
    let offset = size % 5 === 0 ? 0 : 1;
    let mArr = Array.from({length: Math.floor(size / 5) + offset});

    for (let i = 0; i < mArr.length; i++) {
        let first = L + i * 5;
        mArr[i] = getMedia(arr, first, Math.min(R, first + 4));
    }

    // 获取mArr的中位数
    return bfptr(mArr, 0, mArr.length - 1, mArr.length >> 1);
}


function getMedia(arr, L, R) {
    insertionSort(arr, L, R);
    return arr[(L + R) >> 1];
}

function insertionSort(arr, L, R) {
    for (let i = L + 1; i <= R; i++) {
        let currentElement = arr[i];
        let j = i - 1;

        while (j >= L && arr[j] > currentElement) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = currentElement;
    }

    return arr;
}


function partRang(arr, L, R, pivot) {
    let less = L - 1;
    let more = R + 1;
    let cur = L;
    while (cur < more) {
        if (arr[cur] < pivot) {
            swap(arr, ++less, cur++);
        } else if (arr[cur] > pivot) {
            swap(arr, cur, --more);
        } else {
            cur++;
        }
    }
    return [less + 1, more - 1];
}

function swap(arr, i1, i2) {
    [arr[i1], arr[i2]] = [arr[i2], arr[i1]];
}




function testBFPRT() {
    const testCases = [
        {arr: [3, 2, 1, 5, 6, 4], k: 2, expected: 2},
        {arr: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4, expected: 3},
        {arr: [1, 1, 1, 2, 2, 2], k: 3, expected: 1},
        {arr: [7, 10, 4, 3, 20, 15], k: 3, expected: 7},
        {arr: [1], k: 1, expected: 1},
        {arr: [5, 4, 3, 2, 1], k: 5, expected: 5},
    ];

    testCases.forEach((testCase, index) => {
        const result = bfptr(testCase.arr, 0, testCase.arr.length - 1, testCase.k - 1);
        console.log(`Test Case ${index + 1}: ${result === testCase.expected ? 'PASSED' : 'FAILED'}`);
        console.log(`  Input: ${JSON.stringify(testCase.arr)}, k: ${testCase.k}`);
        console.log(`  Expected: ${testCase.expected}, Got: ${result}`);
    });
}

testBFPRT();