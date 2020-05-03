import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {fetchData} from '../../utils/helper';
import AsyncStorage from '@react-native-community/async-storage';
import Connection from '../../Connection';

class ScanAbsen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          barcodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onBarCodeRead={this.onBarCodeRead}
        />
      </View>
    );
  }

  onBarCodeRead = async barcode => {
    const {code} = this.state;
    const {navigation} = this.props;

    if (code !== barcode.data) {
      this.setState({code: barcode.data});
      const qr_value = barcode.data;
      const user_token = await AsyncStorage.getItem('token');

      const data_to_send = {
        qr_code: qr_value,
        token: user_token,
      };

      const post = await fetchData(
        'POST',
        Connection.host + 'post_qr.php',
        data_to_send,
      );
      const {ERROR, STATUS_CODE} = post;

      if (STATUS_CODE === 'OK') {
        Alert.alert('SCAN BERHASIL', ERROR);
        navigation.navigate('DaftarMatkul');
      } else {
        Alert.alert('SCAN GAGAL', ERROR);
        navigation.navigate('DaftarMatkul');
      }
    }
  };
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
};

export default ScanAbsen;
