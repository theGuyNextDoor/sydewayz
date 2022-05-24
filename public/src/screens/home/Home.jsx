import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Title } from 'react-native-paper';

const styles = StyleSheet.create({
  wrapper: { flex: 1, alignItems: 'center', justifyContent: 'space-around' },
  pressable: { height: '20%', width: '80%', backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' },
});

function Home() {
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.pressable}>
        <Title>Schedule An Appointment</Title>
      </Pressable>
      <Pressable style={styles.pressable}>
        <Title>Schedule A Call</Title>
      </Pressable>
    </View>
  );
}

export default Home;
