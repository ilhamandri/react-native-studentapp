import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import {fetchData} from '../utils/helper';
import Connection from '../Connection';

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
      Connection.host + 'get_absensi.php',
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

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'white',
        }}
      />
    );
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.item}>
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
            <Text style={styles.summaryText}>{resume.jumlah}</Text>
          </View>
          <View style={styles.summaryChildRight}>
            <Text style={styles.summaryText}>TOTAL PERTEMUAN</Text>
            <Text style={styles.summaryText}>{resume.total}</Text>
          </View>
        </View>
        <View style={styles.jamTanggalContainer}>
          <Text style={styles.jamTanggalText}>JAM / TANGGAL ABSEN : </Text>
        </View>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.jam}
          ItemSeparatorComponent={this.FlatListItemSeparator}
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
    borderRightWidth: 1,
    borderColor: 'white',
    backgroundColor: '#186049',
  },
  summaryChildRight: {
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: 40,
    width: '50%',
    backgroundColor: '#186049',
  },
  summaryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  jamTanggalContainer: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    padding: 5,
  },
  jamTanggalText: {
    fontSize: 15,
    fontWeight: 'bold',
    // color: '#6ab29b',
  },
  listContainer: {
    borderBottomWidth: 0.5,
    padding: 5,
    backgroundColor: '#247158',
  },
  item: {
    color: 'white',
  },
});

export default AbsensiMatkul;
