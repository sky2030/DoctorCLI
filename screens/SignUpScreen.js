import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Dimensions,
  Linking,
  FlatList,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Foundation from "react-native-vector-icons/Foundation";


import {
  TextInput,
  Button,
  Paragraph,
  Dialog,
  Searchbar,
} from "react-native-paper";
const deviceHeight = Dimensions.get("screen").height;
const deviceWidth = Dimensions.get("screen").width;
let NA = "N/A";

const SignUpScreen = ({ navigation }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [registration_no, setRegistration] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [check_mobile, setcheck_mobile] = useState(false);
  const [isValidMobile, setValidmobile] = useState(true);
  const [check_email, setcheck_email] = useState(false);
  const [isValidEmail, setisValidEmail] = useState(true);
  const [isValidPassword, setisValidPassword] = useState(true);
  const [hospitalCode, setHospitalCode] = useState(null);
  const [departmentCode, setDepartmentCode] = useState(null);
  const [hospitalList, setHospitalList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [searchHospitalQuery, setSearchHospitalQuery] = useState("");
  const [searchDepartmentQuery, setSearchDepartmentQuery] = useState("");
  const [showGenderDialogue, setshowGenderDialogue] = useState(false);
  const [showHospitalDialogue, setshowHospitalDialogue] = useState(false);
  const [showDepartmentDialogue, setshowDepartMentDialogue] = useState(false);
  

  const showGenderDialog = () => setshowGenderDialogue(true);
  const hideGenderDialog = () => setshowGenderDialogue(false);
  const showHospitalDialog = () => setshowHospitalDialogue(true);
  const hideHospitalDialog = () => setshowHospitalDialogue(false);
  const showDepartmentDialog = () => setshowDepartMentDialogue(true);
  const hideDepartmentDialog = () => setshowDepartMentDialogue(false);


  const onChangeSearchHospital = (query) => {
    setSearchHospitalQuery(query)
  };
  const onChangeSearchDepartment = (query) => {
    setSearchDepartmentQuery(query)
  };
  
  const _renderGenderListItem = ({item}) => {
    return <TouchableOpacity style={{height : 40, justifyContent : "center",}}
    onPress={()=>{
      setGender(item)
      setshowGenderDialogue(false)
    }}
    >
      <Text style={{fontSize : 18, color: item == gender ?  "#d02860" : "black"}}>{item}</Text></TouchableOpacity>
  }
  const _renderHospitalListItem = ({item}) => {
    return <TouchableOpacity style={{height : 40, justifyContent : "center"}}
    onPress={()=>{
      setHospitalCode(item)
      setshowHospitalDialogue(false)
      getDepartmentList(item.value)
    }}
    >
      <Text style={{fontSize : 18, color: item?.label == hospitalCode?.label  ?  "#d02860" : "black"}}>
        {item?.label}</Text></TouchableOpacity>
  }
  const _renderDepartmentListItem = ({item}) => {
    return <TouchableOpacity style={{height : 40, justifyContent : "center"}}
    onPress={()=>{
      setDepartmentCode(item)
      setshowDepartMentDialogue(false)
    }}
    >
       <Text style={{fontSize : 18, color: item?.label == departmentCode?.label  ?  "#d02860" : "black"}}>
        {item?.label}</Text></TouchableOpacity>
  }
  const separator = () => {
   return <View style={{height :0.8, backgroundColor : "#d02860"}}></View>
  }

  useEffect(() => {
    getHospitalList();
  }, []);

  const getHospitalList = () => {
    fetch(`${BASE_URL}list-hospitals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          console.log(data, "data=======")
          let tempArray = data.data.map((item) => {
            return {
              label: item.hospitalname,
              value: item.hospitalcode,
            };
          });
          setHospitalList(tempArray);
        }
      })
      .catch((e) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const getDepartmentList = (key) => {
    fetch(`${BASE_URL}list-departments/${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          let tempArray = data.data.map((item) => {
            return {
              label: item.departmentname,
              value: item.deptcode,
            };
          });
          setDepartmentList(tempArray);
        }
      })
      .catch((e) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const updateSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const validateEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      return false;
    } else {
      console.log("Email is Correct");
      return true;
    }
  };
  const textInputChange = (val) => {
    if (val.trim().length == 10) {
      setMobile(val);
      setcheck_mobile(true);
      setValidmobile(true);
    } else {
      setMobile(val);
      setcheck_mobile(false);
      setValidmobile(false);
    }
  };
  // const handleValidUser = (val) => {
  //   if (val.trim().length >= 4) {
  //     setValidmobile(true)
  //   } else {
  //     setValidmobile(false)
  //   }
  // };
  const EmailInputChange = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(val) === false) {
      setEmail(val);
      setcheck_email(false);
      setisValidEmail(false);

      return false;
    } else {
      setEmail(val);
      setcheck_email(true);
      setisValidEmail(true);
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 6) {
      setisValidPassword(true);
      setPassword(val);
    } else {
      setPassword(val);
      setisValidPassword(false);
    }
  };

  const SignUpHandle = () => {
    if (first_name.length == 0 || last_name.length == 0) {
      Alert.alert(
        Alert_Title,
        "FirstName or LastName field can not be empty.",
        [{ text: "Okay" }]
      );
      return;
    }
    if (gender.length == 0) {
      Alert.alert(Alert_Title, "Select Gender properly", [{ text: "Okay" }]);
      return;
    }
    if (mobile.length != 10) {
      Alert.alert(Alert_Title, "Enter valid mobile number", [{ text: "Okay" }]);
      return;
    }

    if (validateEmail(email) == false) {
      Alert.alert(Alert_Title, "Enter valid Email ID", [{ text: "Okay" }]);
      return;
    }
    if (password.length <= 6) {
      Alert.alert(Alert_Title, "Enter password more then equal 6 digit", [
        { text: "Okay" },
      ]);
      return;
    }
    if (registration_no.length < 4) {
      Alert.alert(Alert_Title, "Enter valid Registration No.", [
        { text: "Okay" },
      ]);
      return;
    }
    let payload = {
      first_name,
      last_name,
      mobile,
      password,
      email,
      gender,
      registration_no,
      hospitalcode: hospitalCode?.value,
      deptcode: departmentCode?.value,
    };
    console.log("payload :", payload);
    fetch(`${BASE_URL}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data));
        Alert.alert(Alert_Title, data.message);
        if (data.code == 200) {
          navigation.navigate("SignInScreen");
        }
      })
      .catch((e) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#d02860" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now! As a Doctor</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView
          style={styles.formArea}
          showsVerticalScrollIndicator={false}
        >
          <TextInput
            label="First Name"
            placeholderTextColor="#666666"
            style={styles.inputStyle}
            value={first_name}
            // onFocus={()=>setenableShift(false)}
            theme={theme}
            // // mode="outlined"
            onChangeText={(text) => setFirstName(text)}
            left={
              <TextInput.Icon
                name={() => <FontAwesome name={'user-md'} size={20} color={'#d02860'} />}
              />
            }
          />
          <TextInput
            label="Last Name"
            placeholderTextColor="#666666"
            style={styles.inputStyle}
            value={last_name}
            // onFocus={()=>setenableShift(false)}
            theme={theme}
            // mode="outlined"
            onChangeText={(text) => setLastName(text)}
            left={
              <TextInput.Icon
                name={() => <FontAwesome5 name={'signature'} size={20} color={'#d02860'} />}
              />
            }
          />
            <TextInput
              label="Email"
              placeholderTextColor="#666666"
              style={styles.inputStyle }
              value={email}
              theme={theme}
              keyboardType={'email-address'}
              // onFocus={()=>setenableShift(false)}
              // mode="outlined"
              onChangeText={(val) => EmailInputChange(val)}
              //onChangeText={(text) => setEmail(text)}
              left={
                <TextInput.Icon
                  name={() => <Feather name={'mail'} size={20} color={'#d02860'} />}
                />
              }
              right={
                check_email ? (
                  <TextInput.Icon
                    name={() => (
                      <Feather name={'check-circle'} size={20} color={'#d02860'} />
                    )}
                  />
                ) : null
              }
            />
          {isValidEmail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>Enter Valid email Address</Text>
            </Animatable.View>
          )}
            <TextInput
              label="Password"
              placeholderTextColor="#666666"
              style={styles.inputStyle }
              value={password}
              theme={theme}
              // mode="outlined"
              secureTextEntry={secureTextEntry ? true : false}
              onChangeText={(val) => handlePasswordChange(val)}
              // onChangeText={(text) => setPassword(text)}
              left={
                <TextInput.Icon
                  name={() => <Feather name={'lock'} size={20} color={'#d02860'} />}
                />
              }
              right={
                <TextInput.Icon
                  name={() => (
                    <Feather
                      name={secureTextEntry ? 'eye-off' : 'eye'}
                      size={20}
                      color={'#d02860'}
                      onPress={updateSecureTextEntry}
                    />
                  )}
                />
              }
            />

          {isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}
            <TextInput
              label="Mobile"
              placeholderTextColor="#666666"
              style={styles.inputStyle}
              value={mobile}
              theme={theme}
              //onFocus={()=>setenableShift(false)}
              keyboardType="number-pad"
              // mode="outlined"
              onChangeText={(val) => textInputChange(val)}

              // onChangeText={(text) => setMobile(text)}
              left={
                <TextInput.Icon
                  name={() => <FontAwesome name={'mobile'} size={25} color={'#d02860'} />}
                />
              }
              right={
                check_mobile ? (
                  <TextInput.Icon
                    name={() => (
                      <Feather name={'check-circle'} size={20} color={'#d02860'} />
                    )}
                  />
                ) : null
              }
            />
          {isValidMobile ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Mobile number must be 10 characters long.
              </Text>
            </Animatable.View>
          )}

          <TextInput
            label="Registration No"
            placeholderTextColor="#666666"
            style={styles.inputStyle}
            value={registration_no}
            theme={theme}
            // onFocus={()=>setenableShift(true)}
            // mode="outlined"
            onChangeText={(text) => setRegistration(text)}
            left={
              <TextInput.Icon
                name={() => <FontAwesome name={'registered'} size={20} color={'#d02860'} />}
              />
            }
          />
          <TouchableOpacity style={styles.hwInput} onPress={showGenderDialog}>
            <View style={styles.selectView}>
              <Foundation name={'male-female'} size={20} color={'#d02860'} style={{marginHorizontal : 8}}/>
              <Text style={gender == '' ?styles.text : styles.textSelected}>{gender == '' ? 'Select gender' : gender}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hwInput} onPress={showHospitalDialog}>
            <View style={styles.selectView}>
              <FontAwesome5 name={'hospital-alt'} size={20} color={'#d02860'} style={{marginHorizontal : 8}}/>
              <Text style={hospitalCode?styles.textSelected : styles.text}>{hospitalCode  ? hospitalCode.label  : 'Select hospital' }</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hwInput} onPress={showDepartmentDialog}>
   
            <View style={styles.selectView}>
              <FontAwesome5 name={'stethoscope'} size={20} color={'#d02860'} style={{marginHorizontal : 8}}/>
              <Text style={departmentCode ? styles.textSelected : styles.text}>{departmentCode  ? departmentCode.label  : 'Select department' }</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text
              onPress={() => {
                Linking.openURL(
                  "https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html"
                );
              }}
              style={[styles.color_textPrivate, { fontWeight: "bold" }]}
            >
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text
              onPress={() => {
                Linking.openURL(
                  "https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html"
                );
              }}
              style={[styles.color_textPrivate, { fontWeight: "bold" }]}
            >
              {" "}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={[
                styles.signIn,
                {
                  borderColor: "#d02860",
                  backgroundColor: "#d02860",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
              onPress={() => {
                SignUpHandle();
              }}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
            <Text style={{marginTop :10}}><Text>Already have an account</Text>
            <Text style={styles.signInText} onPress={() => navigation.goBack()}> Sign In</Text>
            </Text>
            {/* <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                {
                  borderColor: "#d02860",
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#d02860",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </Animatable.View>
      {/* Gender dialogue */}
      <Dialog visible={showGenderDialogue} onDismiss={hideGenderDialog} style={{}}>
        <Dialog.Title>Gender</Dialog.Title>
        <Dialog.Content>
          <FlatList
          data={["Male", 'Female']}
          renderItem={_renderGenderListItem}
          ItemSeparatorComponent={separator}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideGenderDialog}>
            <Text style={{color : "#d02860"}}>Done</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
      {/* Hospital dialogue */}
      <Dialog visible={showHospitalDialogue} onDismiss={hideHospitalDialog} style={{ marginVertical : deviceHeight/5}}>
        <Dialog.Title>Hospital</Dialog.Title>
        <Dialog.Content>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearchHospital}
            value={searchHospitalQuery}
            style={{marginBottom : 10}}
          />
          <FlatList
          style={{height :deviceHeight/2}}
          data={hospitalList.filter((item)=>
            {
              if((item.label.toLowerCase()).includes(searchHospitalQuery.toLowerCase())){
                return item
              }
            })
          }
          renderItem={_renderHospitalListItem}
          ItemSeparatorComponent={separator}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideHospitalDialog}>
            <Text style={{color : "#d02860"}}>Done</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
{/* Department dialogue */}
<Dialog visible={showDepartmentDialogue} onDismiss={hideDepartmentDialog} style={{ marginVertical : deviceHeight/5}}>
        <Dialog.Title>Department</Dialog.Title>
        <Dialog.Content style={{overflow : "hidden"}}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearchDepartment}
            value={searchDepartmentQuery}
            style={{marginBottom : 10}}
          />
          <FlatList
          style={{height :deviceHeight/2}}
          data={departmentList.filter((item)=>
            {
              if((item.label.toLowerCase()).includes(searchDepartmentQuery.toLowerCase())){
                return item
              }
            })}
          renderItem={_renderDepartmentListItem}
          ItemSeparatorComponent={separator}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDepartmentDialog}>
            <Text style={{color : "#d02860"}}>Done</Text>
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
};

export default SignUpScreen;

const theme = {
  colors: {
    primary: "#d02860",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d02860",
  },
  signInText:{
    color: '#d02860',
    fontSize :17
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text:{fontSize :16, color: "grey"},
  textSelected:{fontSize :16, color: "black"},

  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 20,
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
    left: 25,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
  inputStyle: {
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent',
  },
  hwInput: {

    borderBottomColor: "grey",

    marginVertical: 7,

    borderBottomWidth :0.8,

    height : 50
  },
  selectView :{backgroundColor : "#fff", height :40, width : "100%", 
  paddingHorizontal : 10, flexDirection : "row", alignItems  :"center"
  }
});
