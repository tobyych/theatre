import { createContext } from 'react';

import { RoomContextType } from '../types';

const RoomContext = createContext<RoomContextType>({ roomToken: undefined, setRoomToken: undefined });

export { RoomContext };