import * as React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { View } from '../components/Themed';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatWindow } from '../components/app/Chat';
import { Header } from '../components/app/Header';
import { VideoPlayer } from '../components/app/VideoPlayer';
import { VideoPlaylist } from '../components/app/VideoPlaylist';
import { useState, useContext } from 'react';

import { SocketContext } from '../contexts/SocketContext';


export default function AppScreen(): JSX.Element {
  const [displayChat, setDisplayChat] = useState(true);
  const [currentVideoId, setCurrentVideoId] = useState<string>('W5QV32_zMfs');
  const [key, setKey] = useState<number | null>(null);
  const socket = useContext(SocketContext);
  

  const toggleChat = (): void => {
    setDisplayChat(!displayChat);
  };

  const sendVideoToScreen = (videoId): void => {
    setCurrentVideoId(videoId);
    setKey(Math.random());
  };

  return (
    // react-native-navigation already applied bottom padding by default
    // to avoid double padding, need to exclude bottom edge inset
    // refer to: https://github.com/th3rdwave/react-native-safe-area-context/issues/107
    <SafeAreaView 
      edges={['right', 'left', 'top']}
      style={styles.container}
    >
      <Header displayChat={displayChat} toggleChat={toggleChat} />
      <View style={styles.videoPlayerContainer}>
        <VideoPlayer key={key} videoId={currentVideoId} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatWindowContainer}
      >
        <View style={{ flex: 1, display: displayChat ? undefined : 'none'}}>
          <ChatWindow />
        </View>
        <View style={{flex: 1, display: displayChat ? 'none' : undefined}}>
          <VideoPlaylist sendVideoToScreen={sendVideoToScreen} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  videoPlayerContainer: {
    flexBasis: Dimensions.get('screen').width * 0.5625,
  },
  chatWindowContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
});
