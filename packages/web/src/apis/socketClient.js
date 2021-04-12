import io from "socket.io-client";

const socket = io();

socket.connect();

if (sessionStorage.getItem("roomToken")) {
    console.log(window.location)
    console.log(`joining room ${sessionStorage.getItem("roomToken")}`)
    socket.emit('joinRoom', sessionStorage.getItem("roomToken"))
}

export default socket;
