module.exports = function (opt) {
    return {
        // 在处理访问器前执行创建接受错误的容器
        pre(file) {
            // 命名空间
            file.set("catchErrors", []);
        },
        visitor: {
            CallExpression(path, state) {
                const node = path.node;
                const catchErrors = state.file.get("catchErrors");
                if (node.callee && node.callee.object && node.callee.object.name === "console") {
                    // 设置错误打印的最大层级为1
                    const rawStackTraceLimit = Error.stackTraceLimit;
                    Error.stackTraceLimit = 1;
                    catchErrors.push(path.buildCodeFrameError("代码中不能出现console", Error));
                    // 恢复
                    Error.stackTraceLimit = rawStackTraceLimit;

                    // 自动删除
                    if (opt.isAutoFix) {
                        path.parentPath.remove();
                    }
                }
            }
        },
        // 处理完后把收集的错误进行打印
        post(file) {
            const errors = file.get("catchErrors");
            console.error(...errors);
        }
    }
}
