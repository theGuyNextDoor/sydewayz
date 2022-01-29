import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import theme from '../../public/theme';

const styles = StyleSheet.create({
  container: {
    height: '95%',
    padding: '2%',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '50%',

    borderWidth: 1,
  },
  selections: {
    borderWidth: 1,
  },
});

function SubmitRequest() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Select Window:</Text>
        <View style={styles.selections}>
          <Text> Here is where the times go </Text>
        </View>
      </View>
    </View>
  );
}

export default SubmitRequest;
