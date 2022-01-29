import axios from 'axios';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '../UserManager';
import Profile from './Profile';
import Tickets from './Tickets';

const requestApi = 'http://localhost:3000'; // TEMPORARY
// ${requestApi} DELETE ALL OCCURANCES

const Stack = createNativeStackNavigator();

function Account() {
  const { user, makeTickets } = useUser();

  useEffect(() => {
    if (Object.keys(user).length) {
      axios.get(`${requestApi}/api/zendesk/tickets/${user.email}`)
        .then(({ data }) => {
          makeTickets(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]); // MAY NEED TO CHANGE FOR TICKET REFRESH

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
        <Stack.Screen name="Tickets" component={Tickets} options={{ title: 'Requests' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Account;
