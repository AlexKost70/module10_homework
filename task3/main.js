const webSocket = new WebSocket("wss://echo-ws-service.herokuapp.com");
const input = document.querySelector("#msg-input");
const sendBtn = document.querySelector(".send-btn");
const geoBtn = document.querySelector(".geo-btn");
const chatMessages = document.querySelector(".chat-messages");

webSocket.onopen = function() {
    console.log("CONNECTED");
};

webSocket.onclose = function() {
    console.log("DISCONNECTED");
};

webSocket.onerror = function(evt) {
    console.log("Error", evt.data);
};

webSocket.onmessage = function(evt) {
    renderMessage(evt.data, false);
    chatMessages.scrollTo(0, chatMessages.scrollHeight);
}

const getLocation = new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve(position);
            });
        } else {
            reject("Error");
        }
    });

const sendLocation = () => {
    getLocation
        .then((result) => {  
        return result.coords;
        })
        .then((coords) => {
            let msg = `<a href="https://www.openstreetmap.org/#map=18/${coords.latitude}/${coords.longitude}" target="blank">Геолокация</a>`
            renderMessage(msg, true);
        })
        .catch((error) => {
            console.log("Error", error);
        });
}

const renderMessage = (msgText, isUser) => {
    let msg = document.createElement("div");
    msg.classList.add("msg")
    msg.innerHTML = msgText;
    isUser ? msg.classList.add("user-message") : msg.classList.add("server-message");
    chatMessages.appendChild(msg);
}

const sendMessage = () => {
    if (!/^\s*$/.test(input.value)) {
        renderMessage(input.value, true);
        webSocket.send(input.value);
    }
}

sendBtn.addEventListener("click", sendMessage);
geoBtn.addEventListener("click", sendLocation);

