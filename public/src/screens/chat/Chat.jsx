import React, { useState } from 'react';
import { Platform, StyleSheet, SafeAreaView, ScrollView, Keyboard, View } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

const data = [
  { type: 'agent', name: 'agent', message: 'begin' },
  { type: 'customer', name: 'rcpt', message: 'yes you can yes you can yes you can yes you can yes you can yes you can yes you can' },
  { type: 'agent', name:'agent', message: 'can i help you can i help you can i help you can i help you can i help you can i help you can i help you' },
  { type: 'customer', name: 'rcpt', message: 'yes you can' },
  { type: 'agent', name:'agent', message: 'can i help you' },
  { type: 'customer', name: 'rcpt', message: 'yes you can' },
  { type: 'agent', name: 'agent', message: 'can i help you' },
  { type: 'customer', name: 'rcpt', message: 'yes you can' },
  { type: 'agent', name:'agent', message: 'can i help you' },
  { type: 'customer', name: 'rcpt', message: 'yes you can' },
  { type: 'agent', name:'agent', message: 'can i help you' },
  { type: 'customer', name: 'rcpt', message: 'yes you can' },
  { type: 'agent', name: 'agent', message: 'can i help you' },
  { type: 'customer', name: 'rcpt', message: 'yes you can' },
  { type: 'agent', name:'agent', message: 'can i help you' },
  { type: 'customer', name: 'rcpt', message: 'yes you can' },
  { type: 'agent', name:'agent', message: 'can i help you' },
  { type: 'customer', name: 'rcpt', message: 'yes you can' },
  { type: 'agent', name: 'agent', message: 'can i help you' },
  { type: 'customer', name: 'rcpt', message: 'yes you can' },
  { type: 'agent', name:'agent', message: 'can i help you' },
  { type: 'customer', name: 'rcpt', message: 'yes you can' },
  { type: 'agent', name:'agent', message: 'can i help you' },
  { type: 'customer', name: 'rcpt', message: 'end' },
];

const styles = StyleSheet.create({
  wrapper: { flex: 1, paddingLeft: 20, paddingRight: 20, paddingTop: 10 },
  feedBox: { flex: 1, padding: 10, borderWidth: 1, marginBottom: 20 },
  rcptBox: { width: '100%', marginBottom: 20, },
  innerRcptBox: { maxWidth: '75%', borderWidth: 1, padding: 5 },
  senderBox: { width: '100%', alignItems: 'flex-end', marginBottom: 20 },
  innerSenderBox: { maxWidth: '75%', borderWidth: 1, alignItems: 'flex-end', padding: 5 },
  messageBox: { width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20},
  txtInput: { flex: 1 },
});

function Chat() {
  const [text, setText] = useState('');
  const [iosViewHeight, setIosViewHeight] = useState(0);
  Keyboard.addListener('keyboardDidShow', (event) => setIosViewHeight(event.endCoordinates.height));
  Keyboard.addListener('keyboardDidHide', () => setIosViewHeight(0));

  const feed = data.map((item, index) => {
    const { type, name, message } = item;
    if (type === 'agent') {
      return (
        <View key={index} style={styles.rcptBox}>
          <View style={styles.innerRcptBox}>
            <Text>{message}</Text>
            <Text>{name}</Text>
          </View>
        </View>
      );
    }

    return (
      <View key={index} style={styles.senderBox}>
        <View style={styles.innerSenderBox}>
          <Text>{message}</Text>
          <Text>{name}</Text>
        </View>
      </View>
    );
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.wrapper}>
        <ScrollView style={styles.feedBox}>
          {feed}
        </ScrollView>

        <View style={styles.messageBox}>
          <TextInput
            style={styles.txtInput}
            mode="outlined"
            multiline={true}
            placeholder="Add message"
            value={text}
            onChangeText={(value) => setText(value)}
          />
          <Button>Send</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Chat;
