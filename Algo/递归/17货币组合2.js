
function f(arr, aim) {
    return process()
}


function process(arr, rest, l, r) {
    if (rest < 0) return 0;
    if (rest === 0) return 1;


    // 1. 只选l
    let p1 = process(arr, rest - arr[l], l + 1, r);

    // 2. 只选r
    let p2 = process(arr, rest - arr[r], l, r - 1);

    // 3. 都不
    let p3 = process(arr, rest, l-1, r - 1);

    // 4. 都选
}