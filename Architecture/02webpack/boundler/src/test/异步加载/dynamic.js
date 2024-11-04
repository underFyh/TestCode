// 入口文件模块信息记录，通过这个记录可以运行require函数生成模块信息
let allModules = {}
let cache = {};
function myRequire(moduleId) {
    let moduleValue = cache[moduleId];
    if (moduleValue !== undefined) return moduleValue;

    // 说明需要载入模块（创建模块进行赋值）
    let module = cache[moduleId] = {
        exports: {}
    }

    // 执行模块依赖关系给创建的module赋值然后返回
    allModules[moduleId](module, module.exports, myRequire);
    return module.exports;
}

myRequire.m = allModules;
myRequire.f = {};

// jsonp
// 需要一个对象记录已经加载的代码块，各个状态下的代码了
let installedChunks = {
    main: 0, // 代码块main已经加载完成
}
// j -> jsonp
myRequire.f.j = function (chunkId, promises) {
    // 1. 先创建promise进行保存
    // 看看有没有chunkId
    let installedChunkData; // 后面会有缓存判断，如果动态引入两次第二次不会加载
    let promise = new Promise((resolve, reject) => {
        // 从右往左进行赋值，当异步代码块加载完后让当前的promise变为成功态
        installedChunkData = installedChunks[chunkId] = [resolve, reject]
    })
    // 将这个promise放入这个记录去
    installedChunkData[2] = promise;
    // 并且将这个promise保存到记录的promises数组中
    promises.push(promise);

    // 2. 开始拼接jsonp请求地址进行请求
    const url = myRequire.p + myRequire.u(chunkId);
    myRequire.l(url) // 加载

}

// 加载额外的代码块
myRequire.e = function (chunkId) {
    let promises = [];
    // j方法会创建promise添加到这个数组中去
    require.f.j(chunkId, promises);
    // 返回新的promise
    // todo:为什么需要promises数组进行记录，后续功能需要，这里简单的理解就是返回了当前的require.f.j方法创建的promise,不看做为数组
    // 后续关心什么情况下数组大于1
    return Promise.all(promises);
}

myRequire.p = "" // 公共路径
myRequire.u = (chunkId) => `${chunkId}.main.js` // 打包后的名称
myRequire.l = (url) => {
    const script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
}


// 全局变量构建
let chunkLoadingGlobal = window["someName"] = [];
chunkLoadingGlobal.push = webpackJsonpCallback;

// 参数是二维数组需要解构
function webpackJsonpCallback([chunkIds, moreModules]) {
    const resolves = []; // 获取所有的成功的resolve

    for (let i = 0; i < chunkIds.length; i++) {
        let chunkId = chunkIds[i];
        // 通过installedChunks取出之前加载的resolve方法,放入resolves中去
        const resolve = installedChunks[chunkId][0];
        resolves.push(resolve);
        // 此时代码块加载完成值改为0
        installedChunks[chunkId] = 0;
    }

    // 合并模块定义
    for (const moduleId in moreModules) {
        allModules[moduleId] = moreModules[moduleId];
    }

    // 取出所有resolve方法进行执行，让他对应的promise变为成功态
    while (resolves.length) {
        resolves.shift()();
    }
}


myRequire.e("src_title_js").then(() => {
    return myRequire("./src/tittle.js");
})


// bind理解，直接写一个成功的回调,这个this指针也可以是null
myRequire.e("src_title_js").then(myRequire.bind(myRequire, "./src/tittle.js")).then(exports => {
    console.log(exports);
})



