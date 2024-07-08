import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  Alert
} from "react-native";
import React, { useState } from "react";
import styles from "../components/admin/styles";
import Screenstyles from "./screenStyle";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase/index";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import 'firebase/functions';




const SignUp = ({navigation}) => {
 
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setconfPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

const db = getFirestore()

   const handleSignUp = async () =>{
    if (password !== confPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      

       // Store user data in Firestore
       await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: role
      });
      console.log('User created successfully');
      navigation.navigate("Login"); // navigate to home screen after successful signup
    } catch (error) {
      console.error(error);
    }
   }



  return (
    <SafeAreaView>
    <View style={Screenstyles.Image_login_box}>
      <Image
        source={require("../assets/img/cover.png")}
        style={Screenstyles.Image_login}
      />
       <Text style={styles.title}>{isLogin ? "log in" : "Sign Up"}</Text>
    </View>

    <View style={Screenstyles.inputbox}>
      <Text style={styles.label}>Fullname</Text>
      <TextInput
        label="Search"
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={styles.inputText}
      />
       <Text style={styles.label}>email</Text>
      <TextInput
        label="Search"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.inputText}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        label="Search"
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        style={styles.inputText}
      />
      <Text style={styles.label}>Role</Text>
      <TextInput
        label="Search"
        placeholder="Admin or Student"
        value={role}
        onChangeText={setRole}
        style={styles.inputText}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        label="Search"
        placeholder="Confirm password"
        value={confPassword}
        onChangeText={setconfPassword}
        style={styles.inputText}
      />
      <Pressable style={Screenstyles.forgot_pass}  >
        <Text style={Screenstyles.forgot_pass_text}>Sign In to your Account</Text>
      </Pressable>

      <Pressable
        style={Screenstyles.btnBox}
        onPress={handleSignUp}
      >
        <Text style={Screenstyles.btn}>Sign Up</Text>
      </Pressable>
    </View>
  </SafeAreaView>
  )
}


export default SignUp