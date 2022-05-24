import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Pressable } from 'react-native';
import { useTheme, Avatar, Text, Button } from 'react-native-paper';

const styles = StyleSheet.create({
  wrapper: { height: '80%', justifyContent: 'space-between', paddingLeft: '10%', paddingRight: '10%' },
  profileBox: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, paddingBottom: '10%' },
  profileInfo: { flexDirection: 'row', alignItems: 'center' },
  nameBox: { alignItems: 'center' },
});

function HeaderModal({ navigate, logout }) {
  const fullName = 'Your Name';

  return (
    <View style={styles.wrapper}>
      <View style={styles.profileBox}>
        <View style={styles.nameBox}>
          <Text> Hello, {fullName}</Text>
        </View>
      </View>

      {/* <Pressable><Text>Profile</Text></Pressable> */}
      <Pressable onPress={() => navigate('Home')}><Text>Home</Text></Pressable>
      <Pressable onPress={() => navigate('Chat')}><Text>Chat</Text></Pressable>
      {/* <Pressable><Text>Settings</Text></Pressable> */}
      {/* <Pressable><Text>Help</Text></Pressable> */}
      {/* <Pressable><Text>Rate Us</Text></Pressable> */}
      <Pressable onPress={logout}><Text>Log Out</Text></Pressable>
    </View>
  );
}

export default HeaderModal;
