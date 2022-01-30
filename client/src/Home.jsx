import React from 'react';
import { ImageBackground } from 'react-native';
import Login from './screens/Login';
import Account from './screens/Account';
import { useUser } from './UserManager';

const image = require('../public/logo.png');

function Home() {
  const { subscribed } = useUser();

  return (
    <ImageBackground source={image}>
      {!subscribed ? (<Login />) : (<Account />)}
    </ImageBackground>
  );
}

export default Home;
