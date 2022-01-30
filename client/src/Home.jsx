import React from 'react';
import { View } from 'react-native';
import Login from './screens/Login';
import Account from './screens/Account';
import { useUser } from './UserManager';
import theme from '../public/theme';

function Home() {
  const { subscribed } = useUser();

  return (

    <View style={theme.wrapper}>
      {/* {!subscribed ? (<Login />) : (<Account />)} */}
      {!subscribed && <Login />}
      {subscribed && <Account />}
    </View>
  );
}

export default Home;
