import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './pages/Login';
import Tab from './pages/Tab/';
import AbsensiMatkul from './pages/AbsensiMatkul';

const ScreenStack = createStackNavigator();

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
        </ScreenStack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Routes;
