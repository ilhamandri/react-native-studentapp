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
      percentage: 0,
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

    // console.log('data absen :', dataAbsen);

    const panjangJSON = Object.keys(dataAbsen).length;
    if (panjangJSON > 0) {
      const {data, resume} = dataAbsen;
      this.setState({
        data,
        resume,
      });
    }

    // set persentase absen
    let percentage = this.absentPercentage();
    this.setState({percentage});
  };

  // persentase kehadiran
  absentPercentage = () => {
    const {resume} = this.state;
    let percentage = (resume.jumlah / resume.total) * 100;
    return percentage;
  };

  // pemisah item list
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

  // item list
  renderItem = ({item}) => {
    return (
      <View style={styles.container.list}>
        <Text style={styles.item}>
          {item.jam} / {item.tanggal}
        </Text>
      </View>
    );
  };

  render() {
    const {data, resume, percentage} = this.state;

    return (
      // jangan lupa add flex ke view paling luar
      <View style={{flex: 1}}>
        <View style={styles.container.header}>
          <Text style={styles.header}> ABSENSI </Text>
        </View>
        <View style={styles.container.summary}>
          <View style={styles.summary.childLeft}>
            <Text style={styles.summary.text}>JUMLAH ABSEN</Text>
            <Text style={styles.summary.text}>{resume.jumlah}</Text>
          </View>
          <View style={styles.summary.childRight}>
            <Text style={styles.summary.text}>TOTAL PERTEMUAN</Text>
            <Text style={styles.summary.text}>{resume.total}</Text>
          </View>
        </View>
        <View style={styles.container.persentase}>
          <Text style={styles.summary.text}>
            PERSENTASE KEHADIRAN : {percentage} %{' '}
          </Text>
        </View>
        <View style={styles.container.jamTanggal}>
          <Text style={styles.jamTanggalText}>JAM / TANGGAL ABSEN : </Text>
        </View>
        <FlatList
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => item.jam}
          ItemSeparatorComponent={this.FlatListItemSeparator}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      paddingVertical: 8,
    },
    summary: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      borderColor: 'white',
    },
    list: {
      borderBottomWidth: 0.5,
      padding: 5,
      backgroundColor: '#247158',
    },
    jamTanggal: {
      justifyContent: 'center',
      borderBottomWidth: 1,
      padding: 5,
    },
    persentase: {
      alignItems: 'center',
      backgroundColor: '#247158',
    },
  },
  summary: {
    childLeft: {
      alignItems: 'center',
      alignSelf: 'flex-start',
      height: 40,
      width: '50%',
      borderRightWidth: 1,
      borderColor: 'white',
      backgroundColor: '#186049',
    },
    childRight: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      height: 40,
      width: '50%',
      backgroundColor: '#186049',
    },
    text: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'white',
    },
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  jamTanggalText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  item: {
    color: 'white',
  },
};

export default AbsensiMatkul;
