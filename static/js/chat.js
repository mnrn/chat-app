$(function(){
    let socket   = null;
    let msgbox   = $("#chatbox textarea");
    let messages = $("#messages");
    $("#chatbox").submit(function() {
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
    if (!window["WebSocket"]) {
        alert("エラー: WebSocketに対応していないブラウザです。" );
    }
    else {
        socket = new WebSocket("ws://" + location.host + "/room");  // WebSocket接続を開始する。
        // WebSocketがメッセージを受信するとjQueryを使って箇条書きの要素にメッセージが追加され、ブラウザ上表示されます。
        socket.onclose = function() {
            alert("接続が終了しました。");
        }
        socket.onmessage = function(e) {
            const msg = JSON.parse(e.data);
            messages.append(
                $("<li>").append(
                    $("<img>").attr("title", msg.Name).css({
                        width: 50,
                        verticalAlign: "middile"
                    }).attr("src", msg.AvatarURL),
                    $("<span>").text(msg.Message)
                )
            );
        }
    }
});