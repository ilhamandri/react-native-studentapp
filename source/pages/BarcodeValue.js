import React, {Component} from 'react';
import {View, Text} from 'react-native';

class BarcodeValue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text> {this.props.route.params.data} </Text>
      </View>
    );
  }
}

export default BarcodeValue;
