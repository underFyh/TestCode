function loader2(source) {
    console.log("loader2 处理");
    return source + "\r\n // loader2";
}

module.exports = loader2;
