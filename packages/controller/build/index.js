import { io } from 'socket.io-client';
export var createSocket = function () {
    // defaults to window.location
    console.log(window.location);
    return io();
};
export var sendMessage = function (message, socket) {
    socket.emit('chatMessage', message);
};
export var sendPlayVideoSignal = function (socket, roomToken) {
    socket.emit('videoControlRequest', roomToken, 1);
};
export var sendPauseVideoSignal = function (socket, roomToken) {
    socket.emit('videoControlRequest', roomToken, 0);
};
export var sendVideoToScreenSignal = function (socket, roomToken, videoId) {
    socket.emit('sendVideoToScreen', roomToken, videoId);
};
export var addToPlaylist = function (socket, roomToken, videoId) {
    socket.emit('addToPlaylist', roomToken, videoId);
};
//# sourceMappingURL=index.js.map