import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {TextInput, Button, Avatar} from 'react-native-paper';
import moment from 'moment-timezone';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import AppHeader from '../components/AppHeader';
const DeviceWidth = Dimensions.get('screen').width;
const ProfileUpdate = ({navigation, route}) => {
  //const [first_name,setName] = useState(getDetails("name"))
  const [first_name, setFirstName] = useState(route.params.data.first_name);
  const [last_name, setLastName] = useState(route.params.data.last_name);
  const [mobile, setMobile] = useState(route.params.data.mobile);
  const [email, setEmail] = useState(route.params.data.email);
  const [dob, setDOB] = useState(moment().format('ll'));
  const [experience, setExperience] = useState(route.params.data.experience);
  const [degree, setDegree] = useState(route.params.data.degree);
  const [designation, setDesignation] = useState(route.params.data.designation);
  const [specialities, setSpecialities] = useState(
    route.params.data.specialities,
  );
  const [picture, setPicture] = useState(route.params.data.picture);
  const [modal, setModal] = useState(false);
  const [isDatePickerAvailable, setDatePickerAvailable] = useState(false);

  const submitData = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    fetch(`${BASE_URL}${route.params.data.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      body: JSON.stringify({
        first_name,
        last_name,
        mobile,
        email,
        dob,
        picture,
        experience,
        degree,
        designation,
        specialities,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data msg :', data.message);
        Alert.alert(Alert_Title, data.message);
        navigation.goBack();
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  const updateDOB = async (sdate) => {
    setDOB(moment(sdate).startOf('day').format('ll'));
  };
  const handleDatePicker = (date) => {
    setDOB(moment(date).format('DD/MM/YYYY'));
    //updateDOB(date);
    setDatePickerAvailable(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // updateDOB(new Date());
      setFirstName(route.params.data.first_name);
      setLastName(route.params.data.last_name);
      setMobile(route.params.data.mobile);
      setEmail(route.params.data.email);
      setDOB(route.params.data.dob);
      setExperience(route.params.data.experience);
      setDegree(route.params.data.degree);
      setDesignation(route.params.data.designation);
      setSpecialities(route.params.data.specialities);
      setPicture(route.params.data.picture);
      // console.log(route.params)
    });

    return unsubscribe;
  }, [route.params.data]);

  const pickFromGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log(image);
      setPicture(`data:image/jpeg;base64,${image.data}`);
    });
  };
  const pickFromCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log(image);
      setPicture(`data:image/jpeg;base64,${image.data}`);
    });
  };

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
      <AppHeader
        title={'Update Profile'}
        leftIconOnPress={() => navigation.goBack()}
      />
      {/* <Text style={{fontSize:18}}> {HospitalCode.hospitalcode} </Text> */}

      <ScrollView style={styles.formArea}>
        <View style={{flex: 0.6, alignItems: 'center'}}>
          <Image source={{uri: picture}} style={styles.thumbnail} />
          <TouchableOpacity
            onPress={() => setModal(true)}
            style={{
              position: 'absolute',
              bottom: 0,
              right: DeviceWidth / 2 - 80,
            }}>
            <Avatar.Icon theme={theme} size={30} icon="pencil-outline" />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerAvailable}
          mode="date"
          onConfirm={handleDatePicker}
          onCancel={() => setDatePickerAvailable(false)}
        />
        <TextInput
          label="First Name"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={first_name}
          // onFocus={()=>setenableShift(false)}
          theme={theme}
          onChangeText={(text) => setFirstName(text)}
          left={
            <TextInput.Icon
              name={() => <Feather name={'user'} size={20} color={'#e01d5e'} />}
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
          onChangeText={(text) => setLastName(text)}
          left={
            <TextInput.Icon
              name={() => (
                <FontAwesome5 name={'signature'} size={20} color={'#e01d5e'} />
              )}
            />
          }
        />
        <TextInput
          label="Email"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={email}
          theme={theme}
          // onFocus={()=>setenableShift(false)}
          onChangeText={(text) => setEmail(text)}
          left={
            <TextInput.Icon
              name={() => <Feather name={'mail'} size={20} color={'#e01d5e'} />}
            />
          }
        />
        <TextInput
          label="Phone"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={mobile}
          theme={theme}
          //onFocus={()=>setenableShift(false)}
          keyboardType="number-pad"
          onChangeText={(text) => setMobile(text)}
          left={
            <TextInput.Icon
              name={() => (
                <Feather name={'phone'} size={20} color={'#e01d5e'} />
              )}
            />
          }
        />

        <TouchableOpacity
          style={styles.Subtitle}
          onPress={() => setDatePickerAvailable(true)}>
          <AntDesign name="calendar" size={20} color="#e01d5e" />
          <Text style={styles.toptext}> Date of Birth : {dob}</Text>
        </TouchableOpacity>

        <TextInput
          label="Experience"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={experience}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          onChangeText={(text) => setExperience(text)}
          left={
            <TextInput.Icon
              name={() => (
                <MaterialIcons name={'explicit'} size={20} color={'#e01d5e'} />
              )}
            />
          }
        />

        <TextInput
          label="Degree"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={degree}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          onChangeText={(text) => setDegree(text)}
          left={
            <TextInput.Icon
              name={() => (
                <MaterialIcons
                  name={'cast-for-education'}
                  size={20}
                  color={'#e01d5e'}
                />
              )}
            />
          }
        />
        <TextInput
          label="Designation"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={designation}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          onChangeText={(text) => setDesignation(text)}
          left={
            <TextInput.Icon
              name={() => (
                <Fontisto name={'disqus'} size={20} color={'#e01d5e'} />
              )}
            />
          }
        />

        <TextInput
          label="Specialities"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={specialities}
          theme={theme}
          // onFocus={()=>setenableShift(true)}
          onChangeText={(text) => setSpecialities(text)}
          left={
            <TextInput.Icon
              name={() => (
                <Fontisto name={'stethoscope'} size={20} color={'#e01d5e'} />
              )}
            />
          }
        />
        {/* <Button
          style={styles.btn}
          icon={picture == '' ? 'upload' : 'check'}
          mode="contained"
          theme={theme}
          onPress={() => setModal(true)}>
          Upload Image
        </Button> */}

        <Button
          style={{...styles.btn, marginBottom: 30}}
          icon="content-save"
          mode="contained"
          theme={theme}
          onPress={() => submitData()}>
          save
        </Button>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              theme={theme}
              mode="contained"
              onPress={() => pickFromCamera()}>
              camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              theme={theme}
              onPress={() => pickFromGallery()}>
              gallery
            </Button>
          </View>
          <Button theme={theme} onPress={() => setModal(false)}>
            cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const theme = {
  colors: {
    primary: '#e01d5e',
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Subtitle: {
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 10,
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toptext: {
    fontSize: 16,
    marginLeft: 10,
    marginVertical: 10,
  },
  thumbnail: {
    aspectRatio: 1,
    width: 150,
    height: 150,
    borderRadius: 80,
  },
  formArea: {
    // height: '100%',
    padding: 20,
  },
  root: {
    flex: 1,
  },
  inputStyle: {
    backgroundColor: 'transparent',
  },

  option: {
    marginTop: Platform.OS === 'ios' ? 0 : -1,
    padding: 6,
    color: '#05375a',
    marginEnd: 300,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  deptName: {
    color: '#05375a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btn: {
    marginVertical: 20,
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: 'white',
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default ProfileUpdate;
