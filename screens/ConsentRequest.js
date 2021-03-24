import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import moment from "moment-timezone";
import { Dropdown } from "react-native-material-dropdown-v2";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-community/async-storage";
// import { AntDesign } from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";

import CheckBox from '@react-native-community/checkbox';
import Feather from "react-native-vector-icons/Feather";
const PurposeList = [
    {
        value: "Care Management",
        code: "CAREMGT",
        index: 0,
    },
    {
        value: "Break the Glass",
        code: "BTG",
        index: 1,
    },
    {
        value: "Public Health",
        code: "PUBHLTH",
        index: 2,
    },
    {
        value: "Healthcare Payment",
        code: "HPAYMT",
        index: 3,
    },
    {
        value: "Disease Specific Healthcare Research",
        code: "DSRCH",
        index: 4,
    },
    {
        value: "Self Requested",
        code: "PATRQT",
        index: 5,
    },

];

const ConsentRequest = ({ navigation, route }) => {
    const [PatientId, setPatientId] = useState("")
    const [Purpose, setPurpose] = useState("")
    const [PurposeCode, setPurposeCode] = useState("")
    const [Infofrom, setInfofrom] = useState(new Date())
    const [Infoto, setInfoto] = useState(new Date())
    const [Infotype, setInfotype] = useState([])
    const [Expiry, setExpiry] = useState(new Date())
    const [OPCisSelected, setOPSelection] = useState(false);
    const [DisisSelected, setDisSelection] = useState(false);
    const [DiagisSelected, setDiagSelection] = useState(false);
    const [PresisSelected, setPresSelection] = useState(false);
    const [Calendarfrom, setCalendarfrom] = useState(false);
    const [Calendarto, setCalendarto] = useState(false);
    const [CalendarExpiry, setCalendarExpiry] = useState(false);

    const submitData = async () => {

        if (OPCisSelected) {
            Infotype.push("OPConsultation")
        }
        if (DisisSelected) {
            Infotype.push("DischargeSummary")
        }
        if (DiagisSelected) {
            Infotype.push("DiagnosticReport")
        }
        if (PresisSelected) {
            Infotype.push("Prescription")
        }
        console.log(JSON.stringify(Infotype))
        const userToken = await AsyncStorage.getItem("userToken");
        fetch(`${BASE_URL}/v0.5/consent-requests/init`, {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                Authorization: userToken,
                "X-CM-ID": "sbx"
            },
            body: JSON.stringify({
                id: PatientId,
                text: Purpose,
                code: PurposeCode,
                from: moment(Infofrom).format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
                to: moment(Infoto).format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
                dataEraseAt: moment(Expiry).format("YYYY-MM-DDTHH:mm:ss.SSSSSS"),
                htype: Infotype

            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("data msg :", data.message)
                Alert.alert(Alert_Title, data.message);
                navigation.goBack();
            })
            .catch((err) => {
                Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
            });
    };
    const getPatientDetail = async () => {
        const userToken = await AsyncStorage.getItem("userToken");
        let URL = `${BASE_URL}`;
        fetch(URL, {
          method: "GET",
          headers: { Authorization: userToken },
        })
          .then((res) => res.json())
          .then((results) => {
            if (results.code != 200) {
              Alert.alert(Alert_Title, results.message);
            } else {
    
            }
          })
          .catch((err) => {
    
            Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
          });
      };
    

    const handleDatePickerfrom = (date) => {
        setInfofrom(date);
        // setInfofrom(moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSSSS"));
        setCalendarfrom(false);
    };

    const handleDatePickerto = (date) => {
        setInfoto(date);
        // setInfofrom(moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSSSS"));
        setCalendarto(false);
    };

    const handleDatePickerExpiry = (date) => {
        setExpiry(date);
        // setInfofrom(moment(date).format("YYYY-MM-DDTHH:mm:ss.SSSSSS"));
        setCalendarExpiry(false);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            // updateDOB(new Date());
            setInfotype([])
            setOPSelection(false)
            setDiagSelection(false)
            setPresSelection(false)
            setDisSelection(false)
            // console.log(route.params)
        });

        return unsubscribe;
    }, []);



    // const renderList = (item) => {
    //   return (
    //     <TouchableOpacity
    //       activeOpacity={0.95}
    //       onPress={() => {
    //         setDepartment(item.departmentname);
    //         setDeptcode(item.deptcode);
    //       }}
    //       style={styles.option}
    //     >
    //       <Text style={styles.deptName}>{item.departmentname}</Text>
    //     </TouchableOpacity>
    //   );
    // };

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <MaterialIcons
                    name="navigate-before"
                    size={30}
                    onPress={() => navigation.goBack()}
                    style={styles.back}
                />

                <Text style={styles.headtext}>Consent Request Form</Text>
            </View>

            {/* <Text style={{fontSize:18}}> {HospitalCode.hospitalcode} </Text> */}

            <ScrollView style={styles.formArea}>

                {/* <TextInput
                    label="Patient Health ID"
                    placeholderTextColor="#666666"
                    style={styles.inputStyle}
                    value={PatientId}
                    // onFocus={()=>setenableShift(false)}
                    theme={theme}
                    mode="outlined"
                    onChangeText={(text) => setPatientId(text)}
                /> */}
                <View style={{ flexDirection: "row", flex: 1, alignItems : "center", 
                marginRight :8 }}>
                <TextInput
                    label="Patient Health ID"
                    placeholderTextColor="#666666"
                    style={styles.inputStyle}
                    value={PatientId}
                    // onFocus={()=>setenableShift(false)}
                    theme={theme}
                    mode="outlined"
                    onChangeText={(text) => setPatientId(text)}
                />
                <Text style={{paddingHorizontal : 8, fontWeight : "bold", fontSize : 20}}>@ndhm</Text>
            <TouchableOpacity onPress={getPatientDetail}>
            <Feather name="search" color="#75756d" size={20} />
            </TouchableOpacity>
          </View>
                <Dropdown
                    label="Purpose of Request"
                    data={PurposeList}
                    onChangeText={(value, code) => {
                        setPurpose(value);
                        setPurposeCode(code);
                    }}
                />

                <View style={styles.Subtitle}>
                    <Text style={styles.toptext}>Health info From</Text>
                    <TouchableOpacity
                        style={{
                            color: "#08211c",
                            flex: 1,
                            flexDirection: 'row'
                        }}
                        onPress={() => setCalendarfrom(true)}
                    ><AntDesign name="calendar" size={32} color="black" />
                        <Text style={styles.toptext}> {moment(Infofrom).format("DD-MM-YYYY")} </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Subtitle}>
                    <Text style={styles.toptext}>Health info to</Text>
                    <TouchableOpacity
                        style={{
                            color: "#08211c",
                            flex: 1,
                            flexDirection: 'row'
                        }}
                        onPress={() => setCalendarto(true)}
                    ><AntDesign name="calendar" size={32} color="black" />

                        <Text style={styles.toptext}> {moment(Infoto).format("DD-MM-YYYY")} </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Subtitle}>
                    <Text style={styles.toptext}>Consent Expiry</Text>
                    <TouchableOpacity
                        style={{
                            color: "#08211c",
                            flex: 1,
                            flexDirection: 'row'
                        }}
                        onPress={() => setCalendarExpiry(true)}
                    ><AntDesign name="calendar" size={32} color="black" />
                        <Text style={styles.toptext}> {moment(Expiry).format("DD-MM-YYYY")} </Text>


                    </TouchableOpacity>
                </View>
                <Text style={styles.toptext}>Health info Type</Text>
                <View style={styles.Subtitle}>
                    <CheckBox
                        value={OPCisSelected}
                        onValueChange={()=>setOPSelection(!OPCisSelected)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.toptext}>OP Consultation</Text>
                    <CheckBox
                        value={DiagisSelected}
                        onValueChange={()=>setDiagSelection(!DiagisSelected)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.toptext}>Diagnostic Reports</Text>

                </View>

                <View style={styles.Subtitle}>
                    <CheckBox
                        value={DisisSelected}
                        onValueChange={()=>setDisSelection(!DisisSelected)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.toptext}>Discharge Summary</Text>
                    <CheckBox
                        value={PresisSelected}
                        onValueChange={()=>setPresSelection(!PresisSelected)}
                        style={styles.checkbox}
                    />
                    <Text style={styles.toptext}>Prescription</Text>

                </View>
                <DateTimePickerModal
                    isVisible={Calendarfrom}
                    mode="date"
                    onConfirm={handleDatePickerfrom}
                    onCancel={() => setCalendarfrom(false)}
                />

                <DateTimePickerModal
                    isVisible={Calendarto}
                    mode="date"
                    onConfirm={handleDatePickerto}
                    onCancel={() => setCalendarto(false)}
                />
                <DateTimePickerModal
                    isVisible={CalendarExpiry}
                    mode="date"
                    onConfirm={handleDatePickerExpiry}
                    onCancel={() => setCalendarExpiry(false)}
                />


                <Button
                    style={styles.btn}
                    icon="content-save"
                    mode="contained"
                    theme={theme}
                    onPress={() => submitData()}
                >
                    Request Consent
        </Button>


            </ScrollView>

        </View>
    );
};

