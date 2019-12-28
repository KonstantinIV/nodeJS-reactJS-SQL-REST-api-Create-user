var button = document.getElementById("usernameButton");
button.onclick = function (){
    var username = document.getElementById("username").value;

    var request = new XMLHttpRequest();
    request.open('POST', '/user', true);
    request.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');
    request.send(username);


    console.log(username);
}


console.log("hello world");