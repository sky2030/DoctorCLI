
/**
 * List of appointments 
 * Filter appointment based on there status and date
 * @ Mixlab - Anoop
 */


import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert, Platform, SafeAreaView,
  Linking
} from "react-native";
import moment from "moment-timezone";
import AsyncStorage from "@react-native-community/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { AntDesign } from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";

import RNPickerSelect from 'react-native-picker-select';
import { Chevron } from 'react-native-shapes';

const screenWidth = Math.round(Dimensions.get("window").width);

function DoctorAppointment({ navigation, route }) {
  let startDate = moment().startOf("day").format("x");
  let endDate = moment().endOf("day").format("x");
  const [slotDate, setslotDate] = useState(moment().format("ll"));
  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slotValue, setSlotValue] = useState("booked");
  const [allSlots, setAllSlots] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setAllSlots([])
      updateStartEndDate(new Date());
      setAppointmentList([]);
      setSlotValue("booked")
      fetchData();
    });
    return unsubscribe;
  }, [route.params]);

  const updateStartEndDate = async (sdate) => {
    startDate = moment(sdate).startOf("day").format("x");
    endDate = moment(sdate).endOf("day").format("x");
    setslotDate(moment(sdate).startOf("day").format("ll"));
  };
  const handleDatePicker = (date) => {
    updateStartEndDate(date);
    setDatePickerAvailable(false);
    fetchData();
  };
  const fetchData = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    // let URL = `${BASE_URL}slots?day_from=${startDate}&day_to=${endDate}&status[]=booked`;
    let URL = `${BASE_URL}slots?day_from=${startDate}&day_to=${endDate}`;
    console.log(URL);
    fetch(URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        // console.log("Data of appointment :", JSON.stringify(results.data[0].hospital))
        if (results.code != 200) {
          Alert.alert(Alert_Title, results.message);
        } else {
          setAllSlots(results.data)
          let list = results.data.filter(item => {
            if (item.status == slotValue)
              return item
          })
          setAppointmentList(list);
        }
      })
      .catch((err) => {
        setLoading(false);

        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const joinConversationPressed = async (item) => {
    ///v1/patient/appointment/join-now
    const userToken = await AsyncStorage.getItem("userToken");

    let URL = `${BASE_URL}appointment/join-now?appointment_id=${item.id}`;

    console.log(URL);
    fetch(URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        console.log(results);
        if (results.message != "success") {
          Alert.alert(Alert_Title, results.message);
        } else {
          navigation.navigate("EnxConferenceScreen", {
            streamId: results.data.enableX.room_id,
            token: results.data.enableX.token,
          });
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, err);
        // setAppointmentList(["jbhjbj", "jnjnj"])
      });
  };
  const getConsentReportStatus = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    let URL = `${BASE_URL}`;
    fetch(URL, {
      method: "GET",
      headers: { Authorization: userToken },
    })
      .then((res) => res.json())
      .then((results) => {
        setLoading(false);
        if (results.code != 200) {
          Alert.alert(Alert_Title, results.message);
        } else {

        }
      })
      .catch((err) => {
        setLoading(false);

        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const statusForJoinConversation = (item) => {
    return 0;
  };
  const StringFromTime = (timevalue) => {
    if (timevalue <= 0) {
      return "12:00 AM";
    }
    const time = Number(timevalue) / 60000;
    let sdate = new Date();
    sdate.setHours(Math.floor(time / 60));
    sdate.setMinutes(time % 60);
    var returnValue = moment(sdate.getTime(), "x").format("hh:mm A");
    // DeviceInfo.is24Hour() ? "HH:mm" : "hh:mm A"

    return returnValue;
  };
  const renderItem = (item, index) => {
    let joinConversationStatus = statusForJoinConversation(item);

    if (item.status != "booked") {
      joinConversationStatus = -1
    }
    return (
      <View style={styles.AppointmentCard}>
        <View style={styles.header}>
          <Text style={styles.whitebold}>{item.consultant.name}</Text>
        </View>
        <View style={styles.Cardbody}>
          <View style={styles.bodysection}>
            <Text style={styles.bodytext}>Appointment date</Text>
            <Text style={styles.bodytext}>
              {moment(item.day_millis).format("ll")}
            </Text>
          </View>
          <View style={styles.bodysection}>
            <Text style={styles.bodytext}>Appointment Time</Text>
            <Text style={styles.bodytext}>
              {StringFromTime(item.time_millis)}
            </Text>
          </View>
          {/* <View style={styles.title6}>
                    <Text style={styles.bodytext}>Fees</Text>
                    <Text style={styles.bodytext}>Rs. {item.doctor.fee}/- </Text>
                </View> */}
        </View>
        <View style={styles.btnrow}>
          <TouchableOpacity
            activeOpacity={0.95}
            onPress={() =>
              navigation.navigate("ReportRepo", { appointment_id: item.id })
            }
            style={styles.cardbtn}
          >
            <Text style={styles.whitebold}> View Report </Text>
          </TouchableOpacity>
          {joinConversationStatus == 1 && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => joinConversationPressed(item)}
              style={styles.cardDisabled}
            >
              <Text style={styles.whitebold}>Start Conversation </Text>
            </TouchableOpacity>
          )}
          {joinConversationStatus == 0 && (
            <TouchableOpacity
              onPress={() => joinConversationPressed(item)}
              style={styles.cardEnabled}
            >
              <Text style={styles.whitebold}>Start Conversation</Text>
            </TouchableOpacity>
          )}

          {
            item.status != "completed" && <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => {
                if (item.status == "completed") {
                  navigation.navigate("PrescriptionHistory", { appointment_id: item.id })
                }
                else {
                  navigation.navigate("prescription", { item })
                }
              }
              }
              style={styles.cardbtn}
            >
              <Text style={styles.whitebold}>Prescription</Text>
            </TouchableOpacity>
          }
        </View>
        {/* {
          item.status != "completed" && <TouchableOpacity
            activeOpacity={0.95}
            onPress={() => navigation.navigate("ConsentRaise", { appointment_id: item.id })
            }
            style={styles.cardbtn}
          >
            <Text style={styles.whitebold}>Raise Consent For Report</Text>
          </TouchableOpacity>
        } */}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        width: screenWidth - 20,
        flex: 1,
        marginTop: 20,
        alignSelf: "center",
      }}
    >
      {

        <View style={{
          flexDirection: "row", alignSelf: "center", marginBottom: 20


        }}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              height: 50, width: 150,
              justifyContent: "center"
            }}
            onPress={() => setDatePickerAvailable(true)}
          >
            <Text style={styles.toptext} >{`${slotDate}  `}
              <AntDesign name="calendar" size={20} color="black" />
            </Text>

          </TouchableOpacity>
          <RNPickerSelect
            style={{
              inputAndroid: {
                fontSize: 16,
                paddingHorizontal: 10,
                color: 'black',
                paddingRight: 30, //
              },
              inputIOS: {
                fontSize: 16,
                paddingHorizontal: 10,
                color: 'black',
                paddingRight: 30, //
              },
              iconContainer: {
                paddingVertical: 20,
              },
            }}
            placeholder={{}}
            useNativeAndroidPickerStyle={false}
            onValueChange={(itemValue) => {
              setSlotValue(itemValue)
              let list = allSlots.filter(item => {
                if (item.status == itemValue)
                  return item
              })
              setAppointmentList(list);
            }}
            Icon={() => {
              return <Chevron size={1.5} color="gray" />;
            }}
            items={[
              { label: 'Upcoming', value: 'booked' },
              { label: 'Completed', value: 'completed' },
            ]}
          />

          <DateTimePickerModal
            isVisible={isDatePickerAvailable}
            mode="date"
            onConfirm={handleDatePicker}
            onCancel={() => setDatePickerAvailable(false)}
          />

        </View>
      }
      {
        <FlatList
          style={{ marginBottom: 30 }}
          data={appointmentList}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => item.id}
          onRefresh={() => fetchData()}
          refreshing={loading}
          ListEmptyComponent={<NoDataView text={loading == true ? "" : NO_DATA_FOUND} />}
        />
      }


      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => 
          // navigation.navigate("PrivacyPolicy")
          Linking.openURL('https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html')
        }
        style={styles.footer}
      >
        <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default DoctorAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },

  toptext: {
    fontSize: 17,
    color: "black"
    // fontWeight: "bold",
    // marginTop: 5,
  },

  footer: {
    position: "absolute",
    bottom: 1,
    padding: 10,
    height: 40,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  bottomtext: {
    color: "#d02860",
    fontWeight: "bold",
  },

  header: {
    color: "white",
    backgroundColor: "#192161",
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 30,
  },
  whitebold: {
    color: "white",
    // marginVertical: 5,
    fontWeight: "500",
    textAlign: "center",
    alignSelf: "center",
  },

  AppointmentCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#E5F0ED",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: screenWidth - 20,
    marginBottom: 20,
  },
  Cardbody: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  bodysection: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  bodytext: {
    color: "#4E557C",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 8,
    marginLeft: 2,
  },

  cardDisabled: {
    flex: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "gray",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 35,
    justifyContent: "center",
  },
  cardEnabled: {
    flex: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 35,
    justifyContent: "center",
  },
  cardbtn: {
    flex: 1,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#192161",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 7,
    height: 35,
    justifyContent: "center",
  },

  btnrow: {
    flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    height: 45,
    marginBottom: 5,
  },
});
