import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Keyboard, StyleSheet, Image, Dimensions } from 'react-native';
import { PlaylistItem } from '../../types';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Ionicons } from '@expo/vector-icons';

import {getYoutubeMeta} from 'react-native-youtube-iframe';

export const VideoPlaylist = (
  { sendVideoToScreen }: { sendVideoToScreen: React.Dispatch<React.SetStateAction<string>> }
): JSX.Element => {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [inputItem, setInputItem] = useState<string>('');
  const [playlistHasChanged, forcePlaylistToChange] = useState<boolean>(false);

  const addItem = async (videoId: string) => {
    const metadata = await getYoutubeMeta(videoId);
    const { title, author_name, thumbnail_url, thumbnail_height, thumbnail_width } = metadata;

    setPlaylist([...playlist, {
      videoId,
      title,
      channelTitle: author_name,
      thumbnail: {
        url: thumbnail_url,
        height: thumbnail_height,
        width: thumbnail_width
      }
    }]);
  };

  const deleteItem = (index: number): void => {
    playlist.splice(index, 1);
    setPlaylist(playlist);
    forcePlaylistToChange(!playlistHasChanged);
  };

  const onSwipeLeft = (item, index) => {
    return (
      <View style={{justifyContent: 'flex-end'}}>
        <TouchableOpacity onPress={() => {
          sendVideoToScreen(item.videoId);
        }}>
          <Ionicons size={24} name='arrow-up' color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(index)}>
          <Ionicons size={24} name='close' color='black' />
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item, index}): JSX.Element => {
    return (
      <Swipeable renderRightActions={() => onSwipeLeft(item, index)}>
        <Text style={{ flexShrink: 1, fontSize: 14 }}>{item.title}</Text>
        <Image 
          source={{
            uri: item.thumbnail.url,
            width: Dimensions.get('screen').width,
            height:Dimensions.get('screen').width * 0.5625
          }}
        />
      </Swipeable>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.playlistItemContainer}>
        <View style={styles.playlistItemInput}>
          <TextInput 
            value={inputItem}
            onChangeText={setInputItem}
            placeholder='Input a YouTube video ID…'
            onSubmitEditing={() => {
              addItem(inputItem);
              Keyboard.dismiss();
              setInputItem('');
            }}
            style={{ marginLeft: '5%' }}
          />
        </View>
        <View style={styles.playlistItemAddButton}>
          <TouchableOpacity onPress={() => {
            addItem(inputItem);
            Keyboard.dismiss();
            setInputItem('');
          }}>
            <Ionicons size={24} name='add' color='black' />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList 
        data={playlist}
        renderItem={renderItem}
        keyExtractor={() => uuid()}
        extraData={playlistHasChanged}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playlistItemContainer: {
    flexDirection: 'row',
    minHeight: 40,
  },
  playlistItemInput: {
    flex: 8,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  playlistItemAddButton: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});