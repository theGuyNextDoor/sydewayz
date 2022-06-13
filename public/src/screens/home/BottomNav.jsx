import axios from 'axios';
import { authorize } from 'react-native-app-auth';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BottomNavigation } from 'react-native-paper';
import Appointment from './Appointment';
import Requests from './Requests';
import DOMAIN from '../../domain';

function LeagueNav({ route }) {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.authenticated);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Appointment', title: 'Appointment', icon: 'calendar-clock' },
    { key: 'Requests', title: 'Requests', icon: 'ticket' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Appointment,
    Requests,
  });

  return (
    <BottomNavigation
      // sceneAnimationEnabled={true}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}

export default LeagueNav;
