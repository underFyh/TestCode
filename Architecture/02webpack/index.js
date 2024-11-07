const fs = require('fs');
const path = require('path');

// 替换文件内容的函数
function replaceInFile(filePath, searchStr, replaceStr) {
    try {
        // 读取文件内容
        const content = fs.readFileSync(filePath, 'utf8');

        // 执行替换
        const newContent = content.replace(new RegExp(searchStr, 'g'), replaceStr);

        // 写入新内容
        fs.writeFileSync(filePath, newContent, 'utf8');

        console.log(`成功处理文件: ${filePath}`);
    } catch (err) {
        console.error(`处理文件 ${filePath} 时出错:`, err);
    }
}

// 处理文件夹中的所有HTML文件
function processDirectory(dirPath, searchStr, replaceStr) {
    try {
        // 读取目录中的所有文件
        const files = fs.readdirSync(dirPath);

        // 遍历所有文件
        files.forEach(file => {
            const filePath = path.join(dirPath, file);

            // 获取文件状态
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                // 如果是文件夹，递归处理
                processDirectory(filePath, searchStr, replaceStr);
            } else if (path.extname(file).toLowerCase() === '.html') {
                // 如果是HTML文件，执行替换
                replaceInFile(filePath, searchStr, replaceStr);
            }
        });

        console.log(`完成目录 ${dirPath} 的处理`);
    } catch (err) {
        console.error(`处理目录 ${dirPath} 时出错:`, err);
    }
}

// 使用示例
const targetDir = './'; // 替换为你的目标文件夹路径
const searchString = '<script src="https://static.zhufengpeixun.com/jquerymin_1725155032601.js"></script>';
const replaceString = '<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>';

processDirectory(targetDir, searchString, replaceString);
