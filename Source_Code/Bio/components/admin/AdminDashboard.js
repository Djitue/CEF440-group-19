import { View, Text, StyleSheet, SafeAreaView, Image, onPress ,TouchableOpacity, Pressable} from "react-native";
import React  from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AdminDashboardTab from "../../tabs/AdminDashboardTab";
import styles from './styles'
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import Setting from "./Setting";

import { db,auth } from "../../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { getAuth, signOut, getIdToken } from "firebase/auth";


import { AntDesign } from '@expo/vector-icons';
import Toast from "react-native-toast-message";














const AdminDashboard = ({navigation}) => {

  const [adminName, setAdminName] = useState('');
  
  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const uid = await AsyncStorage.getItem('token');
        if (uid) {
          const userDoc = await getDoc(doc(db, 'Admins and Lecturers', uid));
          if (userDoc.exists) {
            setAdminName(userDoc.data().name);
          }
        }
      } catch (error) {
        console.log('Error fetching admin name:', error);
      }
    };

    const refreshTokenIfNeeded = async () => {
      const user = auth.currentUser;
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const tokenExpirationTime = idTokenResult.expirationTime;
        const expirationDate = new Date(tokenExpirationTime);
        const currentTime = new Date();
        const timeDifference = (expirationDate - currentTime) / (1000 * 60 * 60); // in hours

        // Refresh the token if it expires in less than 2 hours
        if (timeDifference < 2) {
          await user.getIdToken(true); // Force refresh the token
        }
      }
    };

    fetchAdminName();
    refreshTokenIfNeeded();
  }, []);
  
   const auths = getAuth()
  const handleSignOut = async () => {
    try {
      console.log('Signing out...');
      await signOut(auth);
      console.log('Sign out successful');
      Toast.show({
        type: 'success',
        text1: 'Good!!',
        text2: 'Sign out successfull',
        visibilityTime: 5000,
      })
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
      navigation.replace('Login00');
      console.log('Navigated to Login screen');
    } catch (error) {
      if(error.code === 'auth/network-request-failed'){
        Toast.show({
          type: 'error',
          text1: 'Internet Connection',
          text2: 'Check your internet connection please',
          visibilityTime: 5000,
        })
      }
      console.log('Error signing out:', error);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      
      <View style={styles.icon}>
        <Text style={styles.info}>Welcome, {adminName}</Text>
        <TouchableOpacity style={styles.info} onPress={handleSignOut}>
        <AntDesign name="logout" size={26} color="blue"  />
        </TouchableOpacity>
      </View>
      
    </View>
    <View style={styles.box}>
        <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate('StudentScreen')}}>
        <Image source ={require('../../assets/img/student.png')} />
            <Text style={styles.CardText} >Manage student</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}  onPress={() => {navigation.navigate('LectureScreen')}} >
        <Image source ={require('../../assets/img/instructor.png')} />
            <Text style={styles.CardText} >Manage instructor</Text>
        </TouchableOpacity>
       
    </View>
    <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate('Course Management Screen')}} >
    <Image source ={require('../../assets/img/courses.png')} />
            <Text style={styles.CardText } >Manage course</Text>
      </TouchableOpacity>
      
      

      
   
    
   
        
    </SafeAreaView>
    
    
  );
};

export default AdminDashboard;


