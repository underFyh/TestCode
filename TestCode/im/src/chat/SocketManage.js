import MessageManage from "./MessageManage";
const messageManage = new MessageManage();

export default class SocketManage {
    constructor(options) {
        this.options = options;
    }

    // 链接事件
    connect() {
        return new Promise((resolve, reject) => {
            console.log("开始链接:" + this.options.wsUrl);
            setTimeout(() => {
                if (Math.random() < 0.3) {
                    resolve({status: 500, msg: "链接失败"})
                } else {
                    resolve({status: 200, msg: "链接成功"})
                }
            }, 2000);
        }).then(res => {
            if (res.status === 200) {
                this.listenEvent("msg", (msg) => {
                    console.log("收到消息：" + JSON.stringify(msg));
                    messageManage.accept(msg);
                })
                console.log("链接成功");
                return true;
            } else {
                console.log("链接失败");
                return false
            }
        })
    }

    // 监听事件
    listenEvent(topic, callback) {
        let id = 0;
        setInterval(() => {
            let msg = { id: id++, msgData: Math.random() }
            callback(msg);
        }, 3000)
    }
}
