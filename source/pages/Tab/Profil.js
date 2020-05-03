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
  };

  // fungsi logout
  logoutFunc = async () => {
    try {
      await AsyncStorage.clear();
      this.props.navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {profile} = this.state;

    return (
      <View style={styles.container.global}>
        {/* container */}
        <View style={{flex: 0.5}} />
        {/* Main Container */}
        <View style={styles.container.main}>
          <View style={styles.container.text}>
            <Text style={styles.text.name}>Nama : </Text>
            <Text style={styles.text.value}>{profile.nama}</Text>
          </View>

          <View style={styles.container.text}>
            <Text style={styles.text.name}>NPM : </Text>
            <Text style={styles.text.value}>{profile.npm}</Text>
          </View>

          <View style={styles.container.text}>
            <Text style={styles.text.name}>Program Studi : </Text>
            <Text style={styles.text.value}>{profile.prodi}</Text>
          </View>

          <View style={styles.container.text}>
            <Text style={styles.text.name}>Email : </Text>
            <Text style={styles.text.value}>{profile.email}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button.default}
          onPress={this.logoutFunc}>
          <Text style={styles.button.text}>LOGOUT</Text>
        </TouchableOpacity>

        <View style={{flex: 0.5}} />
      </View>
    );
  }
}

const styles = {
  container: {
    global: {
      flex: 1,
      alignItems: 'center',
    },
    main: {
      borderWidth: 1,
      borderColor: '#186049',
      borderRadius: 10,
      flex: 3,
      width: '80%',
      padding: 10,
    },
    text: {
      // alignItems: 'center',
      marginVertical: 8,
      backgroundColor: '#247158',
      borderRadius: 15,
      height: 70,
    },
  },
  button: {
    default: {
      backgroundColor: '#247158',
      width: 200,
      marginVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      paddingVertical: 8,
      color: 'white',
      fontWeight: 'bold',
    },
  },
  text: {
    name: {
      marginVertical: 5,
      marginHorizontal: 10,
      color: '#f8f6f5',
      fontWeight: 'bold',
    },
    value: {
      marginVertical: 5,
      marginHorizontal: 10,
      color: '#f8f6f5',
      fontSize: 18,
    },
  },
};

export default Profile;
