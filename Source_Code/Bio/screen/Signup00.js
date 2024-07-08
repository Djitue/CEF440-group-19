import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";

import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase/index";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import "firebase/functions";
import Toast from "react-native-toast-message";



import Screenstyles from "./screenStyle";
import colors from "../components/colors";

const Signup00 = ({ navigation }) => {
  const [name, setName] = useState("");
  const [nameVerify, setNameVerify] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVerify, setEmailVerify] = useState(false);
  const [mobile, setMobile] = useState("");
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("");
  const [secretText, setSecretText] = useState("");

  

  const handleSubmit = async () => {

    if(!name || !password || !mobile || !userType || secretText){
      Toast.show({
        type: 'error',
        text1: 'Oops❌!!',
        text2: 'Fill all the requirements please',
        visibilityTime: 5000,
      })

    }
    if (userType === "Admin" && secretText !== "Text1243") {
      // return Alert.alert("Invalid Admin");
      Toast.show({
        type: 'error',
        text1: 'Oops❌!!',
        text2: 'Looks like you did not put the right Secret Key',
        visibilityTime: 5000,
      })
    }

    try {
        
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "Admins and Lecturers", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        userType: userType,
        password: password,
        mobile: mobile
      });

      // Alert.alert("Registered Successfully!!");
      Toast.show({
        type: 'success',
        text1: 'Success!!',
        text2: 'Registered Successfully',
        visibilityTime: 5000,
      })
      navigation.navigate("Login00");
    } catch (error) {
      if(error.code === 'auth/email-already-in-use' ){
        Toast.show({
          type: 'error',
          text1: 'Oops❌!!',
          text2: 'Email is already in use',
          visibilityTime: 8000,
        })
      } else if(error.code === 'auth/invalid-email'){
        Toast.show({
          type: 'error',
          text1: 'Oops❌! Registration failed',
          text2: `Invalid email`,
          visibilityTime: 5000,
        })
        // Alert.alert("Registration Failed", error.message);
      }
      else if(error.code === 'auth/network-request-failed'){
        Toast.show({
          type: 'error',
          text1: 'Internet Connection',
          text2: `Check your internet connection please`,
          visibilityTime: 5000,
        })
      }
     
    }
  };

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
      <View>
        <View style={styles.loginContainer}>
          <Text style={styles.text_header}>Register As</Text>

          <View style={styles.selectedRole}>
            
            <View style={styles.radioButton_inner_div}>
              <Text style={styles.radioButton_text}>Lecturer</Text>
              <RadioButton
                value="Lecturer"
                status={userType === "Lecturer" ? "checked" : "unchecked"}
                onPress={() => setUserType("Lecturer")}
              />
            </View>
            <View style={styles.radioButton_inner_div}>
              <Text style={styles.radioButton_text}>Admin</Text>
              <RadioButton
                value="Admin"
                status={userType === "Admin" ? "checked" : "unchecked"}
                onPress={() => setUserType("Admin")}
              />
            </View>
          </View>

          {userType === "Admin" && (
            <View style={styles.action}>
              <TextInput
                placeholder="Secret Text"
                style={styles.textInput}
                onChange={(e) => setSecretText(e.nativeEvent.text)}
              />
            </View>
          )}

          <View style={styles.action}>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              style={styles.textInput}
            />
          </View>
        

          <View style={styles.action}>
            <TextInput placeholder="Email"
             value={email}
             onChangeText={setEmail}
             keyboardType = "email-address"
             autoCapitalize="none"
             style={styles.textInput} />
             
          </View>
         

          <View style={styles.action}>
            <TextInput
              placeholder="Mobile"
              style={styles.textInput}
              value={mobile}
              onChangeText={setMobile}
              maxLength={10}
            />
          </View>
         

          <View style={styles.action}>
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            ></TouchableOpacity>
          </View>
          
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPress={handleSubmit}>
            <View>
              <Text style={styles.textSign}>Register</Text>
            </View>
          </TouchableOpacity>
          <Text>----Or-----</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login00")}>
            <View>
              <Text style={styles.textSign}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup00;

// Get the device dimensions
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
    color: colors.text,
    fontWeight: "bold",
    fontSize: 30,

    alignSelf: "center",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    width: 150,
    color: "#420475",
    justifyContent: "center",
    alignItems: "center",
    
    
  },
});
