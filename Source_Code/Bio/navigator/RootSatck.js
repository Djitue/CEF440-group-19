import { View, Text, Settings } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import colors from "../components/colors";

import AdminDashboard from "../components/admin/AdminDashboard";
import Reg_fingerPrint from "../components/admin/Reg_fingerPrint";
import Registration_list from "../components/admin/Registration_list";
import StudentMgmt from "../components/admin/StudentMgmt";
import Student_Registration from "../components/admin/Student_Registration";
import WelcomePage from "../screen/WelcomePage";
import Login from "../screen/Login";
import SignUp from "../screen/SignUp";
import Setting from "../components/admin/Setting";
import Lect_fingerprint from "../components/admin/manage_lecturers/Lect_fingerprint";

import LecturerMgmnt from "../components/admin/manage_lecturers/LecturerMgmnt";
import Register_lecturer from "../components/admin/manage_lecturers/Register_lecturer";
import Instructors_list from "../components/admin/manage_lecturers/Instructors_list";
import AdminRoot from "../components/admin/AdminRoot";
import LoginAs from "../screen/LoginAs";
import WelocomeGuide from "../screen/WelocomeGuide";
import Lecturer_dash from "../components/lecturers/Lecturer_Dashboard";
import Course_Magmt from "../components/admin/manage_courses/Course_Magmt";
import Course_Reg from "../components/admin/manage_courses/Course_Reg";
import Course_list from "../components/admin/manage_courses/Course_list";

import SignwithNumber from "../screen/SignwithNumber";
import CourseMagementScreen from "../components/admin/manage_courses/CourseMagementScreen";
import Signup00 from "../screen/Signup00";
import Tracking_attendance from "../components/lecturers/Tracking_attendance";
import View_attendance from "../components/lecturers/View_attendance";
import Login00 from "../screen/Login00";
import LectureScreen from "../components/admin/manage_lecturers/LectureScreen";
import StudentScreen from "../components/admin/StudentScreen";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

// create a config file

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{
        
       
        width: "90%",
        height: 70,
        backgroundColor: colors.white,
        elevation: 8
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "800",
        color: "green"
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: "400",
      }}

    />
    ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{
        
        width: "90%",
        height: 70,
        backgroundColor: colors.white,
        elevation: 8
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: "800",
        color: colors.delete
      }}
      text2Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
    ),
};

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <FontAwesome
                  name="home"
                  size={24}
                  color={focused ? colors.delete : colors.text}
                />
                <Text style={{ fontSize: 13, color: colors.text }}> Home</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen name="Dashobor" component={AdminDashboard} />
    </Tab.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomePage} />
      <Stack.Screen name="Settings" component={AdminDashboard} />
    </Stack.Navigator>
  );
}

const RootSatck = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.white,
            height: 80,
            elevation: 10,
          },
          headerTitleStyle: {
            color: colors.text,
            fontSize: 25,
          },
        }}
        initialRouteName="Signup00"
      >
        {/* admin part */}
        <Stack.Screen
          name="AdminDashboard"
          options={{ headerShown: false }}
          component={AdminDashboard}
        />
        <Stack.Screen
          name="Fingerprint Registration"
          component={Reg_fingerPrint}
        />
        <Stack.Screen name="Registration list" component={Registration_list} />
        <Stack.Screen name="Student Management" component={StudentMgmt} />
        <Stack.Screen
          name="Student Registration"
          component={Student_Registration}
        />
        <Stack.Screen
          name="WelcomePage"
          options={{ headerShown: false }}
          component={WelcomePage}
        />
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerShown: false }}
          component={SignUp}
        />
        <Stack.Screen name="Setting" component={Setting} />
        {/* manage lecturers */}

        <Stack.Screen name="Lectuer Management" component={LecturerMgmnt} />
        <Stack.Screen name="Register Lecturer" component={Register_lecturer} />
        <Stack.Screen
          name="Register Fingerprint"
          component={Lect_fingerprint}
        />
        <Stack.Screen name="Lecturer List" component={Instructors_list} />

        <Stack.Screen name="Course Management" component={Course_Magmt} />
        <Stack.Screen
          name="Course Management Screen"
          component={CourseMagementScreen}
        />
        <Stack.Screen name="LectureScreen" component={LectureScreen} />
        <Stack.Screen name="StudentScreen" component={StudentScreen} />
        <Stack.Screen name="Course Registation" component={Course_Reg} />
        <Stack.Screen name="Course List" component={Course_list} />
        <Stack.Screen name="SignwithNumber" component={SignwithNumber} />
        <Stack.Screen name="Signup00"   options={{ headerShown: false }}component={Signup00} />
        <Stack.Screen name="Login00"  options={{ headerShown: false }} component={Login00} />
        <Stack.Screen name="Admin root" component={AdminRoot} />
        <Stack.Screen name="Welcome back"  options={{ headerShown: false }} component={WelocomeGuide} />
        <Stack.Screen
          name="Login As"
          options={{ headerShown: false }}
          component={LoginAs}
        />
        <Stack.Screen
          name="Lecturer dash"
          options={{ headerShown: false }}
          component={Lecturer_dash}
        />
        <Stack.Screen name="Tracking Attendance" component={Tracking_attendance} />
        <Stack.Screen name="View Attendance" component={View_attendance} />

       
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default RootSatck;
