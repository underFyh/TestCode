module.exports = function (option) {
    // { libraryName: "lodash", libraryDirectory: "" }
    return {
        visitor: {
            ImportDeclaration(path) {
                console.log(path.node);
            }
        }
    }
}
