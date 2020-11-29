/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
} from 'react-native';
import io from 'socket.io-client';

const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState('');

  const END_POINT = 'http://192.168.0.126:3000';

  useEffect(() => {
    const skt = io(END_POINT);
    setSocket(skt);
    skt.on('Chat message', (msg) => {
      setMessages([...setMessages, msg]);
    });
  }, []);

  submitMessage = () => {
    socket.emit('Chat message', message);
    setMessage('');
  };

  const chatMsg = messages.map((msg) => {
    console.log(msg);
    return <Text key={msg}>{msg}</Text>;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.chatBody}>
        <Text> {chatMsg}</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="type message here..."
          underlineColorAndroid="transparent"
          onSubmitEditing={() => submitMessage()}
          onChangeText={(message) => setMessage({message})}
          blurOnSubmit={false}
          autoCorrect={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },

  chatBody: {
    flex: 1,
    alignItems: 'flex-start',
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    width: 360,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 20,
    borderRadius: 30,
    borderBottomWidth: 1,
  },

  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderBottomWidth: 1,
    width: 360,
    height: 45,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    flex: 1,
    fontFamily: 'arial',
    fontSize: 20,
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center',
  },

  buttonContainer: {
    position: 'absolute',
    paddingLeft: 290,
    paddingTop: 450,
  },
  submitButton: {
    backgroundColor: '#00b5ec',
    height: 10,
    width: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default App;
