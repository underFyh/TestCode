let message = {
    method: "sendPersonalWords", // 个人话术  企业话术:sendFirmWords
    data: "", // 数据内容
    code: 200, // 成功状态码
    errorMsg: "" // 成功为空
}

// 点击发送触发该事件
// window.parent.postMessage(message, "*");


const regex = /<div[^>]*data-w-e-type="copyImg"[^>]*>([\s\S]*?)<\/div>/;
let str = `<p>111</p><div data-w-e-type=\"copyImg\">https://img0.baidu.com/it/u=0</div><div data-w-e-type=\"copyImg\">https://img0.baidu.com/it/u=1</div>`
// console.log(str.match(regex));
// console.log(str.match(regex));

// console.log(regex.exec(str));
// console.log(regex.exec(str));
// console.log(regex.exec(str));

// console.log(regex.exec(str));
// console.log(regex.exec(str));
// console.log(regex.exec(str));

// console.log(str.replace("<div data-w-e-type=\"copyImg\">https://img0.baidu.com/it/u=3267521133</div>", ""));

// console.log(regex.exec(str));
// console.log(regex.exec(str));
// console.log(regex.exec(str));
let m;
while (m = regex.exec(str)) {
    str = str.replace(m[0], "");
    m = regex.exec(str)
}
console.log(str);

let arr = [0,1,2];

arr.splice(arr.length - 1, 0, "a");
console.log(arr);