import React from 'react';
import { View } from 'react-native';
import Login from './screens/Login';
import Admin from './screens/Admin';
import Account from './screens/Account';
import { useUser } from './UserManager';
import theme from '../public/theme';

function Home() {
  const { admin, agent, endUser } = useUser();

  return (
    <View style={theme.wrapper}>
      {!admin && !endUser && (<Login />)}
      {(admin || agent) && <Admin />}
      {endUser && <Account />}
    </View>
  );
}

export default Home;
