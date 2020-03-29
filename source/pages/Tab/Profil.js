import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  componentDidMount = async () => {
    const getProfileValue = await AsyncStorage.getItem('profile');
    this.setState({profile: JSON.parse(getProfileValue)});
    // console.log('Profile', getProfileValue);
  };

  logoutFunc = async () => {
    try {
      await AsyncStorage.clear();
      this.props.navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
    // console.log(await AsyncStorage.getItem('daftarMatkul'));
  };

  render() {
    const {profile} = this.state;

    return (
      <View style={styles.globalContainer}>
        {/* container */}
        <View style={{flex: 1}}></View>
        {/* Main Container */}
        <View style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={{marginVertical: 5}}>Nama : </Text>
            <Text>{profile.nama}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={{marginVertical: 5}}>NPM : </Text>
            <Text>{profile.npm}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={{marginVertical: 5}}>Program Studi : </Text>
            <Text>{profile.prodi}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={{marginVertical: 5}}>Email : </Text>
            <Text>{profile.email}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.logoutFunc}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>

        <View style={{flex: 1}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    alignItems: 'center',
  },
  mainContainer: {
    borderWidth: 1,
    borderRadius: 10,
    flex: 2,
    backgroundColor: 'khaki',
    width: '80%',
    padding: 10,
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'red',
    width: 200,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    paddingVertical: 8,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Profile;
