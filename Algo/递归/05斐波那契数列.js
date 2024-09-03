function fb1(n) {
    if (n === 0) return 0;
    if (n === 1) return 1;

    return fb1(n - 1) + fb1(n - 2);
}


let map = [0,1]
function fb2(n, map) {
    if(typeof map[n] === "number"){
        return map[n];
    } else {
        // 获取结果返回前进行缓存
        let ans = fb2(n - 1, map) + fb2(n - 2, map);
        map.push(ans);
        return ans;
    }
}

function fb3(n) {
    let map = [0,1];
    if (n <= 1) return map[n];

    for (let i = 2; i <= n; i++) {
        map[i] = map[i - 1] + map[i - 2];
    }
    return map[n];
}

console.log(fb1(10));
console.log(fb2(6, map));
console.log(fb3(6));
console.log(map);


