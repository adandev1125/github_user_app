import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import Follows from './src/pages/Follows';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import store from './src/store';

const Stack = createNativeStackNavigator();

const routes = [
  {name: 'Search GitHub User', component: Home},
  {
    name: 'Follows',
    component: Follows,
    option: (option: {route: any}) => {
      const followsParams = option.route.params as any;
      return {
        title: `${followsParams?.name}'s ${followsParams?.type} (${followsParams.count})`,
      };
    },
  },
  {
    name: 'Profile',
    component: Profile,
    option: (option: {route: any}) => {
      const followsParams = option.route.params as any;
      return {
        title: `${followsParams?.username}'s profile`,
      };
    },
  },
];

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search GitHub User">
          {routes.map(r => (
            <Stack.Screen
              key={r.name}
              name={r.name}
              component={r.component}
              options={r.option}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
