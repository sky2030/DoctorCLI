import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Alert,
  PermissionsAndroid,
  ImageBackground,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {AuthContext} from './components/context';
import './Global';
import DrawerStackScreen from './screens/DrawerNav';
import RootStackScreen from './screens/RootStackScreen';
import Splash from './assets/Images/Splash.gif';
import doctorLogo from './assets/Images/doctorLogo.gif';
import launch_screen1 from './assets/Images/launch_screen1.jpg';

import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [showGif, setShowGif] = useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: (username, password) => {
        console.log('Login :', `${BASE_URL}login`);
        fetch(`${BASE_URL}login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            console.log('Login response ', data);
            if (data.code == 200) {
              await AsyncStorage.setItem('userToken', data.data.token);
              const userToken = AsyncStorage.getItem('userToken');
              dispatch({type: 'LOGIN', id: username, token: userToken});
            } else {
              // Alert.alert(Alert_Title, data.message)
              Alert.alert(Alert_Title, 'Invalid email or password');
            }
          })
          .catch((err) => {
            Alert.alert(Alert_Title, JSON.stringify(err));
          });
      },
      signOut: async () => {
        // setUserToken(null);
        //  setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: (username, password) => {
        // setIsLoading(false);
        fetch(`${BASE_URL}signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            console.log(data);
            try {
              await AsyncStorage.setItem('userToken', data.token);
            } catch (e) {
              console.log("Something went wrong with sky's Code", e);
              Alert.alert(Alert_Title, JSON.stringify(e));
            }
          });
        const userToken = AsyncStorage.getItem('userToken');
        dispatch({type: 'REGISTER', id: username, token: userToken});
      },
    }),
    [],
  );

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]).then((result) => {
        if (
          result['android.permission.CAMERA'] &&
          result['android.permission.RECORD_AUDIO'] === 'granted'
        ) {
          console.log('Permission granted');
        } else {
          Alert.alert(
            'Please Go into Settings and  Allow permissions to continue',
          );
        }
      });
    }
  };

  const CheckToken = () => {
    requestPermissions();
    setTimeout(async () => {
      setIsLoading(false);
      let checkToken;
      checkToken = null;
      try {
        checkToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: checkToken});
    }, 1000);
  };

  useEffect(() => {
    SplashScreen.hide();
    setShowGif(true);
    setTimeout(() => {
      setShowGif(false);
      CheckToken();
    }, 3000);
  }, []);

  if (showGif) {
    return (
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <Image
      //   source={Splash}
      //   resizeMode= {"contain"}
      //   style={{height : 300, width : 300}}
      //   />
      // </View>
      <ImageBackground
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
        source={launch_screen1}>
        <StatusBar
          translucent={true}
          backgroundColor="#070393"
          barStyle="light-content"
        />
        <Image
          source={doctorLogo}
          resizeMode={'contain'}
          style={{height: 300, width: 300}}
        />
      </ImageBackground>
    );
  }
  // if (loginState.isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       {/* <ActivityIndicator size="large" /> */}
  //       <Image
  //       source={Splash}
  //       resizeMode= {"contain"}
  //       style={{height : 300, width : 300}}
  //       />
  //     </View>
  //   );
  // }

  return (
    <AuthContext.Provider value={authContext}>
      {/* <Provider store={store}> */}
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <DrawerStackScreen />
        ) : (
          <RootStackScreen />
        )}
      </NavigationContainer>
      {/* </Provider> */}
    </AuthContext.Provider>
  );
}

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
