import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import Login from './screens/Login';
import Account from './screens/Account';
import { useUser } from './UserManager';

const image = require('../public/logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2F0FB',
  },
});

function Home() {
  const { subscribed } = useUser();

  return (
    <ImageBackground source={image} style={styles.container}>
      {!subscribed ? (<Login />) : (<Account />)}
    </ImageBackground>
  );
}

export default Home;
