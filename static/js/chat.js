window.onload = function(){
    let socket   = null;
    if (!window["WebSocket"]) {
        alert("エラー: WebSocketに対応していないブラウザです。" );
    }
    else {
        socket = new WebSocket("ws://" + location.host + "/room");  // WebSocket接続を開始する。
        socket.onclose = function() {
            alert("接続が終了しました。");
        }
        socket.onmessage = function(e) {
            const msg = JSON.parse(e.data);
            makeChatDOM(msg);
        }
    }
    submit(socket);
}

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
    messages.appendChild(chatMsg);
}

function submit(socket) {
    $("#chatbox").submit(function() {
        let msgbox  = $("#chatbox textarea");
        if (!msgbox.val()) {
            alert("メッセージを入力してください。");
            return false;
        }
        if (!socket) {
            alert("エラー: WebSocket接続が行われていません。");
            return false;
        }
        socket.send(JSON.stringify({"Message": msgbox.val()}));
        msgbox.val("");
        return false;
    });
}