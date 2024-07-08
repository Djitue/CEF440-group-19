import { View, Text, StyleSheet, SafeAreaView, Image, onPress , Pressable} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import AdminDashboard from "./AdminDashboard";
import Setting from "./Setting";
import colors from "../colors";
import Reg_fingerPrint from "./Reg_fingerPrint";
import Registration_list from "./Registration_list";
import StudentMgmt from "./StudentMgmt";
import Student_Registration from "./Student_Registration";
import WelcomePage from "../../screen/WelcomePage";
import Login from "../../screen/Login";
import SignUp from "../../screen/SignUp";
//Manage instructor root
import Lect_fingerprint from '../admin/manage_lecturers/Lect_fingerprint';
import LecturerMgmnt from '../admin/manage_lecturers/LecturerMgmnt'
import Register_lecturer from '../admin/manage_lecturers/Register_lecturer'
import Instructors_list from '../admin/manage_lecturers/Instructors_list'
//Manage Courses root
import Course_Reg from "./manage_courses/Course_Reg";
import Course_list from "./manage_courses/Course_list";
import Course_Magmt from "./manage_courses/Course_Magmt";





const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        background: '#fff'
    }
}

function TabNavigator(){
  return(
    <Tab.Navigator screenOptions={{
        tabBarLabel: false,
        headerShown: false,
        tabBarStyle :{
            position: 'absolute',
            bottom: 0,
            right:0,
            left: 0,
            elevation: 0,
            with: 70,
            height: 60,
            
        },
        
    }} >
      <Tab.Screen name="Home" component={StackNavigator}
       options={{
        tabBarIcon: ({focused}) =>{
            
            return (
              <View style={{alignItems: 'center', justifyContent: 'center', margin: 5, width: 100, }}>
                <FontAwesome name="home" size={34} color={focused? colors.delete : colors.text} />
                <Text>Home</Text>
            </View>
            )
        }
      }} 
       />
      <Tab.Screen name="Setting" component={Setting} options={{
        tabBarIcon: ({focused}) =>{
            return (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
               <Ionicons name="settings" size={34} color={focused? colors.delete : colors.text} />
                <Text>Settings</Text>
            </View>
            )
        }
      }}  />
    </Tab.Navigator>
  )
}

function StackNavigator(){
    return(
        <Stack.Navigator
        screenOptions={{
            headerStyle:{
                backgroundColor: colors.white,
                height: 80,
                elevation: 10,


            },
            headerTitleStyle:{
                color: colors.text,
                fontSize: 25,
            }
            
        }}
        initialRouteName='AdminDashboard'
        >
            <Stack.Screen name='AdminDashboard' options={{headerShown: false}} component={AdminDashboard} />
            <Stack.Screen name='Fingerprint Registration' component={Reg_fingerPrint} />
            <Stack.Screen name='Registration list' component={Registration_list} />
            <Stack.Screen name='Student Management' component={StudentMgmt} />
            <Stack.Screen name='Student Registration' component={Student_Registration} />
            <Stack.Screen name='WelcomePage' options={{headerShown: false}} component={WelcomePage} />
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='Setting' component={Setting} />
             {/* manage lecturers */}
             <Stack.Screen name='Lectuer Management' component={LecturerMgmnt} />
            <Stack.Screen name='Register Lecturer' component={Register_lecturer} />
            <Stack.Screen name='Register Fingerprint' component={Lect_fingerprint} />
            <Stack.Screen name='Lecturer List' component={Instructors_list} />
            <Stack.Screen name='Course List' component={Course_list} />
            <Stack.Screen name='Course Management' component={Course_Magmt} />
            <Stack.Screen name='Course Registration' component={Course_Reg} />
        </Stack.Navigator>
    )
  }


const AdminRoot = () => {
  return (
    <NavigationContainer>
    <TabNavigator />
    </NavigationContainer>
  )
}

export default AdminRoot