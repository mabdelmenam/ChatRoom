function drop_session() {
    var xhttp = new XMLHttpRequest();

    route = "/drop_session";

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            console.log("session dropped");
        }
    };
    xhttp.open('POST', route, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.withCredentials = true;
    xhttp.send(null);

}