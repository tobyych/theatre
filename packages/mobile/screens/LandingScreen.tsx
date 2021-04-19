import * as React from 'react';
import { useContext } from 'react';
import { Button, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Text, View } from '../components/Themed';

import { RoomContext } from '../contexts/RoomContext';
import { useLinkTo } from '@react-navigation/native';

export default function LandingScreen(): JSX.Element {
  const colorScheme = useColorScheme();
  const [roomTokenInput, setRoomTokenInput] = React.useState('');
  const { setRoomToken } = useContext(RoomContext);
  const linkTo = useLinkTo();

  const handleSubmit = (textInput: string) => {
    if (setRoomToken) {
      setRoomToken(textInput);
    }
    linkTo('/video');
    setRoomTokenInput('');
  };

  const fillRandomToken = () => {
    const randomToken = Math.random().toString(16).substr(2, 5);
    setRoomTokenInput(randomToken);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{height: '30%', justifyContent: 'center'}}>
        <Text style={styles.title}>Theatre</Text>
      </View>
      <View style={[styles.createRoomBtn, {backgroundColor: Colors[colorScheme].tint}]}>
        <Button onPress={fillRandomToken} title="Create Room" color="#fff"></Button>
      </View>
      <View style={styles.roomInput}>
        <TextInput
          style={styles.roomInputText}
          value={roomTokenInput}
          onChangeText={setRoomTokenInput}
          placeholder='Enter a room token…'
          onSubmitEditing={() => handleSubmit(roomTokenInput)}
        />
        <View style={[styles.gotoRoomBtn, {backgroundColor: Colors[colorScheme].tint}]}>
          <Button onPress={() => handleSubmit(roomTokenInput)} title="Go" color="#fff"></Button>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2
  },
  title: {
    fontSize: 60,
  },
  roomInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    width: '60%',
    margin: '2%'
  },
  createRoomBtn: {
    borderWidth: 1,
    borderColor: 'grey',
    width: '60%',
    margin: '2%',
  },
  roomInputText: {flex: 5, marginLeft: '5%'},
  gotoRoomBtn: {flex: 1, flexBasis: '10%'} 
});
