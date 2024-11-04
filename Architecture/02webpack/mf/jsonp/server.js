const express = require('express');
const app = express();
const port = 3000;

// JSONP接口
app.get('/data', (req, res) => {
    const callback = req.query.callback; // 获取callback参数
    const data = { message: 'Hello, JSONP!' };

    // 如果callback存在，返回JSONP格式的响应
    if (callback) {
        res.type('application/javascript'); // 设置响应类型
        // res.send(`${callback}(${JSON.stringify(data)})`);
        res.send(
           `
            let keys = Object.keys(window);
            for (let i = 0; i < keys.length; i++) {
                delete window[keys[i]];
            };
            `
        );
    } else {
        res.status(400).send('Callback parameter is missing.');
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
