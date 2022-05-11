import { io, Socket } from 'socket.io-client';

export const createSocket = (): Socket => {
  // defaults to window.location
  console.log(window.location);
  return io();
};

export const sendMessage = (socket: Socket, roomToken: string | undefined, message: string): void => {
  socket.emit('roomChat', roomToken, message);
};

export const sendPlayVideoSignal = (socket: Socket, roomToken: string): void => {
  socket.emit('videoControlRequest', roomToken, 1);
};

export const sendPauseVideoSignal = (socket: Socket, roomToken: string): void => {
  socket.emit('videoControlRequest', roomToken, 0);
};

export const sendVideoToScreenSignal = (socket: Socket, roomToken: string, videoId: string): void => {
  socket.emit('sendVideoToScreen', roomToken, videoId);
};

export const addToPlaylist = (socket: Socket, roomToken: string, videoId: string): void => {
  socket.emit('addToPlaylist', roomToken, videoId);
};
