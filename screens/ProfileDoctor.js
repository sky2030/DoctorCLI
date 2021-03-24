import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import * as Animatable from 'react-native-animatable';
import profileNew from '../assets/Images/profileNew.png';
import FemaleDoctor from '../assets/Images/FemaleDoctor.png';

import MaleDoctor from '../assets/Images/MaleDoctor.png';

function ProfileDoctor({navigation}) {
  const [data, Setdata] = useState({});
  const [loading, setLoading] = useState(true);

  const GetProfile = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    //  console.log(userToken)
    fetch(BASE_URL, {
      method: 'GET',
      headers: {Authorization: userToken},
    })
      .then((res) => res.json())
      .then((results) => {
        if (results.code == 200) {
          Setdata(results.data);
          setLoading(false);
        } else {
          Alert.alert(Alert_Title, results.message);
        }
      })
      .catch((err) => {
        Alert.alert(Alert_Title, SOMETHING_WENT_WRONG);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetProfile();
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#d02860" barStyle="light-content" />
      <ScrollView>
        <View style={styles.HeadCard}>
          <Image
            source={
              data.picture
                ? {uri: data.picture}
                : data.gender === 'Female'
                ? FemaleDoctor
                : MaleDoctor
            }
            style={styles.img}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('updateprofile', {data})}
            style={{position: 'absolute', right: 15, top: 15}}>
            <Avatar.Icon theme={theme} size={30} icon="pencil-outline" />
          </TouchableOpacity>
          {data.name ? (
            <Text style={styles.headtext1}>Welcome Dr. {data.name} </Text>
          ) : null}

          <View style={styles.row1}>
            <FontAwesome5
              name="registered"
              size={20}
              color="#d02860"
              style={{marginLeft: 10}}
            />
            <Text style={styles.registration}>{data.registration_no}</Text>
            {data.experience ? (
              <Text style={styles.expstyle}> {data.experience} EXP.</Text>
            ) : null}
          </View>
        </View>

        <Animatable.View animation="fadeInUpBig">
          <View style={styles.DetailCard}>
            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Name</Text>
              </View>
              <Fontisto name="doctor" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>Dr. {data.name}</Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Gender</Text>
              </View>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={24}
                color="#d02860"
              />

              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.gender}</Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Reg. No</Text>
              </View>
              <FontAwesome5 name="registered" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.registration_no}</Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Department</Text>
              </View>
              <MaterialCommunityIcons
                name="google-circles-group"
                size={24}
                color="#d02860"
              />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.department}</Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Degree</Text>
              </View>
              <MaterialCommunityIcons
                name="certificate"
                size={24}
                color="#d02860"
              />

              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.degree}</Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Experience</Text>
              </View>
              <Fontisto name="doctor" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.experience}</Text>
              </View>
            </View>
            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Mobile No</Text>
              </View>

              <Entypo name="mobile" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.mobile}</Text>
              </View>
            </View>
            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Email</Text>
              </View>
              <MaterialIcons name="email" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.email}</Text>
              </View>
            </View>
            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Consultation Fees</Text>
              </View>
              <FontAwesome name="rupee" size={24} color="#d02860" />
              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}> {data.consultation_fee}</Text>
              </View>
            </View>

            <View style={styles.detailrows}>
              <View style={styles.bodytitle}>
                <Text style={styles.titlebody}>Designation</Text>
              </View>
              <MaterialCommunityIcons
                name="chair-rolling"
                size={24}
                color="#d02860"
              />

              <View style={styles.informationtext}>
                <Text style={styles.fetcheddata}>{data.designation}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{paddingVertical: 10}}
                activeOpacity={0.95}
                onPress={() => navigation.navigate('updateprofile', {data})}>
                <Text style={styles.bottomtext}>Update Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{paddingVertical: 10, marginLeft: 10}}
                activeOpacity={0.95}
                onPress={() => navigation.navigate('DoctorFees', {data})}>
                <Text style={styles.bottomtext}>Doctor Fees</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    </View>
  );
}

export default ProfileDoctor;

const theme = {
  colors: {
    primary: 'pink',
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  btn: {
    backgroundColor: '#58DCFC',
    padding: 20,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  head: {
    backgroundColor: '#58DCFC',
    padding: 20,
    height: 60,
    width: '100%',
  },
  footer: {
    backgroundColor: 'white',
    padding: 20,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  bottomtext: {
    // color: "#e01d5e",
    fontSize: 16,
    // backgroundColor: "#eee",
    backgroundColor: '#e01d5e',
    color: '#eee',
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: 15,
  },
  registration: {
    color: '#d02860',
    fontSize: 15,
    fontWeight: '500',
    flex: 2,
    marginLeft: 10,
  },
  expstyle: {
    color: '#d02860',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
    marginRight: 10,
  },
  headtext: {
    color: 'black',
    marginBottom: 10,
    fontSize: 30,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headtext1: {
    color: '#d02860',
    marginBottom: 10,
    fontSize: 22,
    fontWeight: '500',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginEnd: 15,
    marginTop: 15,
  },

  titlebody: {
    color: '#d02860',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
  },
  informationtext: {
    marginLeft: 10,
    flex: 2,
    justifyContent: 'center',
  },
  fetcheddata: {
    color: 'black',
    marginBottom: 5,
    fontSize: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  address: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  ExpText: {
    color: 'black',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#A67CC5',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingTop: 10,
  },

  DetailCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '95%',
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 20,
    paddingBottom: 10,
  },
  HeadCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#fff',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    margin: 10,
  },
  cardContent: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  input3: {
    marginBottom: 15,
    marginTop: 15,
  },
  img: {
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
  },

  detailrows: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 8,
    shadowOffset: {width: 3, height: 3},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 2,
    elevation: 0,
    width: '100%',
  },
  bodytitle: {
    flexDirection: 'row',
    width: 120,
    marginRight: 30,
    flex: 1,
  },
  addressText: {
    color: '#d02860',
    marginBottom: 5,
    fontSize: 16,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ExperienceCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
