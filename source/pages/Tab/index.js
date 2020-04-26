import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import DaftarMatkul from './DaftarMatkul';
import ScanAbsen from './ScanAbsen';
import Profil from './Profil';

const BottomTab = createBottomTabNavigator();
// const DaftarMatkulStack = createStackNavigator();

class Index extends Component {
  render() {
    return (
      <BottomTab.Navigator
        initialRouteName="DaftarMatkul"
        tabBarOptions={{
          activeTintColor: 'white',
          activeBackgroundColor: '#247158',
        }}>
        <BottomTab.Screen
          name="DaftarMatkul"
          component={DaftarMatkul}
          options={{title: 'Daftar Mata Kuliah'}}
        />
        <BottomTab.Screen
          name="ScanAbsen"
          component={ScanAbsen}
          options={{title: 'Scan Absen'}}
        />
        <BottomTab.Screen
          name="Profil"
          component={Profil}
          options={{title: 'Profil'}}
        />
      </BottomTab.Navigator>
    );
  }
}

export default Index;
