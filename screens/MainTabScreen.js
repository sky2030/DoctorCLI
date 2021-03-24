import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
// import {
//   FontAwesome5,
//   Fontisto,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./DoctorHomePage";
import AppointmentScreen from "./DoctorAppointment";
import TransactionScreen from "./DoctorTransaction";
import DoctorProfile from "./ProfileDoctor";

const HomeStack = createStackNavigator();
const AppointmentStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const TransactionStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarColor: "#d02860",
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Appointment"
      component={AppointmentStackScreen}
      options={{
        tabBarLabel: "Appointments",
        tabBarColor: "#d02860",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="hospital-box" size={26} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Transaction"
      component={TransactionStackScreen}
      options={{
        tabBarLabel: "Transactions",
        tabBarColor: "#d02860",
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name="money-check" size={26} color={color} />

          //<Icon name="ios-calendar" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "My Account",
        tabBarColor: "#d02860",
        tabBarIcon: ({ color }) => (
          <Fontisto name="doctor" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 70,
      },
      headerTintColor: "#d02860",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Dashboard",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#d02860"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const AppointmentStackScreen = ({ navigation }) => (
  <AppointmentStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 70,
      },
      headerTintColor: "#d02860",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <AppointmentStack.Screen
      name="Appointment"
      component={AppointmentScreen}
      options={{
        title: "All Appointments",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#d02860"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </AppointmentStack.Navigator>
);
const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 70,
      },
      headerTintColor: "#d02860",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="Profile"
      component={DoctorProfile}
      options={{
        title: "Doctor Profile",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#d02860"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const TransactionStackScreen = ({ navigation }) => (
  <TransactionStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fff",
        height: 70,
      },
      headerTintColor: "#d02860",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <TransactionStack.Screen
      name="Transaction"
      component={TransactionScreen}
      options={{
        title: "All Transactions",
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#fff"
            color="#d02860"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </TransactionStack.Navigator>
);
