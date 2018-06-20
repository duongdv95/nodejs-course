var socket = io();

socket.on("connect", function () {
    console.log("Connected to server");

});

socket.on("disconnect", function () {
   console.log("Disconnected from server"); 
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
        from: "User",
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





