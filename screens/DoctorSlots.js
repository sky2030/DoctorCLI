/**
 * Manage Appointment
 * @ Mixlab - Anoop
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  SafeAreaView,
  Linking,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppHeader from '../components/AppHeader';

// import { AntDesign } from "@expo/vector-icons";
const screenWidth = Math.round(Dimensions.get('window').width);

const AVALABLE_COLOR = '#D7F4DC';
const BOOKED_COLOR = '#03b500';
const CANCELED_COLOR = '#de0202';
const IS_AVAILABLE = 'available';
const IS_BOOKED = 'booked';
const IS_CANCELED = 'canceled';
let startDateTime = moment().startOf('day').format('x');
let endDateTime = moment().endOf('day').format('x');
function DoctorSlot({navigation, route}) {
  const [slotDate, setslotDate] = useState(moment().format('ll'));

  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);

  const updateStartEndDate = async (sdate) => {
    startDateTime = moment(sdate).startOf('day').format('x');
    endDateTime = moment(sdate).endOf('day').format('x');
    setslotDate(moment(sdate).startOf('day').format('ll'));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      updateStartEndDate(new Date());
      setAppointmentList([]);

      fetchData();
    });
    return unsubscribe;
  }, [route.params]);

  const handleDatePicker = (date) => {
    updateStartEndDate(date);
    setDatePickerAvailable(false);
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    const userToken = await AsyncStorage.getItem('userToken');

    let URL = `${BASE_URL}slots?day_from=${startDateTime}&day_to=${endDateTime}&status[]=available&status[]=booked`;
    console.log(URL, userToken);
    fetch(URL, {
      method: 'GET',
      headers: {Authorization: userToken},
    })
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        if (results.code != 200) {
          Alert.alert(Alert_Title, results.message);
        } else {
          setAppointmentList(results.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const StringFromTime = (timevalue) => {
    if (timevalue <= 0) {
      return '12:00 AM';
    }
    const time = Number(timevalue) / 60000;
    let sdate = new Date();
    sdate.setHours(Math.floor(time / 60));
    sdate.setMinutes(time % 60);
    var returnValue = moment(sdate.getTime(), 'x').format('hh:mm A');
    // DeviceInfo.is24Hour() ? "HH:mm" : "hh:mm A"

    return returnValue;
  };
  const renderItem = (item, index) => {
    let patientName = 'Not Booked';
    if (
      item.consultant &&
      item.consultant.name &&
      item.consultant.name.length > 0 &&
      item.status == 'booked'
    ) {
      patientName = item.consultant.name;
      if (item.consultant.gender) {
        patientName = patientName + ' (' + item.consultant.gender + ')';
      }
    }
    return (
      <TouchableOpacity
        style={styles.card1}
        activeOpacity={0.8}
        onPress={() => deleteSlotPressed(item)}>
        <View style={{flex: 1, alignItems: 'center', marginVertical: 7}}>
          <Text style={{color: '#4E557C', fontWeight: '500', fontSize: 16}}>
            Appointment
          </Text>
          <Text
            style={{
              color: '#4E557C',
              marginTop: 5,
              fontWeight: '500',
              fontSize: 15,
            }}>
            {moment(item.day_millis).format('LT')}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginVertical: 7}}>
          <Text style={{color: '#4E557C', fontWeight: '500', fontSize: 16}}>
            Patient
          </Text>
          <Text
            style={{
              color: '#4E557C',
              marginTop: 5,
              fontWeight: '500',
              fontSize: 15,
            }}>
            {patientName}{' '}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const deleteAll = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    let URL = `${BASE_URL}appointment/cancelled`;
    let payLoad = {
      from_millis: startDateTime,
      to_millis: endDateTime,
    };

    fetch(URL, {
      method: 'PUT',
      headers: {
        Authorization: userToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        if (results.code != 200) {
          Alert.alert(Alert_Title, results.message);
        } else {
          navigation.goBack();
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const deleteAppointment = async (item) => {
    const userToken = await AsyncStorage.getItem('userToken');

    let URL = `${BASE_URL}appointment/cancelled`;
    let payLoad = {
      appointment_id: item.id,
    };

    fetch(URL, {
      method: 'PUT',
      headers: {
        Authorization: userToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        Alert.alert(Alert_Title, results.message);
        if (results.code == 200) {
          fetchData();
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const deleteSlotPressed = (item) => {
    Alert.alert(
      Alert_Title,
      `Would you like to cancel ${moment(item.day_millis).format(
        'LT',
      )} appointment slot?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteAppointment(item);
          },
        },
      ],
    );
  };
  const deleteAllSlotPressed = () => {
    Alert.alert(
      Alert_Title,
      `Would you like to cancel all your appointment's slot?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteAll()},
      ],
    );
  };
  const renderFooter = () => {
    if (appointmentList.length > 1) {
      return (
        //Footer View with Load More button
        <View
          style={{
            width: screenWidth / 2.3,
            alignSelf: 'center',
            marginTop: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => deleteAllSlotPressed()}
            //On Click of button load more data
            style={{
              flex: 1,
              backgroundColor: '#FF0000',
              paddingVertical: 8,
              borderRadius: 5,
              elevation: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', fontWeight: '500', fontSize: 17}}>
              Cancel All
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <View />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#d02860" barStyle="light-content" />
      {/* <View style={styles.head}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
          }}>
          <MaterialIcons
            name="navigate-before"
            size={24}
            onPress={() => navigation.goBack()}
            style={styles.back}
          />
          <Text style={styles.titletext}>Doctor Slots</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              color: '#08211c',
              margin: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setDatePickerAvailable(true)}>
            <Text style={styles.toptext}>{slotDate}</Text>

            <AntDesign name="calendar" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View> */}
      <AppHeader
        title={'Doctor Slots'}
        leftIconOnPress={() => navigation.goBack()}
        rightIconOnPress={() => setDatePickerAvailable(true)}
        rightText={slotDate}
      />
      <FlatList
        style={{marginBottom: 20}}
        data={appointmentList}
        renderItem={({item, index}) => renderItem(item, index)}
        keyExtractor={(item, index) => item.id}
        onRefresh={() => fetchData()}
        refreshing={loading}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          <NoDataView text={loading == true ? '' : NO_DATA_FOUND} />
        }
      />
      {/* <View style={{ width: screenWidth / 2.3, alignSelf: "center", marginTop: 10 }}> */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate(
            'ManageConsultation',
            // { data }
          )
        }
        //On Click of button load more data
        style={{
          backgroundColor: '#1E3283',
          // marginTop: 10,
          paddingVertical: 8,
          width: screenWidth / 2.3,
          borderRadius: 5,
          elevation: 2,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          height: 40,
        }}>
        <Text style={{color: '#fff', fontWeight: '500', fontSize: 17}}>
          Add Slots
        </Text>
      </TouchableOpacity>
      {/* </View> */}
      <DateTimePickerModal
        isVisible={isDatePickerAvailable}
        mode="date"
        onConfirm={handleDatePicker}
        onCancel={() => setDatePickerAvailable(false)}
      />

      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() =>
          Linking.openURL(
            'https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html',
          )
        }
        style={styles.footer}>
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default DoctorSlot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  back: {
    padding: 10,
    color: '#4E557C',
  },
  headtext: {
    color: '#08211c',
    marginBottom: 5,
    fontSize: 15,
    fontWeight: '500',
  },
  head: {
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  titletext: {
    color: '#4E557C',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 50,
  },

  footer: {
    // position: "absolute",
    bottom: 1,
    // backgroundColor: "#009387",
    padding: 20,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  bottomtext: {
    color: '#d02860',
    fontSize: 15,
  },

  Cardheadtext: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  btntext: {
    color: 'black',
    fontSize: 20,
    marginLeft: 5,
    fontWeight: '500',
  },
  Patientbodytext: {
    color: 'darkred',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
    marginTop: 4,
    marginLeft: 15,
  },
  Patienthead: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 2,
    marginTop: 4,
    marginLeft: 15,
  },

  header: {
    color: 'white',
    backgroundColor: '#3B565B',
    fontSize: 15,
    fontWeight: '500',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 35,
    //marginTop:10,
  },

  AppointmentCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#D7F4DC',
    borderWidth: 1,
    borderColor: '#1B5D9B',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
  },

  Subtitle: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  toptext: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
  },

  Cardbody: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonheader: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  PatientText: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  title5: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 25,
    marginRight: 10,
    flexDirection: 'column',
    marginLeft: 70,
    marginBottom: 20,
  },

  timetext: {
    fontSize: 22,
    fontWeight: '800',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  datetext: {
    fontSize: 20,
  },
  btn: {
    width: 70,
    backgroundColor: '#078191',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
  btn1: {
    width: 120,
    backgroundColor: '#078191',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 3,
    marginRight: 10,
  },

  Actionable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 50,
    paddingRight: 5,
    marginTop: 5,
  },
  btn2: {
    width: 180,
    backgroundColor: '#078191',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
  },
  card1: {
    borderRadius: 4,
    elevation: 2,
    backgroundColor: 'white',
    shadowColor: '#55DE61',
    shadowRadius: 2,
    marginHorizontal: 10,
    alignSelf: 'center',
    marginTop: 5,
    width: screenWidth - 20,
    flexDirection: 'row',
    marginBottom: 5,
  },
});
