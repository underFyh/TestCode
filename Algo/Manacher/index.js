
// 获取回文串，正反过来一样
let str = "aaaa";
// console.log(str.replace(/.{0}/g, "#"));



function f(str) {
    // aaaa => #a#a#a#a#
    let formatStr = str.replace(/.{0}/g, "#");
    // 最小回文串长度为1
    let max = 1;

    for (let i = 0; i < formatStr.length; i++) {
        let left = i - 1;
        let right = i + 1;

        while (left >= 0 && right < formatStr.length && formatStr[left] === formatStr[right]) {
            // 新长度和老长度进行对比取值
            max = Math.max(max, right - left + 1);
            left--;
            right++;
        }
    }


    return max >> 1;
}



// 获取最长回文串
function f1(str) {
    let formatStr = str.replace(/.{0}/g, "#");
    let res = "";

    for (let i = 0; i < formatStr.length; i++) {
        let left = i - 1;
        let right = i + 1;

        while (left >= 0 && right < formatStr.length) {
            if (formatStr[left] === formatStr[right]) {
                if (right - left + 1 > res.length) {
                    res = formatStr.slice(left, right);
                }
                left--;
                right++;
            } else {
                break;
            }
        }
    }
    return res.replace(/#/g, "");
}

