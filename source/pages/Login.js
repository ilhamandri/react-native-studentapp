import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Connection from '../Connection';
import {fetchData} from '../utils/helper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'ilham@unpar.ac.id',
      password: 'unpar',
    };
  }

  // penanganan sukses login
  successHandler = async mahasiswa => {
    const {navigation} = this.props;
    await AsyncStorage.setItem('name', mahasiswa.nama);
    await AsyncStorage.setItem('token', mahasiswa.token);
    await AsyncStorage.setItem('profile', JSON.stringify(mahasiswa));
    navigation.reset({
      index: 0,
      routes: [{name: 'Tab'}],
    });
  };

  // penanganan gagal login
  rejectHandler = () => {
    const {email, password} = this.state;

    if (email === '' || password === '' || (email === '' && password === '')) {
      Alert.alert('LOGIN GAGAL', 'Email atau Password tidak boleh kosong');
    } else {
      Alert.alert('LOGIN GAGAL', 'Email atau Password salah');
    }
  };

  // fungsi login
  loginClicked = async () => {
    const {email, password} = this.state;
    const loginData = {email, password};

    const {STATUS_CODE, mahasiswa} = await fetchData(
      'POST',
      Connection.host + 'login_api.php',
      loginData,
    );

    if (STATUS_CODE === 'OK') {
      this.successHandler(mahasiswa);
    } else {
      this.rejectHandler();
    }
    this.setState({email: '', password: ''});
  };

  render() {
    return (
      <View style={styles.container.global}>
        {/* Container */}
        <View style={styles.container.content}>
          {/* Image Header */}
          <View style={styles.image.header}>
            <Image
              source={require('./../assets/images/logounpar.png')}
              style={styles.image.img}
            />
          </View>

          {/* Form Login */}
          <View style={styles.form.container}>
            <View style={styles.form.line}>
              <Image
                source={require('./../assets/images/user.png')}
                style={styles.icon}
              />
              <TextInput
                placeholder={'Email'}
                onChangeText={email => this.setState({email: email})}
                value={this.state.email}
                style={styles.inputEmailPass}
              />
            </View>
            <View style={styles.form.line}>
              <Image
                source={require('./../assets/images/password.png')}
                style={styles.icon}
              />
              <TextInput
                secureTextEntry={true}
                placeholder={'Password'}
                onChangeText={password => this.setState({password: password})}
                value={this.state.password}
                style={styles.inputEmailPass}
              />
            </View>
          </View>
          {/* Button Login */}
          <View style={styles.button.container}>
            <TouchableOpacity
              style={styles.button.touch}
              onPress={() => this.loginClicked()}>
              <Text style={styles.button.text}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    global: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    content: {
      height: 450,
      width: 300,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#186049',
    },
  },
  image: {
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      height: 100,
      width: 100,
    },
  },
  form: {
    container: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      flexDirection: 'row',
      paddingVertical: 3,
    },
  },
  icon: {
    height: 50,
    width: 50,
    marginRight: 7,
  },
  inputEmailPass: {
    borderBottomWidth: 1,
    width: 150,
    marginLeft: 7,
  },
  button: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    touch: {
      backgroundColor: '#247158',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      width: 250,
    },
    text: {
      margin: 10,
      color: 'white',
      fontWeight: 'bold',
    },
  },
};

export default Login;
