import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import Follows from './src/pages/Follows';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import store from './src/store';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search GitHub User">
          <Stack.Screen name="Search GitHub User" component={Home} />
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
    </Provider>
  );
}

export default App;
