import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {fetchData} from '../../utils/helper';
import AsyncStorage from '@react-native-community/async-storage';

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
    navigation.navigate('Profil');
    const qrKey = barcodes[0].data;
    const userToken = await AsyncStorage.getItem('token');
    console.log('qrKey : ', qrKey);
    console.log('userToken : ', userToken);
    const data = {qr_code: qrKey, token: userToken};
    const post = await fetchData(
      'POST',
      'http://192.168.0.112/web-absensi/post_qr.php',
      data,
    );
    console.log('post : ', post);
    // this.setState({userToken: getUserToken});
    // console.log(this.state.userToken);
    // const data = {qrKey, userToken: getuserToken};
    // console.log(data);
  };
}

const styles = StyleSheet.create({
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
});

export default ScanAbsen;
