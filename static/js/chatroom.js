//SECOND

//Create a function to check whether or not a username is inside of the database, this can be done in Python where I have straight access to SQL Database
//1. Send user typed in by the user to the backend (Flask)
//2. Check if the username is in use in the DB
    //2a. If the username is in use, send a message back to the client side showing the username is in use, displaying the message contents.
    //2b. If the username is not in use, send the ' OK ' to the client side, moving forward to the chatroom
var username = document.getElementById("userbox");
username.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("main-btn").click();
  }
});

function filter(){
    var file = "/profanity_filter";

    var obj = {
        user: username.value
    };

    var finalData = JSON.stringify(obj);

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //Checking profanity JSON sent back from profanity_filter
            var usernameClean = JSON.parse(this.responseText);

            if(usernameClean.profanity_check == 1){ //Profanity
                profanity_text = document.getElementById("profanity_found");
                profanity_text.innerHTML = "Username cannot be used.";
                
                setTimeout(function() {
                    profanity_text.innerHTML = "";
                }, 3500);
            }
            else{ //No Profanity
                window.location = "/chatroom"
                console.log("CLEAN");
            }
        }
    };

    xhttp.open("POST", file, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(finalData);
}