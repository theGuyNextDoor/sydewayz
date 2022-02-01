import axios from 'axios';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUser } from '../UserManager';
import Profile from './Profile';
import Requests from './Requests';

const requestApi = 'http://localhost:3000'; // TEMPORARY
// ${requestApi} DELETE ALL OCCURANCES

const Stack = createNativeStackNavigator();

function Account() {
  const { user, makeRequests } = useUser();
  let openRequests = [];
  let closedRequests = [];

  useEffect(() => {
    if (Object.keys(user).length) {
      axios.get(`${requestApi}/api/zendesk/requests/${user.email}`)
        .then(({ data }) => {
          data.forEach((item) => {
            if (item.status === 'closed') {
              closedRequests = [...closedRequests, item];
            } else {
              openRequests = [...openRequests, item];
            }
          });

          makeRequests(openRequests, 'open');
          makeRequests(closedRequests, 'closed');
          makeRequests(data);
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
        <Stack.Screen name="Requests" component={Requests} options={{ title: 'Requests' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Account;
