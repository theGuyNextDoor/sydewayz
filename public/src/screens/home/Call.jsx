import axios from 'axios';
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Title, Text, Button, Card } from 'react-native-paper';

const styles = StyleSheet.create({
  wrapper: { flex: 1, paddingTop: '5%', paddingRight: '10%', paddingLeft: '10%' },
  btnBox: { marginBottom: 10, width: '100%', alignItems: 'flex-start' },
  scroll: { borderTopWidth: 1 },
  requestBox: { padding: 10, borderWidth: 1, marginBottom: 20 },
  title: { alignItems: 'center' },
  cancel: { alignItems: 'flex-end' },
});

const data = [
  // { startTime: 'some time', endTime: ' some time after' },
  // { startTime: 'some time', endTime: ' some time after' },
];

function Call() {
  let feed = [];

  if (data.length) {
    feed = data.map((item, index) => {
      const { startTime, endTime } = item;

      return (
        <View key={index} style={styles.requestBox}>
          <Title>{startTime}</Title>
          <Text>{endTime}</Text>
          <View style={styles.cancel}>
            <Text>Cancel</Text>
          </View>
        </View>
      );
    });
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.btnBox}>
        <Button mode="text">Request A Call</Button>
      </View>

      <ScrollView>
        {feed}
        {feed.length ? (<Title>You&#39;ve reached the end of the list</Title>) : (<Title>No Calls Scheduled</Title>)}
      </ScrollView>
    </View>
  );
}

export default Call;
