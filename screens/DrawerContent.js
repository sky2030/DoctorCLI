import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";

import profile from "../assets/Images/Avatar-icon.png";
import { Avatar, Title, Caption, Paragraph, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
// import {
//   Fontisto,
//   FontAwesome5,
//   MaterialCommunityIcons,
// } from "@expo/vector-icons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Ionicons from "react-native-vector-icons/Ionicons";

import AsyncStorage from "@react-native-community/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FemaleDoctor from '../assets/Images/FemaleDoctor.png'

import MaleDoctor from '../assets/Images/MaleDoctor.png'
import { AuthContext } from "../components/context";

export function DrawerContent(props) {
  const [data, Setdata] = useState({});
  const [loading, setLoading] = useState(true);

  const GetProfile = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    //  console.log(userToken)
    fetch(BASE_URL, {
      method: "GET",
      headers: { Authorization: userToken },
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
    //  console.log("New Data is going to show")
    //  console.log(data.email)
  };
  useEffect(() => {
    GetProfile();
  }, []);

  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image 
              // source={{ uri: data.picture }} 
              source={ data.picture ? { uri: data.picture  } :
          data.gender === 'Female' ? 
          FemaleDoctor : MaleDoctor }
              size={55} />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>
                  Dr. {data.name}
                </Title>
                <Caption style={styles.caption}>{data.registration_no}</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {" "}
                  {data.designation}
                </Paragraph>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {data.degree}
                </Paragraph>
                <Caption style={styles.caption}>Degree</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  {data.experience}
                </Paragraph>
                <Caption style={styles.caption}>Experience</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Dashboard"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Fontisto name="doctor" size={size} color={color} />
              )}
              label="My Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="hospital-box"
                  size={size}
                  color={color}
                />
              )}
              label="Appointments"
              onPress={() => {
                props.navigation.navigate("Appointment");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <FontAwesome5 name="money-check" size={size} color={color} />
              )}
              label="Transaction"
              onPress={() => {
                props.navigation.navigate("Transaction");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Ionicons name="settings-outline" color={color} size={size} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("Contactus");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 10,
    borderTopColor: "#f4f4f4",
    borderBottomWidth: 1,
    width: "100%",
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 10,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
