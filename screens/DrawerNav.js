import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { DrawerContent } from "./DrawerContent";

import MainTabScreen from "./MainTabScreen";
import SupportScreen from "./SupportScreen";
import Prescription from "./PrescriptionAdd";
import PrivacyPolicy from "./PrivacyScreens";
import DoctorSlot from "./DoctorSlots";
import EnxConferenceScreen from "./EnxConferenceScreen";
import ManageConsultation from "./ManageConsultation";
import ProfileUpdate from "./ProfileUpdate";
import ReportRepo from "./Reports";
import DoctorFees from "./DoctorFees";
import PrescriptionHistory from "./PrescriptionHistory";
import ConsentRequest from './ConsentRequest'

const Drawer = createDrawerNavigator();

const DrawerStackScreen = ({ }) => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
    <Drawer.Screen name="Contactus" component={SupportScreen} />
    <Drawer.Screen name="prescription" component={Prescription} />
    <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Drawer.Screen name="DoctorSlot" component={DoctorSlot} />
    <Drawer.Screen name="EnxConferenceScreen" component={EnxConferenceScreen} />
    <Drawer.Screen name="ManageConsultation" component={ManageConsultation} />
    <Drawer.Screen name="updateprofile" component={ProfileUpdate} />
    <Drawer.Screen name="DoctorFees" component={DoctorFees} />
    <Drawer.Screen name="ReportRepo" component={ReportRepo} />
    <Drawer.Screen name="PrescriptionHistory" component={PrescriptionHistory} />
    <Drawer.Screen name="ConsentRaise" component={ConsentRequest} />

  </Drawer.Navigator>
);

export default DrawerStackScreen;
