// 1. 异步读取两个结果然后结合输出
function getUserA() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("UserA")
        }, 500);
    })
}

function getUserB(userA) {
    console.log("print:", userA);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject("UserB error") // 失败情况
            resolve("UserB")
        }, 1000);
    })
}


function* getUser() {
    let userA = yield getUserA();
    let userB = yield getUserB(userA);

    console.log("res", userA + userB);
    return userA + userB
}

let it = getUser();
// 第一次要执行然后等待下一个next传参返回给第一个yield
let {value, done} = it.next();
value.then(res => {
    // 把第一个值传入进去
    const { value } = it.next(res);
    value.then(res2 => {
        // 传入第二个值
        it.next(res2);
    })
})


// co.then(res => {})

function co(it) {
    return new Promise((resolve, reject) => {
        function walk(data) {
            const {value, done} = it.next(data);
            if (!done) {
                Promise.resolve(value).then(res => {
                    walk(res);
                }, reject)
            } else {
                resolve(value);
            }
        }

        walk();
    })
}

co(getUser()).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})


// 异步中间件
function step1(next) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("get User Success");
            next();
        }, 500);
    })
}

function step2(next) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let num = Math.random();
            if (num < 0.5) {
                next()
            } else {
                console.log("提前结束");
            }
        }, 500);
    })
}

function step3(next, val) {
    console.log(val * 1000);
    return val * 1000;
}


// function* process() {
//     let fns = [step1, step2, step3];
//     let next = null;
//     for (let i = 0; i < fns.length; i++) {
//         next = yield fns[i](next);
//     }
//     console.log(next);
// }


function middle() {
    let fns = [step1, step2, step3];

    function* gen() {
        for (let i = 0; i < fns.length; i++) {
            yield fns[i];
        }
    }

    let it = gen();

    doNext(it.next());

    function doNext(n) {
        n.value(function () {
            let result = it.next();
            if (!result.done) {
                doNext(result);
            } else {
                return
            }
        })
    }
}

middle();




