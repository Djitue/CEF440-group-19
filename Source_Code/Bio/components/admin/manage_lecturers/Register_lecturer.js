import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
  Button,
  Pressable,
  ScrollView,
  alert
} from "react-native";
import React  from "react";
import styles from "../styles";
import {
  app,
  db,
  createUserWithEmailAndPassword, signInWithEmailAndPassword ,auth,
} from "../../../firebase/index";
import { getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  doc, } from "firebase/firestore";
import { useState } from "react";
import Toast from "react-native-toast-message";

const Register_lecturer = ({ navigation }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [matricule, setmatricule] = useState("");
  const [Deparement, setDeparement] = useState(true);
  const [entryDay, setentryDay] = useState(true);
      
  const handlLecturers = async () =>{
    if(!Instructor_Name || !role || !email || !password || phoneNumber || !matricule || !Deparement || entryDay){
      Toast.show({
        type: 'error',
        text1: 'Oops❌!!',
        text2: 'Fill all the requirements please',
        visibilityTime: 5000,
      })
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

       // Store user data in Firestore
       await setDoc(doc(db, "Admins and Lecturers", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        matricule: matricule,
        Deparement: Deparement,
        entryDay: entryDay,
        role: role
      });
      console.log('Lecturer created successfully');
      Toast.show({
        type: 'succed',
        text1: 'COngrats',
        text2: 'Lecturer has been register successfully',
        visibilityTime: 5000,
      })
      navigation.navigate("Lecturer List"); // navigate to home screen after successful signup
    } catch (error) {
      console.error(error);
    }
   }

  return (
    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps={"always"}
    style={{ backgroundColor: "white" }}
    >
      {/* <View style={styles.header} >
     <Text style={styles.title}>Student registration</Text>
     </View> */}
     
      <View style={styles.inputbox}>
      <ScrollView vertical>
        <Text style={styles.label}>Instructor Name</Text>
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
          placeholder="Enter email" 
          value={email}
          onChangeText={setEmail}
          style={styles.inputText}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          label="Search"
          placeholder="Enter email"
          value={password}
          onChangeText={setpassword}
          style={styles.inputText}
        />
        <Text style={styles.label}>Instructor Matricule</Text>
        <TextInput
          label="Search"
          placeholder="Enter matricule"
          value={matricule}
          onChangeText={setmatricule}
          style={styles.inputText}
        />
        <Text style={styles.label}>Instructor Departement</Text>
        <TextInput
          label="Search"
          placeholder="select department"
          value={Deparement}
          onChangeText={setDeparement}
          style={styles.inputText}
        />
        <Text style={styles.label}>Role</Text>
        <TextInput
          label="Role"
          placeholder="Role"
          value={role}
          onChangeText={setRole}
          style={styles.inputText}
        />
        <Text style={styles.label}>Entry day</Text>
        <TextInput
          label="Search"
          placeholder="select department"
          value={entryDay}
          onChangeText={setentryDay}
          style={styles.inputText}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          label="Search"
          placeholder="select department"
          value={phoneNumber}
          onChangeText={setphoneNumber}
          style={styles.inputText}
          defaultValue="+237"
        />
        </ScrollView>
      </View>
      
      {/* <Pressable style={styles.back_btn}>
       <Text style={styles.btn_text}>back</Text>
     </Pressable> */}
      <Pressable
        style={styles.next_btn}
        onPress={handlLecturers}
      >
        <Text style={styles.btn_text}>Register</Text>
      </Pressable>
      
    </ScrollView>
  );
};

export default Register_lecturer;
