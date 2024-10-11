// 1.请求登录  2.获取token 3.判断 4.是否成功
function step1(userName, password, next) {
    return new Promise((resolve, reject) => {
        if (userName === "admin" && password === "123") {
            const data = {
                status: "success",
                code: 200
            }
            resolve(data);
            next(data);
        } else {
            const data = {
                status: "fail",
                code: 500
            }
            reject(data);
            next(data);
        }
    })
}
function step2(data, next) {
    console.log(data);
    if (data.code === 200) {
        console.log("登录成功");
        next();
    } else {
        console.log("账号或密码错误");
    }
}






function middle() {
    let fns = [step1, step2];
    function* gen() {
        for (let i = 0; i < fns.length; i++) {
            yield fns[i];
        }
    }
    let it = gen();

    function process(...args) {
        try {
            const { value: fn, done } = it.next();
            // console.log(fn, done, args);
            if (!done) {
                fn(...args, (data) => {
                    try {
                        process(data);
                    } catch (e) {
                        console.log("inner err", e);
                    }
                })
            } else {
                console.log(fn, "res");
            }
        } catch (e) {
            console.log("err",e);
        }
    }


    process("admin", "123")

    // console.log(it.next());

}

middle();


