export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Video: undefined;
};

export type HomeTabParamList = {
  LandingScreen: undefined;
};

export type AppTabParamList = {
  AppScreen: undefined;
};

export type Message = {
  message: string,
  received: boolean
};

export type ThumbnailRef = {
  height: number,
  width: number,
  url: string
}

export type PlaylistItem = {
  videoId: string,
  title: string | null | undefined,
  channelTitle: string | null | undefined,
  thumbnail: ThumbnailRef | null | undefined
}

export type RoomContextType = {
  roomToken: string | undefined,
  setRoomToken: React.Dispatch<React.SetStateAction<string | undefined>> | undefined
}