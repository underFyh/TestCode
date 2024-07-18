let obj = {a: 1, b: {c: 1}, c: [1, {a: 1}, {a: 2}]}

// 递归形式 - 简单测试
function deepClone(obj) {
    if (typeof obj !== "object") return obj;
    let type = {}.toString.call(obj);
    if (type === "[object Object]") {
        let newObj = {}
        let keys = Object.keys(obj);
        keys.forEach((key) => {
            newObj[key] = deepClone(obj[key])
        })
        return newObj;
    }
    if (type === "[object Array]") {
        let newArray = [];
        obj.forEach(i => {
            newArray.push(deepClone(i));
        })
        return newArray;
    }

}
let obj2 = deepClone(obj);
obj.c[1].a = 2;
console.log(obj2);
console.log(obj);


// 非递归形式
function deepClone2(obj) {
    // 1. 初始化栈状态
    let stack = [ {source: obj, target: Array.isArray(obj) ? [] : {}} ];
    let result = stack[0].target;

    while (stack.length > 0) {
        let {source, target} = stack.pop();

        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                let value = source[key];

                if (typeof value === "object" && value !== null) {
                    let newTarget = Array.isArray(value) ? [] : {};
                    console.log(key);
                    target[key] = newTarget;
                    stack.push({source: value, target: newTarget});
                } else {
                    target[key] = value;
                }
            }
        }
    }

    return result;
}

console.log(deepClone2(obj));