import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './pages/Login';
import Tab from './pages/Tab/index';
import AbsensiMatkul from './pages/AbsensiMatkul';
import BarcodeValue from './pages/BarcodeValue';

const ScreenStack = createStackNavigator();

function getHeaderTitle(route) {
  // Access the tab navigator's state using `route.state`
  const routeName = route.state
    ? // Get the currently active route name in the tab navigator
      route.state.routes[route.state.index].name
    : // If state doesn't exist, we need to default to `screen` param if available, or the initial screen
      // In our case, it's "Feed" as that's the first screen inside the navigator
      route.params?.screen || 'DaftarMatkul';

  switch (routeName) {
    case 'DaftarMatkul':
      return 'Selamat Datang ';
    case 'Logout':
      return 'Logout';
  }
}

class Routes extends Component {
  render() {
    return (
      <NavigationContainer>
        <ScreenStack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <ScreenStack.Screen name="Login" component={Login} />
          <ScreenStack.Screen name="Tab" component={Tab} />
          <ScreenStack.Screen name="AbsensiMatkul" component={AbsensiMatkul} />
          <ScreenStack.Screen name="BarcodeValue" component={BarcodeValue} />
        </ScreenStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Routes;
