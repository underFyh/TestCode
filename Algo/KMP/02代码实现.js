
// 求取一个字符串每个位置上的信息

// aaaa
function getStrInfo(str) {
    let lastIndex = str.length - 1; // 3
    let computedIndex = lastIndex - 1; // 2
    let maxLength = 0;
    let prev = "";
    let last = "";

    for (let i = 0; i < computedIndex; i++) {
        prev += str[i];
        last = str[computedIndex - i] + last;

        console.log(prev, last);
        if (prev === last) {
            maxLength = Math.max(prev.length, maxLength);
        }
    }

    return maxLength;
}

console.log(getStrInfo("abcabck"));
console.log(getStrInfo("aaaa"));