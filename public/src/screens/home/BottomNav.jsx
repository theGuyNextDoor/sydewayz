import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Home from './Home';
import Requests from './Requests';

function LeagueNav({ route }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'Home', title: 'Home', icon: 'home' },
    { key: 'Requests', title: 'Requests', icon: 'ticket' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Home,
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
