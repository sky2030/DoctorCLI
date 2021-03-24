import * as React from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    FlatList, Dimensions, Alert,
Linking  } from 'react-native';
    import moment from "moment-timezone"
    import {Collapse,CollapseHeader, CollapseBody,} from 'accordion-collapse-react-native';
    // import {FontAwesome5} from '@expo/vector-icons'
    import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

    
    const screenWidth = Math.round(Dimensions.get('window').width);

    function DoctorAppointment({navigation}) {  
       return (
     
         <View style={styles.container}>
         <StatusBar backgroundColor='#d02860' barStyle="light-content"/>     
            <ScrollView>
            <View style={styles.Subtitle}>
            <Text style={styles.toptext}>Your have Recent Appointments</Text>
            </View>
            
                <Collapse>
                    <CollapseHeader>
                    <View style={styles.AppointmentCard}>
             
                        <View style={styles.header}>
                        <Text style={styles.Cardheadtext}>20/08/2020 (10 AM to 10.30AM) </Text>
                        </View>
                        <View style={styles.Cardbody}>
                            <View style={styles.PatientText}>
                            <Text style={styles.Patienthead}>Patient</Text>
                            <Text style={styles.Patientbodytext}>Ghosh Kumar </Text>
                            
                            </View>
                            
                            <View style={styles.buttonheader}>
                                <TouchableOpacity activeOpacity={0.95} style={styles.btn} >
                                    <Text style={styles.btntext}>Reports</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.95} style={styles.btn}
                                onPress={() => navigation.navigate("prescription")} >
                                    <Text style={styles.btntext}>Prescription</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                            
              </View>
                    </CollapseHeader>
                    <CollapseBody>

                    <TouchableOpacity activeOpacity={0.95}   style={styles.collapsecard}>
                             
                        <Text style={styles.Actionable}>START CONSULTATION</Text>
                        <FontAwesome5 name="video" size={24} color="black" />
                           
                            </TouchableOpacity>
                 
               

                    </CollapseBody>
                </Collapse>

               

             </ScrollView>
             <TouchableOpacity activeOpacity={0.95}
             onPress={() => 
            //  navigation.navigate("PrivacyPolicy")
             Linking.openURL('https://vrcure.blogspot.com/2020/10/vrcure-privacy-policy.html')
             } style={styles.footer}>
              <Text style={styles.bottomtext}>Privacy Policy | Terms of use</Text>
             </TouchableOpacity>
         </View>
       );
     }

     export default DoctorAppointment;
     
     const styles= StyleSheet.create({
         container: {
             flex: 1,
             width: "100%",
             backgroundColor:"white",
           },
           
           footer:{
            backgroundColor:"white",
            padding:20,
            height: 40,
            width: "100%",
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 2
        },
        bottomtext:{
         color:'#e01d5e',
         fontSize: 15,
         fontWeight:'bold'
     },
           
           Cardheadtext:{
            color:'white',
            fontSize: 15,
            fontWeight: 'bold'
        },
        btntext:{
            color:'white',
            fontSize: 15,
            marginLeft:5
        },
        Patientbodytext:{
            color:'darkred',
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom:2,
            marginTop:4,
         

        },
        Patienthead:{
            color:'black',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom:2,
            marginTop:4,
           
        },
       
       
        header:{
            color:'white',
            backgroundColor:"#3B565B",
            fontSize: 15,
            fontWeight: 'bold',
            alignItems:"center",
            justifyContent:"center",
            width:'100%',
            height:35,
            marginTop:10,
           

        },
           
           AppointmentCard: {
            borderRadius: 4,
            elevation: 3,
            backgroundColor: '#D7F4DC',
            shadowOffset: { width: 1, height: 1 },
            shadowColor: '#333',
            shadowOpacity: 0.5,
            shadowRadius: 2,
            marginHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth:3,
            borderColor:"#078191",
            height:85,
            width:"95%",
            marginTop:30,
            paddingBottom:20,
           
          },
          collapsecard: {
              flexDirection:'row',
            borderRadius: 1,
            elevation: 3,
            backgroundColor: '#ccccff',
            shadowOffset: { width: 1, height: 1 },
            shadowColor: '#333',
            shadowOpacity: 0.3,
            shadowRadius: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth:3,
            borderColor:"#078191",
            width:"80%",
            height:50,
            marginBottom:20,
            marginLeft:40,
            paddingTop:5
          },
    
        Subtitle:{
            alignContent:"center",
            justifyContent:"center",
            fontSize:15,
            fontWeight:"bold",
            marginLeft:25
        },
        toptext:{
            marginBottom: 15,
            marginTop: 15,
            alignContent:"center",
            justifyContent:"center",
            fontSize:18,
            fontWeight:"bold"
        },
        
        Cardbody:{
            alignItems:"flex-start",
            justifyContent:"flex-start",
            flexDirection:"row",
    
        },
        buttonheader:{
            alignItems:"flex-start",
            justifyContent:"flex-start",
            flexDirection:"row",
            
        },
        title5:{
            alignItems:"flex-start",
            justifyContent:"flex-start",
            marginLeft:25,
            marginRight:10,
            flexDirection:"column",
            marginLeft:70,
            marginBottom:20
        },
       
        PatientText:{
            alignItems:"flex-start",
            justifyContent:"flex-start",
            marginRight:60,
            flexDirection:"column",
            marginBottom:10,
            paddingLeft:10
            
        },
        btn:{
            width: 100,
            backgroundColor:'#078191',
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            elevation:3,
            marginLeft:10,
            marginRight:10,
            padding:5
        },
        
        Actionable:{
            fontSize:20,
            fontWeight:'bold',
            marginEnd:10
            
        },
        
        
     })
     


