import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {fetchData} from '../utils/helper';

class AbsensiMatkul extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      resume: {},
    };
  }

  componentDidMount = async () => {
    const {route} = this.props;
    const matkulID = route.params.id;

    const token = await AsyncStorage.getItem('token');

    const getAbsen = {
      token,
      matakuliah_id: matkulID,
    };

    const dataAbsen = await fetchData(
      'POST',
      'http://192.168.0.112/web-absensi/get_absensi.php',
      getAbsen,
    );
    // console.log(dataAbsen);
    const panjangJSON = Object.keys(dataAbsen).length;
    if (panjangJSON > 0) {
      const {data, resume} = dataAbsen;
      this.setState({
        data,
        resume,
      });
    }
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.listContainer}>
        <Text>
          {item.jam} / {item.tanggal}
        </Text>
      </View>
    );
  };

  render() {
    const {data, resume} = this.state;

    return (
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}> ABSENSI </Text>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryChildLeft}>
            <Text style={styles.summaryText}>JUMLAH ABSEN</Text>
            <Text style={{}}>{resume.jumlah}</Text>
          </View>
          <View style={styles.summaryChildRight}>
            <Text style={styles.summaryText}>TOTAL PERTEMUAN</Text>
            <Text style={{}}>{resume.total}</Text>
          </View>
        </View>
        <View style={styles.jamTanggalContainer}>
          <Text style={styles.jamTanggalText}>JAM / TANGGAL ABSEN : </Text>
        </View>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.jam}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  summaryChildLeft: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: 40,
    width: '50%',
    backgroundColor: 'lime',
  },
  summaryChildRight: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 40,
    width: '50%',
    backgroundColor: 'khaki',
  },
  summaryText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jamTanggalContainer: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    padding: 5,
  },
  jamTanggalText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  listContainer: {
    borderBottomWidth: 0.5,
    padding: 5,
    backgroundColor: 'pink',
  },
});

export default AbsensiMatkul;
