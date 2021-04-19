import * as React from 'react';
import { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
import { RoomContext } from '../../contexts/RoomContext';

export const Header = ({ displayChat, toggleChat }: { displayChat: boolean, toggleChat: () => void }): JSX.Element => {
  const linkTo = useLinkTo();
  const { roomToken } = useContext(RoomContext);

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        onPress={() => linkTo('/home')}
        style={{flex: 1, alignItems: 'center'}}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={{flex: 8, textAlign: 'center'}}>Room: {roomToken}</Text>
      <TouchableOpacity 
        onPress={() => toggleChat()}
        style={{flex: 1, alignItems: 'center'}}
      >
        <MaterialIcons name={displayChat ? 'playlist-add' : 'chat'} size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: '6%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
});

