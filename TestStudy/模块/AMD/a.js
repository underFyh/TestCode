let modules = {};
function define(modName, depends, cb) {
    cb.depends = depends;
    modules[modName] = cb;
}
function require(modNames, cb) {
    let loadModNames = modNames.map(function (modName) {
        let fn = modules[modName];
        let depends = fn.depends;
        let exports;
        require(depends, function (...dependsFn) {
            console.log(dependsFn, "d");
            exports = fn.apply(null, dependsFn);
        })
        return exports
    });
    // console.log(loadModNames);
    cb.apply(null, loadModNames);
}




define("a", [], function () {
    return "a";
})

define("b", ["a"], function (a) {
    return a + "b";
})

require(["b"], function (bValue) {
    console.log(bValue);
})



