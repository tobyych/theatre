import io, { Socket } from 'socket.io-client';
import * as React from 'react';

const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL);
export const SocketContext: React.Context<Socket> = React.createContext(socket);