function loader1(source) {
    console.log("loader1 处理");
    return source + "\r\n // loader1";
}

module.exports = loader1;
