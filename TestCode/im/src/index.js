import ChatManage from "./chat/ChatManage";


const options = {
    wsUrl: "http://localhost:8080"
}

new ChatManage(options).init();
