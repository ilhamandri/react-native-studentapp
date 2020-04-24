import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {fetchData} from '../../utils/helper';
import AsyncStorage from '@react-native-community/async-storage';
import Connection from '../../Connection';

class ScanAbsen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          barcodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          onGoogleVisionBarcodesDetected={this.scannedQR}
          // onBarcodeRead={this.onBarcodeRead}
        />
      </View>
    );
  }

  scannedQR = async ({barcodes}) => {
    const {navigation} = this.props;

    // ambil isi qr
    const qrKey = barcodes[0].data;
    const userToken = await AsyncStorage.getItem('token');

    // console.log('qrKey : ', qrKey);
    // console.log('userToken : ', userToken);

    const data = {qr_code: qrKey, token: userToken};

    const post = await fetchData('POST', Connection.host + 'post_qr.php', data);
    console.log('post : ', post);

    // Memeriksa status code untuk scanning
    const {ERROR, STATUS_CODE} = post;
    // console.log('err : ', ERROR);
    // console.log('status :', STATUS_CODE);

    if (STATUS_CODE === 'NOK') {
      Alert.alert('SCAN GAGAL', 'Kode qr tidak sesuai');
      navigation.navigate('DaftarMatkul');
    } else {
      Alert.alert('SCAN BERHASIL', 'Berhasil melakukan absen');
      navigation.navigate('DaftarMatkul');
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
