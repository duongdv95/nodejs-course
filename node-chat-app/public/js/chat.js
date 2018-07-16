var socket = io();

function scrollToBottom () {
    // Selectors
    var messages = document.getElementById("messages");
    var newMessage = messages.querySelector("li:last-child");
    // Heights
    var clientHeight = messages.clientHeight;
    var scrollTop = messages.scrollTop;
    var scrollHeight = messages.scrollHeight;
    var newMessageHeight = newMessage.offsetHeight;

    if(messages.querySelector("li:nth-last-child(2)")){
        var lastMessageHeight = messages.querySelector("li:nth-last-child(2)").offsetHeight;
    } else {
        var lastMessageHeight = 0
    }
    
    // console.log(`clientHeight: ${clientHeight} scrollTop: ${scrollTop} newMessageHeight: ${newMessageHeight} lastMessageHeight: ${lastMessageHeight} scrollHeight: ${scrollHeight}`)
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight) {
        messages.scrollTop = scrollHeight;
    }
}

socket.on("connect", function () {
    var params = deparam(window.location.search);
    
    socket.emit("join", params, function (err) {
        if (err) {
            alert("err");
            window.location.href = "/"
        } else {
            console.log("No error");
        }
    });
});

socket.on("disconnect", function () {
   console.log("Disconnected from server"); 
});

socket.on("updateUserList", function (users) {
    var myNode = document.getElementById("users");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    var ol = document.createElement("ol");
    users.forEach(function (user) {
       var li = document.createElement("li");
       li.innerHTML = user;
       ol.appendChild(li);
    });
    document.getElementById("users").appendChild(ol);
});

socket.on("newMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = document.getElementById("message-template").innerHTML;
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    document.getElementById("messages").insertAdjacentHTML("beforeend", html);
    
    scrollToBottom();
    
    // OLD WAY
    // document.getElementById("messages").appendChild(html);
    // var formattedTime = moment(message.createdAt).format("h:mm a");
    // var li = document.createElement("li");
    // li.innerHTML = `${message.from} ${formattedTime}: ${message.text}`
    // document.getElementById("messages").appendChild(li);
});

socket.on("newLocationMessage", function (message) {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = document.getElementById("location-message-template").innerHTML;
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    document.getElementById("messages").insertAdjacentHTML("beforeend", html);
    scrollToBottom();
    
    // OLD WAY
    // var a = document.createElement("a");
    // var li = document.createElement("li");    
    
    // a.setAttribute("target", "_blank");
    // a.setAttribute("href", message.url);
    
    // a.innerHTML = "My current location";
    // li.innerHTML = `${message.from} ${formattedTime}: `;
    
    // li.appendChild(a)
    // document.getElementById("messages").appendChild(li);
});

document.getElementById("message-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    var messageTextbox = document.getElementsByName("message")[0];
    
    socket.emit("createMessage", {
        text: messageTextbox.value
    }, function () {
        messageTextbox.value = "";
    });
});

var locationButton = document.getElementById("send-location")
locationButton.addEventListener("click", function () {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser.");
    }
    
    locationButton.setAttribute("disabled","disabled");
    locationButton.innerHTML = "Sending location..."
    
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttribute("disabled");
        locationButton.innerHTML = "Send location";
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        
    }, function () {
        locationButton.removeAttribute("disabled");
        locationButton.innerHTML = "Send location";
        alert("Unable to fetch location.");
    });
});





