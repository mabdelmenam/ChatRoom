document.addEventListener('DOMContentLoaded', () => {
    var socket = io();

    socket.on('message', data => {
        const user_chat = document.createElement('h5');
        user_chat.id = "user_chat";
        user_chat.className = "username";
        //Bold Username at the beginning
        const username_Display = document.createElement('b');
        username_Display.innerHTML = username;
        username_Display.style.color = "#1b00ff";
        user_chat.appendChild(username_Display);
        //Message sent by User
        user_chat.appendChild(document.createTextNode(`:\xa0${data.msg}`))
        document.getElementsByClassName("chat-log")[0].appendChild(user_chat);
    });

    var sendButton = document.getElementById("send-btn");
    sendButton.onclick = function(){
        socket.send({'msg': document.getElementById('message-text').value, 
        'username': username});
    }
})

function drop_session() {
    var xhttp = new XMLHttpRequest();

    route = "/drop_session";

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            window.location = "/"
            console.log("session dropped");
        }
    };
    xhttp.open('POST', route, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(null);

}