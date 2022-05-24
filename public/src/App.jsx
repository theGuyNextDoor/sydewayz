import React from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderNav from './screens/HeaderNav'
import BottomNav from './screens/home/BottomNav';
import SignIn from './screens/login/SignIn';
import Chat from './screens/chat/Chat';

const Stack = createNativeStackNavigator();

function App() {
  const login = useSelector((state) => state.login);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: HeaderNav }}>
        {login ? (
          <>
            <Stack.Screen name="Home" component={BottomNav} />
            <Stack.Screen name="Chat" component={Chat} />
          </>
        ) : (
          <Stack.Screen name="signin" component={SignIn} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
