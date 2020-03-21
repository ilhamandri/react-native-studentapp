import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import DaftarMatkul from './DaftarMatkul';
import ScanAbsen from './ScanAbsen';
import Logout from './Logout';

const BottomTab = createBottomTabNavigator();
// const DaftarMatkulStack = createStackNavigator();

class Index extends Component {
  render() {
    return (
      <BottomTab.Navigator initialRouteName="DaftarMatkul">
        <BottomTab.Screen name="DaftarMatkul" component={DaftarMatkul} />
        <BottomTab.Screen name="ScanAbsen" component={ScanAbsen} />
        <BottomTab.Screen name="Logout" component={Logout} />
      </BottomTab.Navigator>
    );
  }
}

export default Index;