const theme = {
    colors: {
        primary: "#e01d5e",
    },
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Subtitle: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "grey",
        marginHorizontal: 22,
        borderRadius: 5,
        backgroundColor: "#f7f7f7",
    },
    checkbox: {
        alignSelf: "center",
    },
    toptext: {
        flex: 1,
        fontSize: 15,
        fontWeight: "600",
        marginVertical: 10,
        marginHorizontal: 10,
    },
    thumbnail: {
        aspectRatio: 1,
        width: 200,
        height: 200,
    },
    head: {
        backgroundColor: "#fff",
        flexDirection: "row",
        height: 50,
        width: "100%",
        alignItems: "center",
    },
    back: {
        padding: 10,
        color: "#e01d5e",
    },
    headtext: {
        color: "#e01d5e",
        fontSize: 21,
        fontWeight: "600",
        textAlign: "center",
        width: "80%",
    },

    formArea: {
        height: "100%",
    },
    root: {
        flex: 1,
    },
    inputStyle: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : -1,
        paddingLeft: 2,
        color: "#05375a",
        height: 38,
        elevation: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginBottom: 3,
        marginLeft: 20,
    
    },

    option: {
        marginTop: Platform.OS === "ios" ? 0 : -1,
        padding: 6,
        color: "#05375a",
        marginEnd: 300,
        elevation: 1,
        borderWidth: 1,
        borderColor: "lightgrey",
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "bold",
    },
    deptName: {
        color: "#05375a",
        fontSize: 16,
        fontWeight: "bold",
    },
    btn: {
        marginVertical: 5,
    },
    modalView: {
        position: "absolute",
        bottom: 2,
        width: "100%",
        backgroundColor: "white",
    },
    modalButtonView: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});

export default ConsentRequest;
