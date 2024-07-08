import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styles from "../admin/styles";
import { db, auth } from "../../firebase";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";
import { getAuth, signOut, getIdToken } from "firebase/auth";


import { AntDesign } from '@expo/vector-icons';
import Toast from "react-native-toast-message";



const Lecturer_Dashboard = ({ navigation }) => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const uid = await AsyncStorage.getItem("token");
        if (uid) {
          const userDoc = await getDoc(doc(db, "Admins and Lecturers", uid));
          if (userDoc.exists) {
            setAdminName(userDoc.data().name);
          }
        }
      } catch (error) {
        console.log("Error fetching admin name:", error);
      }
    };

    const refreshTokenIfNeeded = async () => {
      const user = auth.currentUser;
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        const tokenExpirationTime = idTokenResult.expirationTime;
        const expirationDate = new Date(tokenExpirationTime);
        const currentTime = new Date();
        const timeDifference =
          (expirationDate - currentTime) / (1000 * 60 * 60); // in hours

        // Refresh the token if it expires in less than 2 hours
        if (timeDifference < 2) {
          await user.getIdToken(true); // Force refresh the token
        }
      }
    };

    fetchAdminName();
    refreshTokenIfNeeded();
  }, []);

  const auths = getAuth();
  const handleSignOut = async () => {
    try {
      console.log("Signing out...");
      await signOut(auth);
      console.log("Sign out successful");
      Toast.show({
        type: 'success',
        text1: 'Good!!',
        text2: 'Sign out successfull',
        visibilityTime: 4000,
      })
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared");
      navigation.replace("Login00");
      console.log("Navigated to Login screen");
    } catch (error) {
      console.log("Error signing out:", error);
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
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("Tracking Attendance");
          }}
        >
          <Image source={require("../../assets/img/admin.png")} />
          <Text style={styles.CardText}>Track Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            navigation.navigate("View Attendance");
          }}
        >
          <Image source={require("../../assets/img/View.png")} />
          <Text style={styles.CardText}>View Attendance Record</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate("Course Management");
        }}
      >
        <Image source={require("../../assets/img/info.png")} />
        <Text
          style={styles.CardText}
          onPress={() => {
            navigation.navigate("Course Management");
          }}
        >
          View Course Info
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Lecturer_Dashboard;
