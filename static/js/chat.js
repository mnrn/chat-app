"use strict";
window.onload = function () {
    if (!window["WebSocket"]) {
        alert("エラー: WebSocketに対応していないブラウザです。");
    }
    else {
        let socket = new WebSocket("ws://" + location.host + "/room"); // WebSocket接続を開始する。
        socket.onclose = function () {
            console.log("接続が終了しました。");
        };
        socket.onmessage = function (event) {
            makeChatDOM(JSON.parse(event.data));
        };
        listenSubmit(socket);
    }
};
function makeChatDOM(msg) {
    let chatImg = document.createElement("img");
    chatImg.setAttribute("title", msg.Name);
    chatImg.style.width = "50px";
    chatImg.style.verticalAlign = "middle";
    chatImg.setAttribute("src", msg.AvatarURL);
    let spanMsg = document.createElement("span");
    spanMsg.textContent = msg.Message;
    let chatMsg = document.createElement("li");
    chatMsg.appendChild(chatImg);
    chatMsg.appendChild(spanMsg);
    let messages = document.getElementById("messages");
    if (messages != null) {
        messages.appendChild(chatMsg);
    }
    else {
        alert("id=messagesが見つかりませんでした。");
    }
}
function listenSubmit(socket) {
    let callback = function (event) {
        let msgbox = document.querySelector("#chatbox textarea");
        socket.send(JSON.stringify({ "Message": msgbox.value }));
        msgbox.value = "";
        event.preventDefault();
    };
    let chatbox = document.getElementById("chatbox");
    if (chatbox != null) {
        chatbox.addEventListener("submit", callback, false);
    }
    else {
        alert("id=chatboxが見つかりませんでした。");
    }
}
