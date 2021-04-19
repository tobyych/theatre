import * as React from 'react';
import { useState, useContext } from 'react';
import { Dimensions, StyleSheet, View, FlatList, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import { Message } from '../../types';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

import { SocketContext } from '../../contexts/SocketContext';
import { sendMessage } from '../../controllers/SocketController';

const MESSAGE_BLOCK_WIDTH = Dimensions.get('window').width * 0.7;

export const ChatWindow = () : JSX.Element => { 
  const socket = useContext(SocketContext);

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedId] = useState(null);

  const getDynamicStyles = (message: Message, index: number) => {
    return {
      marginVertical: message.received ? 1.5 : 0,
      marginTop: messages[index - 1]?.received === message.received? 1.5 : 8,
      marginBottom: messages[index + 1]?.received === message.received? 1.5 : 8,
      alignSelf: message.received ? 'flex-start' : 'flex-end'
    } as const;
  };

  const addMessage = (message: string) => {
    sendMessage(message, socket);
    setMessages([...messages, 
      {
        message,
        received: false
      }
    ]);
  };

  const renderItem = ({ item, index }) => {
    const combinedStyle = StyleSheet.flatten([getDynamicStyles(item, index), styles.chatMessageBox]);
    return (
      <View style={combinedStyle}>
        <Text
          style={{color: '#fff', fontWeight: '500', textAlignVertical: 'center'}}
        >
          {item.message}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.chatWindow}>
      <FlatList
        inverted
        data={messages}
        renderItem={renderItem}
        keyExtractor={(index) => index.toString() + uuid()}
        extraData={selectedId}
      />
      <ChatInput addMessage={addMessage} />
    </View>
  );
};

const ChatInput = (
  {addMessage}:
  {addMessage: (string) => void}  
) : JSX.Element => {
  const [messageInput, setMessageInput] = useState<string>('');
  const colorScheme = useColorScheme();

  return (
    <View style={styles.chatInput}>
      <View style={styles.chatInputBox}>
        <TextInput 
          value={messageInput}
          onChangeText={setMessageInput}
          placeholder='Enter a message…'
          onSubmitEditing={() => {
            addMessage(messageInput);
            setMessageInput('');
            Keyboard.dismiss;
          }
          }
          style={{ marginLeft: '5%' }}
        />
      </View>
      <View style={styles.chatInputSendButton}>
        <TouchableOpacity onPress={() => {
          addMessage(messageInput);
          setMessageInput('');
        }
        }
        >
          <FontAwesome size={24} name='send' color={Colors[colorScheme].tint} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatWindow: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 10
  },
  chatMessageBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxWidth: MESSAGE_BLOCK_WIDTH,
    borderRadius: 20,
    backgroundColor: 'blue'
  },
  chatInput: {
    flexDirection: 'row',
    minHeight: 40
  },
  chatInputBox: {
    flex: 8,
    borderRadius: 20,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
  },
  chatInputSendButton: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
