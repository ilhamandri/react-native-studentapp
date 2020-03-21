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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'ilham@unpar.ac.id',
      password: 'ilham',
      name: '',
      status: '',
    };
  }

  loginClicked = async () => {
    const loginData = {email: this.state.email, password: this.state.password};

    fetch('http://192.168.0.105/web-absensi/login_api.php', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(async data => {
        this.setState({status: data.STATUS_CODE});
        console.log(data);
        if (this.state.status == 'OK') {
          // console.log(data.mahasiswa.token);
          await AsyncStorage.setItem('name', data.mahasiswa.nama);
          await AsyncStorage.setItem('token', data.mahasiswa.token);
          await AsyncStorage.setItem(
            'daftarMatkul',
            JSON.stringify(data.matakuliah),
          );

          // this.props.navigation.navigate('Tab', {namaMahasiswa: 'andri'});
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Tab'}],
          });
          this.setState({email: '', password: ''});
        } else {
          if (
            this.state.email == '' ||
            this.state.password == '' ||
            (this.state.email == '' && this.state.password == '')
          ) {
            Alert.alert(
              'LOGIN GAGAL',
              'Email atau Password tidak boleh kosong',
            );
            this.setState({email: '', password: ''});
          } else {
            Alert.alert('LOGIN GAGAL', 'Email atau Password salah');
            this.setState({email: '', password: ''});
          }
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  render() {
    return (
      <View style={styles.globalContainer}>
        {/* Container */}
        <View style={styles.contentContainer}>
          {/* Image Header */}
          <View style={styles.imageHeader}>
            <Image
              source={require('./../assets/images/logounpar.png')}
              style={styles.image}
            />
          </View>

          {/* Form Login */}
          <View style={styles.formContainer}>
            <View style={styles.formLine}>
              <Image
                source={require('./../assets/images/logounpar.png')}
                style={styles.iconImage}
              />
              <TextInput
                placeholder={'Email'}
                onChangeText={email => this.setState({email: email})}
                value={this.state.email}
                style={styles.inputEmailPass}
              />
            </View>
            <View style={styles.formLine}>
              <Image
                source={require('./../assets/images/logounpar.png')}
                style={styles.iconImage}
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
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.btnTouch}
              onPress={() => this.loginClicked()}>
              <Text style={styles.btnText}>LOGIN</Text>
            </TouchableOpacity>
            {/* <Button title={'Token'} onPress={this.btnToken} /> */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    height: 450,
    width: 300,
    borderRadius: 20,
    borderWidth: 1,
  },
  imageHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
  formContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLine: {
    flexDirection: 'row',
  },
  iconImage: {
    height: 50,
    width: 50,
    marginRight: 7,
  },
  inputEmailPass: {
    borderBottomWidth: 1,
    width: 150,
    marginLeft: 7,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTouch: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 250,
  },
  btnText: {
    margin: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
