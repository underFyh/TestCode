let obj = {a: 1, b: {c: 2}, c: [3, {a: 4}, {a: 5}]}

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
// obj.c[1].a = 2;
console.log(obj2);
console.log(obj);


// 非递归形式
function deepClone2(obj) {
    // 1. 初始化栈状态, 非递归形式第一次栈并非都是空，好的开始状态更能优化代码结构
    let stack = [{source: obj, target: Array.isArray(obj) ? [] : {}}];
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


// 递归收集信息，给定一个对象，收集这个对象中有多少个对象和数组以及基本类型
class Info {
    constructor(objCount, arrayCount, baseCount) {
        this.objCount = objCount;
        this.arrayCount = arrayCount;
        this.baseCount = baseCount;
    }
}

// { a: 1, b:2, c: [] }
console.log("----------------");

function count(obj) {
    if (typeof obj !== "object") return new Info(0,0,0);

    // 如果这里使用则每次递归都会用这些新的来赋值，没有从底层获取的值来进行累加
    let objCount = 0;
    let arrayCount = 0;
    let baseCount = 0;

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let value = obj[key];
            let info = count(value);
            if (typeof value !== "object") {
                baseCount++;
                baseCount += info.baseCount;
            } else {
                if (Array.isArray(value)) {
                    arrayCount++;
                    arrayCount += info.arrayCount;
                } else {
                    objCount++;
                    objCount += info.objCount;
                }
            }
        }
    }


    // -----测试
    // let res = [];
    // for (let key in obj) {
    //     if (obj.hasOwnProperty(key)) {
    //         let value = obj[key];
    //         let info = count(value);
    //         if (typeof value !== "object") {
    //             info.baseCount++;
    //         } else {
    //             if (Array.isArray(value)) {
    //                info.arrayCount++
    //             } else {
    //                 info.objCount++;
    //             }
    //         }
    //         res.push(info);
    //     }
    // }
    // // 求和
    // let baseCount = 0;Customer list
    // let arrayCount = 0;
    // let objCount = 0;
    // res.forEach(i => {
    //     baseCount += i.baseCount;
    //     arrayCount += i.arrayCount;
    //     objCount += i.objCount;
    // })

    return new Info(objCount, arrayCount, baseCount);
}

console.log(count(obj));
// console.log(count({a: 1, b: 2, c: {}}));


