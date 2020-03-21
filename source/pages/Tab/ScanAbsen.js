import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
// import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanAbsen extends Component {
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
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes[0].data);

            this.props.navigation.navigate('BarcodeValue', {
              data: barcodes[0].data,
            });
          }}
          // onBarcodeRead={this.onBarcodeRead}
        />
      </View>
    );
  }

  // onBarcodeRead = ({data, rawData, type, bounds}) => {
  //   console.log(`The data is ${data} and type is ${type}`);
  // };
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
