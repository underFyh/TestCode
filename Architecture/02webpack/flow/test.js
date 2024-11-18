// let set = new Set();
//
// set.add(1);
// set.add(2);
// set.add(3);
// set.add(4);
// set.add(5);
//
// let addNum = 6;
// [...set].forEach((n) => {
//     console.log(n);
//     if (Math.random() > 0.5) {
//         set.add(addNum);
//         addNum++;
//     }
// })
//
// console.log(set);


let arr = [1,2,3,4,5];

let addNum = 6;
// arr.forEach((n) => {
//     console.log(n);
//     if (Math.random() > 0.5) {
//         arr.push(addNum);
//         addNum++;
//     }
// })

// console.log(set);


for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    if (Math.random() > 0.5) {
        arr.push(addNum);
        addNum++;
    }
}
