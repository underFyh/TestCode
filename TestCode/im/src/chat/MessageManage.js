import ViewManage from "./ViewManage";

const viewManage = new ViewManage("app");

export default class MessageManage {
    constructor() {
        this.msgList = [];
    }

    // 接受消息
    accept(msg) {
        let formatMsg = this.format(msg);
        this.msgList.push(formatMsg);
        this.insert(formatMsg);
    }

    // 格式化消息
    format(msg) {
        return msg;
    }

    // 插入消息
    insert(msg) {
        viewManage.insert(msg);
    }

    // 排序消息
    sort(msg) { }
}
