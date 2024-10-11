
function kmp(s1, s2) {
    if (s1.length < s2.length) return -1;

    // 1. 定义对比变量
    let x = 0; // 对比时候s1移动的位置
    let y = 0; // 对比时候s2移动的位置

    // 2. 获取s2的next数组信息
    let next = getNextInfo(s2);

    // 3. 循环对比
    while (x < s1.length && y < s2.length) {
        // 字符串对比相等,则都+1对比后面的
        if (s1[x] === s2[y]) {
            x++;
            y++;
            // 说明没有匹配上,需要用新的开头进行对比
        } else if (next[y] === -1) {
            x++;
        } else {
            // 坐标跳转模拟s2右移动操作
            y = next[y]
        }
    }

    // 4. 循环完毕后判断
    // 如果y坐标能走过整个s2的长度，则说明匹配上了,用x - y(s2的长度)就可以求出匹配的位置
    return y === s2.length ? x - y : -1;
}


function getNextInfo(s2) {
    if (s2.length === 1) return [-1];
    let next = Array.from({ length: s2.length });
    next[0] = -1;
    next[1] = 0;

    // next填写从2未知开始
    let i = 2;
    // cn就是前一位（i-1）的next值
    // 因为第一次是从2位置开始，并且1位置的next值为0，所以开始设置为0
    let cn = 0;

    while (i < s2.length) {
        // 匹配成功相等
        if (s2[i - 1] === s2[cn]) {
            // 设置i位置的值为（i-1）的next + 1
            // 通过++cn，后面求i+1位置时候需要使用i位置的next值,通过++cn刚好求出了这个值
            next[i++] = ++cn;

            // 说明?号位置(i-1位置最长前缀后一位字符)没有和i-1位置匹配上，则继续分割
            // 通过next[cn]刚好可以获取继续划分后?号位置的next值
        } else if (cn > 0) {
            cn = next[cn];
        } else {
            // 说明没有匹配到
            next[i++] = 0;
        }
    }

    return next;
}
