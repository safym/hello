var socket = io();

var onlineUsers = document.getElementById("connection");

var loginWrapper = document.getElementById("loginWrapper");
var formLogin = document.getElementById("formLogin");
var inputLogin = document.getElementById("inputLogin");


var messages = document.getElementById("messages");
var formMessage = document.getElementById("formMessage");
var input = document.getElementById("inputMessage");

var userName;

formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    if (inputLogin.value) {
        userName = inputLogin.value;
        socket.emit("login", { userName: userName });
        loginWrapper.style.display = "none";
    }
});

formMessage.addEventListener("submit", function (e) {
    e.preventDefault();
    if (userName && input.value) {
        var textMessage = input.value;
        socket.emit("chat message", { userName, textMessage });
        input.value = "";
    }
});

socket.on("chat message", (dataMessage) => {
    var messageElement = document.createElement("li");
    var userNameElement = document.createElement("p");
    var textMessageElement = document.createElement("p");

    messageElement.className = "itemMessage";
    userNameElement.className = "userNameMessage";
    textMessageElement.className = "textMessage";

    userNameElement.textContent = dataMessage.userName;
    textMessageElement.textContent = dataMessage.textMessage;

    messageElement.appendChild(userNameElement);
    messageElement.appendChild(textMessageElement);

    messages.appendChild(messageElement);

    window.scrollTo(0, document.body.scrollHeight);
});

socket.on("user connected", function (data) {
    while (onlineUsers.firstChild) {
        onlineUsers.removeChild(onlineUsers.firstChild);
    }

    for (key in data) {
        var dataUserName = data[key];

        var user = document.createElement("li");
        var iconUser = document.createElement("p");
        var labelUser = document.createElement("p");

        user.className = "itemUser";
        iconUser.className = "iconUser";
        labelUser.className = "labelUser";

        iconUser.textContent = dataUserName[0].toUpperCase();
        labelUser.textContent = dataUserName;

        user.appendChild(iconUser);
        user.appendChild(labelUser);

        onlineUsers.appendChild(user);

        window.scrollTo(0, document.body.scrollHeight);
    }
});

socket.on("disconnectUser", function () {
    alert("user disconnectes");
});