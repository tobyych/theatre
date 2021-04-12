import { Socket } from 'socket.io-client';
export declare const createSocket: () => Socket;
export declare const sendMessage: (message: string, socket: Socket) => void;
export declare const sendPlayVideoSignal: (socket: Socket, roomToken: string) => void;
export declare const sendPauseVideoSignal: (socket: Socket, roomToken: string) => void;
export declare const sendVideoToScreenSignal: (socket: Socket, roomToken: string, videoId: string) => void;
export declare const addToPlaylist: (socket: Socket, roomToken: string, videoId: string) => void;
