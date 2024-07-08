import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Button,
  Dimensions
} from "react-native";

import { RadioButton } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

import {
  auth,
  db,
  
  signInWithEmailAndPassword,
} from "../firebase/index";
import { getFirestore,getDoc, doc } from "firebase/firestore";
import "firebase/functions";
import colors from "../components/colors";
import Screenstyles from "./screenStyle";


const Login00 = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

      const handleLogin = async() =>{
        if(!email || !password ){
          Toast.show({
            type: 'error',
            text1: 'Oops❌!!',
            text2: 'Fill all the requirements please',
            visibilityTime: 5000,
          })
    
        }
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
      
            // Fetch user type from Firestore
            const userDoc = await getDoc(doc(db, 'Admins and Lecturers', user.uid));
            const userData = userDoc.data();
      
            if (userData) {
              const userType = userData.userType;
      
              // Store user data in AsyncStorage
              await AsyncStorage.setItem('token', user.uid);
              await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
              await AsyncStorage.setItem('userType', userType);
      
              // Alert.alert('Logged In Successfully');
              Toast.show({
                type: 'success',
                text1: 'Good',
                text2: 'Logged in Successfully',
                visibilityTime: 5000,
              })
              if (userType === 'Admin') {
                navigation.navigate('AdminDashboard');
              } else {
                navigation.navigate('Lecturer dash');
              }
            } else {
              Toast.show({
                type: 'error',
                text1: 'Oops!!',
                text2: 'User not found, check your credentials well',
                visibilityTime: 5000,
              })
            }
          } catch (error) {
            if(error.code === 'auth/invalid-email'){
              Toast.show({
                type: 'error',
                text1: 'Email not found',
                text2: `Invalid email`,
                visibilityTime: 5000,
              })
              // Alert.alert("Registration Failed", error.message);
            }else if(error.code === 'auth/too-many-requests'){
              Toast.show({
                type: 'error',
                text1: 'Too many attemps',
                text2: `Refresh your page and try it again`,
                visibilityTime: 5000,
              })
            }
            else if(error.code === 'auth/network-request-failed'){
              Toast.show({
                type: 'error',
                text1: 'Internet Connection',
                text2: `Check your internet connection please`,
                visibilityTime: 5000,
              })
            }
            else if(error.code === 'auth/invalid-credential'){
              Toast.show({
                type: 'error',
                text1: 'Error❌! Internet',
                text2: `Invalid credential`,
                visibilityTime: 5000,
              })
            }
            // Alert.alert('Login Failed', error.message);
          }
      }

      const getData = async () => {
        const data = await AsyncStorage.getItem('isLoggedIn');
        console.log(data, 'at LoginPage');
      };
    
      useEffect(() => {
        getData();
        console.log('Hii');
        
      }, []);

  return (
    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"always"}
    style={{ backgroundColor: "white" }}
  >
       <View style={Screenstyles.Image_login_box}>
      <Image
        source={require("../assets/img/cover.png")}
        style={Screenstyles.Image_login}
      />
       
    </View>
    <View style={{ backgroundColor: 'white' }}>
     
      <View style={styles.loginContainer}>
        <Text style={styles.text_header}>Login !!!</Text>
        <View style={styles.action}>
         
          <TextInput
            placeholder="Mobile or Email"
            style={styles.textInput}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.action}>
        
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: 8,
            marginRight: 10,
          }}
        >
          <Text style={{ color: '#420475', fontWeight: '700' }}>
            Forgot Password
          </Text>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.inBut} onPress={handleLogin}>
          <View>
            <Text style={styles.textSign}>Log in</Text>
          </View>
        </TouchableOpacity>

        <View style={{ padding: 15 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#919191' }}>
            ----Or Continue as----
          </Text>
        </View>
        <View style={styles.bottomButton}>
         
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
           
            <Text style={styles.bottomText}>Sign Up</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            
             
           
           
          </View>
        </View>
      </View>
    </View>
  </ScrollView>
  )
}

export default Login00


const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;

const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
  
      marginTop: 100,
      padding: 30,
      backgroundColor: "#c5c5c5",
    },
    textInput: {
      width: isTablet? 730 : 350,
      height: 50,
      backgroundColor: colors.background,
      borderRadius: 20,
      elevation: 1,
      alignSelf: 'center',
      paddingLeft: isTablet? 20 : 15,
      marginBottom: 10,
    },
    button: {
      alignItems: "center",
      marginTop: -20,
      alignItems: "center",
      textAlign: "center",
      margin: 20,
    },
    roleButton: {
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#000",
      width: "80%",
      alignItems: "center",
    },
    selectedRole: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    radioButton_inner_div: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    action: {
      flexDirection: "row",
      paddingTop: 6,
      paddingBottom: 3,
      marginTop: 5,
  
      paddingHorizontal: 15,
  
     
      borderRadius: 50,
    },
    loginContainer: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    text_footer: {
      color: "#05375a",
      fontSize: 18,
    },
    text_header: {
      color: "#420475",
      fontWeight: "bold",
      fontSize: 30,
    },
    textSign: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#420475",
    },
  });