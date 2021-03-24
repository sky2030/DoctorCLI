import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Alert,
} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";


// import { Fontisto, FontAwesome5, Entypo } from "@expo/vector-icons";
import Banner from "../assets/Images/DashboardHead.jpg";

function DoctorHomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#d02860" barStyle="light-content" />
      <View style={styles.header}>
        <ImageBackground
          style={styles.imgBackground}
          source={Banner}
        ></ImageBackground>
      </View>

      <View style={styles.navigationcards}>
        <TouchableOpacity
          style={styles.NavigationCard}
          onPress={() => navigation.navigate("Appointment")}
        >
          <View style={{ flex: 1, marginLeft: 40 }}>
            <FontAwesome5 name="book-medical" size={40} color="#d02860" />
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.Cardtext}> Appointments </Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.NavigationCard}
              onPress={() => navigation.navigate("patienthistory")}>
                  <View style={{flex:1,marginLeft:40}}>
                  <Fontisto name="bed-patient" size={45} color="#d02860" />
                  </View>
                
                <View style={{flex:3}}>
                  <Text style={styles.Cardtext}>Patient History</Text></View>
                   
             </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.NavigationCard}
          onPress={() => navigation.navigate("Transaction")}
        >
          <View style={{ flex: 1, marginLeft: 40 }}>
            <FontAwesome5 name="money-check-alt" size={40} color="#d02860" />
          </View>

          <View style={{ flex: 3 }}>
            <Text style={styles.Cardtext}>Transaction</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.NavigationCard}
          onPress={() => navigation.navigate("DoctorSlot")}
        >
          <View style={{ flex: 1, marginLeft: 40 }}>
            <Entypo name="time-slot" size={40} color="#d02860" />
          </View>

          <View style={{ flex: 3 }}>
            <Text style={styles.Cardtext}>Manage Appointment</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DoctorHomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
  },
  navigationcards: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  NavigationCard: {
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "95%",
    height: 60,
    backgroundColor: "#d7faf1",
    marginTop: 10,
  },
  Cardtext: {
    color: "black",
    marginBottom: 5,
    fontSize: 22,
    fontWeight: "bold",
  },

  cardContent: {
    marginHorizontal: 15,
    marginVertical: 7,
  },
  img: {
    marginBottom: 10,
    marginTop: 10,
    padding: 15,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  imgBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    resizeMode: "cover",
  },
  header: {
    width: "100%",
    height: "100%",
    flex: 1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
  },
});
