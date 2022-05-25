import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Appointment from './Appointment';
import Requests from './Requests';
import Call from './Call';

function LeagueNav({ route }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Appointment', title: 'Appointment', icon: 'calendar-clock' },
    { key: 'Call', title: 'Calls', icon: 'phone-hangup' },
    { key: 'Requests', title: 'Requests', icon: 'ticket' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Appointment,
    Call,
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
