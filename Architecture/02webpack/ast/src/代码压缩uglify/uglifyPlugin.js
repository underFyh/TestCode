
module.exports = function (opt) {
    return {
        visitor: {
            // 捕获所有的作用域
            Scopable(path) {
               Object.entries(path.scope.bindings).forEach(([key, binding]) => {
                   // 生成新名字替换
                   const newVarName = path.scope.generateUid("_");
                   binding.path.scope.rename(key, newVarName);
               })
            }
        }
    }
}
