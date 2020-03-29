import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {fetchData} from '../../utils/helper';

export default class DaftarMatkul extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      namaMahasiswa: '',
      matkul: [],
    };
  }

  getMatkul = async () => {
    const token = await AsyncStorage.getItem('token');
    const data = {token};
    const daftarMatkul = await fetchData(
      'POST',
      'http://192.168.0.112/web-absensi/get_matkul.php',
      data,
    );
    // console.log(daftarMatkul);
    this.setState({matkul: daftarMatkul.matakuliah});
  };

  componentDidMount = async () => {
    const nama = await AsyncStorage.getItem('name');
    this.setState({namaMahasiswa: nama});
    await this.getMatkul();
  };

  cekAbsensiMatkul = id => {
    const {navigation} = this.props;
    navigation.navigate('AbsensiMatkul', {id});
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
    );
  };

  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.list}
      onPress={() => this.cekAbsensiMatkul(item.id)}>
      <Text>{item.kode}</Text>
      <Text>{item.nama}</Text>
      <Text>{item.sks}</Text>
    </TouchableOpacity>
  );

  render() {
    const {namaMahasiswa, matkul, loading} = this.state;

    return (
      <View style={styles.container}>
        <Text style={{fontSize: 20, marginVertical: 10}}>
          Selamat Datang, {namaMahasiswa}
        </Text>
        <View style={{borderBottomWidth: 1}}></View>
        <FlatList
          data={matkul}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.getMatkul} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: '#fff',
  },
});
