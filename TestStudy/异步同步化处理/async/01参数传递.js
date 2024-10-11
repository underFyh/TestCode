function getFirst() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Math.random());
        }, 500);
    })
}

function getSecond(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num > 0.5) {
                resolve("获取成功");
            } else {
                reject("获取失败");
            }
        }, 300);
    });
}

function* gen() {
    const num = yield getFirst();
    const res = yield getSecond(num);

    return res;
}

const it = gen();

const {value} = it.next();
value.then(num => {
    console.log(num);
    const {value} = it.next(num);
    value.then(res2 => {
        console.log(res2);
        console.log(it.next("成功"));
    }).catch(err => {
        console.log(err);
        console.log(it.next("失败"));
    })
})

// console.log(it.next());