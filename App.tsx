/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Follows from './src/pages/Follows';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Follows"
          component={Follows}
          options={({route}) => {
            const followsParams = route.params as any;
            return {
              title: `${followsParams?.name}'s ${followsParams?.type} (${followsParams.count})`,
            };
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={({route}) => {
            const followsParams = route.params as any;
            return {
              title: `${followsParams?.username}'s profile`,
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
