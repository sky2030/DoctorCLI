import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import AppHeader from '../components/AppHeader';

const AddFees = ({navigation, route}) => {
  console.log(route.params.data, 'route.params.data');
  const [id, setdoctorId] = useState(route.params._id);
  const [doctorName, setdoctorName] = useState(route.params.first_name);
  const [consultation, setConsultation] = useState('');
  const [ewsfee, setEwsFees] = useState('');
  const [followupfee, setfollowupfees] = useState('');
  const [followupdays, setFollowupday] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setdoctorName(route.params.data.first_name);
      setdoctorId(route.params.data.id);
      setConsultation(route.params.data.consultation_fee);
      setEwsFees(route.params.data.ews_fee);
      setfollowupfees(route.params.data.followupfee);
      setFollowupday(route.params.data.followupdays);
    });
    return unsubscribe;
  }, [route.params]);

  const updateDetails = async () => {
    Keyboard.dismiss();
    const userToken = await AsyncStorage.getItem('userToken');
    fetch(`${BASE_URL}fees`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
      body: JSON.stringify({
        consultation,
        ewsfee,
        followupfee,
        followupdays,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(` ${doctorName} is updated successfully`);
        navigation.navigate('Profile');
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title={'Update Fee'}
        leftIconOnPress={() => navigation.goBack()}
      />
      <Text style={styles.Title}>Dr. {route.params.data.name}</Text>
      <ScrollView style={styles.formArea}>
        <TextInput
          keyboardType="numeric"
          label="Consultation Fee"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={consultation}
          theme={theme}
          onChangeText={(text) => setConsultation(text)}
          left={
            <TextInput.Icon
              name={() => (
                <FontAwesome name={'rupee'} size={20} color={'#e01d5e'} />
              )}
            />
          }
        />

        <TextInput
          keyboardType="numeric"
          label="EWS Fees"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={ewsfee}
          theme={theme}
          onChangeText={(text) => setEwsFees(text)}
          left={
            <TextInput.Icon
              name={() => (
                <FontAwesome name={'rupee'} size={20} color={'#e01d5e'} />
              )}
            />
          }
        />

        <TextInput
          keyboardType="numeric"
          label="Follow Up Day"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={followupdays}
          theme={theme}
          onChangeText={(text) => setFollowupday(text)}
          left={
            <TextInput.Icon
              name={() => (
                <MaterialIcons
                  name={'linear-scale'}
                  size={20}
                  color={'#e01d5e'}
                />
              )}
            />
          }
        />

        <TextInput
          keyboardType="numeric"
          label="Followup Fees"
          placeholderTextColor="#666666"
          style={styles.inputStyle}
          value={followupfee}
          theme={theme}
          onChangeText={(text) => setfollowupfees(text)}
          left={
            <TextInput.Icon
              name={() => (
                <FontAwesome name={'rupee'} size={20} color={'#e01d5e'} />
              )}
            />
          }
        />
        <Button
          style={styles.btn}
          icon="content-save"
          mode="contained"
          theme={theme}
          onPress={() => updateDetails()}>
          Save
        </Button>
        {/* <Button
                    style={styles.cancelbtn}
                    icon="content-save"
                    mode="contained"
                    theme={theme}
                //onPress={() => navigation.goBack()}
                >
                    Cancel
        </Button> */}
      </ScrollView>
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
    backgroundColor: '#fff',
  },
  timer: {
    marginLeft: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  timetext: {
    fontSize: 20,
    marginRight: 20,
    fontWeight: 'bold',
  },
  Title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#d02860',
    textAlign: 'center',
    marginVertical: 10,
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
    marginEnd: 65,
    elevation: 2,
    borderRadius: 5,
    borderColor: 'black',
    marginBottom: 5,
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    backgroundColor: 'lightgrey',
    fontSize: 18,
    fontWeight: 'bold',
  },
  btn: {
    marginVertical: 20,
  },
  cancelbtn: {
    marginHorizontal: 10,
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

export default AddFees;
