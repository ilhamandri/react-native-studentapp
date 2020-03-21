import React from 'react';
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

export default class DaftarMatkul extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      matkul: [],
    };
  }

  getMatkul = async () => {
    try {
      const value = await AsyncStorage.getItem('daftarMatkul');
      if (value !== null) {
        // value previously stored
        // console.log(value);
        this.setState({matkul: JSON.parse(value)});
      }
    } catch (e) {
      // error reading value
    }
  };

  // getData = async () => {
  //   this.setState({loading: true});
  //   try {
  //     let response = await fetch(GlobalVar.host + 'employees');
  //     let responseJson = await response.json();
  //     await AsyncStorage.setItem(
  //       '@employees',
  //       JSON.stringify(responseJson.data),
  //     );
  //     // console.log(responseJson.data);
  //     this.setState({data: responseJson.data, loading: false});
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  getFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('@employees');
      if (value !== null) {
        // value previously stored
        console.log('ini', value);
        this.setState({data: JSON.parse(value)});
      } else {
        console.log('kosong');
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  componentDidMount = async () => {
    // await this.getFromStorage();
    await this.getMatkul();
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

  cekAbsensiMatkul = async () => {
    this.props.navigation.navigate('AbsensiMatkul');

    const getAbsen = {
      token: await AsyncStorage.getItem('token'),
      matakuliah_id: 1,
    };

    fetch('http://192.168.0.105/web-absensi/get_absensi.php', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getAbsen),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.list}
      onLongPress={() => this.deleteItem(item)}
      onPress={() => this.cekAbsensiMatkul()}>
      <Text style={styles.lightText}>{item.kode}</Text>
      <Text style={styles.lightText}>{item.nama}</Text>
      <Text style={styles.lightText}>{item.sks}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text>Selamat Datang</Text>
        <FlatList
          data={this.state.matkul}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={item => this.renderItem(item)}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={() => this.getMatkul()}
            />
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
