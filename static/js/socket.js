document.addEventListener('DOMContentLoaded', () => {
    var socket = io();

    var room = "Room1";
    joinRoom("Room1");

    socket.on('message', data => {
        const user_chat = document.createElement('h5');
        user_chat.style.textAlign = "left";
        user_chat.style.marginBottom = "1%";

        if(data.system == 1){
            user_chat.id = "admin_chat";
            user_chat.className = "admin";
            msg = `**${data.msg}**`
            printSysMsg(msg);
        }
        else{
            user_chat.id = "user_chat";
            user_chat.className = "username";

            //Bold Username at the beginning
            const username_Display = document.createElement('b');
            username_Display.innerHTML = data.username;
            username_Display.style.color = "#1b00ff";
            user_chat.appendChild(username_Display);

            //Message sent by User
            user_chat.appendChild(document.createTextNode(`:\xa0${data.msg}`))
        }
        document.getElementsByClassName("chat-log")[0].appendChild(user_chat);
    });

    var sendButton = document.getElementById("send-btn");
    sendButton.onclick = function(){
        socket.send({'msg': document.getElementById('message-text').value, 
        'username': username, 'room': room});

        document.getElementById('message-text').value = '';
    }
    //Adding an eventlistener ' Enter '
    var input = document.getElementById("message-text");
    input.addEventListener("keyup", function(event) {
        event.preventDefault();
    if (event.keyCode === 13) {
        sendButton.click();
        }
    });

    document.querySelectorAll('.select-room').forEach(h5 => {
        h5.onclick = () => {
            console.log('in room')
            var newRoom = h5.innerHTML;
            if(newRoom == room){
                msg = `You are already in ${room}.`;
                printSysMsg(msg);
            } else{
                leaveRoom(room);
                joinRoom(newRoom);
                room = newRoom;
            }
        }
    });

    //Leave room
    function leaveRoom(room){
        socket.emit('leave', {'username': username, 'room': room});
    }
    //Join Room
    function joinRoom(room){
        socket.emit('join', {'username': username, 'room': room});
        //Clear message area
        document.getElementsByClassName('chat-log')[0].innerHTML = '';
        //Focus on message box when joining room
        document.getElementById('message-text').focus();
    }
    //Print system message
    function printSysMsg(msg){
        const sysMsg = document.createElement('h5');
        sysMsg.innerHTML = msg;
        sysMsg.style.fontWeight = "700";
        document.getElementsByClassName('chat-log')[0].append(sysMsg);
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