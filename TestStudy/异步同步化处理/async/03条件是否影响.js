

function * gen() {
    let num =  Math.random();
    console.log(num);
    if (num > 0.5) {
        yield "大于"
    } else {
        yield "小于"
    }
}

let it = gen();

console.log(it.next());
console.log(it.next());