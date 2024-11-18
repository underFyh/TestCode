export default class ViewManage {
    constructor(id) {
        this.dom = document.getElementById(id);
    }

    insert(msg) {
        console.log(msg);
        let li = `<li>${msg.msgData}</li>`
        this.dom.append(li);
    }

}
