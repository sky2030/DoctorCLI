import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  // TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Keyboard,
  Linking,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../components/context';
import {TextInput} from 'react-native-paper';
const SignInScreen = ({navigation}) => {
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {signIn} = useContext(AuthContext);

  const textInputChange = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (val.trim().length >= 4) {
    if (reg.test(val)) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 5) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = (username, password) => {
    // const foundUser = Users.filter( item => {
    //     return userName == item.username && password == item.password;
    // } );
    Keyboard.dismiss();
    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        Alert_Title,
        'Wrong Input! Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    // if ( foundUser.length == 0 ) {
    //      Alert.alert(Alert_Title,'Invalid User!', 'Username or password is incorrect.', [
    //         {text: 'Okay'}
    //     ]);
    //     return;
    // }
    signIn(username, password);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#d02860" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>WELCOME TO VRCure! </Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <TextInput
          style={styles.textInput}
          theme={theme}
          label="Your Email address"
          left={
            <TextInput.Icon
              name={() => <Feather name={'mail'} size={20} color={'#d02860'} />}
            />
          }
          right={
            data.check_textInputChange ? (
              <TextInput.Icon
                name={() => (
                  <Feather name={'check-circle'} size={20} color={'#d02860'} />
                )}
              />
            ) : null
          }
          autoCapitalize="none"
          keyboardType={'email-address'}
          onChangeText={(val) => textInputChange(val)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              please enter a valid Email address
            </Text>
          </Animatable.View>
        )}
        <TextInput
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
          theme={theme}
          label="Your Password"
          left={
            <TextInput.Icon
              name={() => <Feather name={'lock'} size={20} color={'#d02860'} />}
            />
          }
          right={
            <TextInput.Icon
              name={() => (
                <Feather
                  name={data.secureTextEntry ? 'eye-off' : 'eye'}
                  size={20}
                  color={'#d02860'}
                  onPress={updateSecureTextEntry}
                />
              )}
            />
          }
          autoCapitalize="none"
        />
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

        {/* <TouchableOpacity>
          <Text style={{ color: "#d02860", marginTop: 15 }}>
            Forgot password?
          </Text>
        </TouchableOpacity> */}
        <View style={styles.button}>
          <TouchableOpacity
            style={[
              styles.signIn,
              {
                borderColor: '#d02860',
                backgroundColor: '#d02860',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
            onPress={() => {
              loginHandle(data.username, data.password);
            }}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#fff',
                },
              ]}>
              Sign In
            </Text>
          </TouchableOpacity>
          <Text style={{marginTop :10}}><Text>Don't have an account</Text>
            <Text style={styles.signUpText} onPress={() =>navigation.navigate("SignUpScreen")}> Sign Up</Text>
            </Text>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              {
                borderColor: '#d02860',
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: '#d02860',
                },
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity> */}
        </View>
        {/* <TouchableOpacity activeOpacity={0.95}
             onPress={() => 
            //  navigation.navigate("PrivacyPolicy")
             Linking.openURL('https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html')
             } style={styles.privacyfooter}>
              <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
             </TouchableOpacity> */}
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;
const theme = {
  colors: {
    primary: '#d02860',
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d02860',
  },
  signUpText:{
    color: '#d02860',
    fontSize :17
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  privacyfooter: {
    backgroundColor: 'white',
    padding: 20,
    height: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
    // position : "absolute",
    // bottom : 0
  },
  bottomtext: {
    color: '#e01d5e',
    fontSize: 15,
    fontWeight: 'bold',
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    // flex: 1,
    // marginTop: Platform.OS === "ios" ? 0 : -12,
    // paddingLeft: 10,
    // color: "#05375a",
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
    flexDirection: 'column',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
