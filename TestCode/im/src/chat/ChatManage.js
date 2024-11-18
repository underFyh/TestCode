const { SyncHook } = require("tapable");
import SocketManage from "./SocketManage";



export default class ChatManage {
    constructor(options) {
        this.options = options;
        this.hooks = {
            start: new SyncHook(),
            done: new SyncHook()
        }
        this.socketMange = new SocketManage(options);
    }

    init() {
        this.hooks.start.tap("start", () => {
            console.log("开始");
        })
        this.hooks.done.tap("done", () => {
            console.log("结束");
        })
        this.run();
    }

    async run() {
        this.hooks.start.call()
        const res = await this.socketMange.connect();
        this.hooks.done.call()
    }

}
