const template = require("@babel/template");

module.exports = function () {
    return {
        visitor: {
            ImportDeclaration(path, state) {
                // { libraryName: "lodash", libraryDirectory: "" }
                const { libraryName, libraryDirectory } = state.opts;
                const node = path.node;
                let libName = node.source.value;
                if (libName === libraryName) {
                    let importSpecifier = node.specifiers.filter(i => i.type === "ImportSpecifier");
                    // [min, add]
                    let importsNames = importSpecifier.map(i => i.local.name);

                    // 根据名称创建默认导入
                    // import min from 'lodash/min';
                    // import add from 'lodash/add';
                    let newImports = importsNames.map(name => {
                        return template.statement(` import ${name} from '${libraryName}${libraryDirectory}/${name}'; `)()
                    })

                    // 删除 import {add, min} from "lodash";
                    path.replaceWithMultiple(newImports);
                }
            }
        }
    }
}
