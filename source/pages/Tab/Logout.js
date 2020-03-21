import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Logout extends Component {
  // componentDidMount() {
  //   this.props.navigation.addListener('focus', async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       this.props.navigation.replace('Login');
  //     } catch (e) {
  //       // clear error
  //     }
  //     console.log('Done.');
  //     console.log('logout');
  //   });
  // }

  render() {
    return (
      <View>
        <Button
          title={'LOGOUT'}
          onPress={() => {
            // this.props.navigation.reset({index: 0, routes: [{name: 'Login'}]});
            this.props.navigation.replace('Login');
          }}
        />
        <Text> Logout </Text>
      </View>
    );
  }
}

export default Logout;
