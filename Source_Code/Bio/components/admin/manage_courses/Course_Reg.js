import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  Image,
  Button,
  Pressable,
  Alert,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../styles";

import {
  app,
  db,
  
} from "../../../firebase/index";
import { getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc, } from "firebase/firestore";
 
  import Toast from "react-native-toast-message";




const Course_Reg = ({ navigation }) => {
  const [cCode, setcCode] = useState("");
  const [cName, setcName] = useState("");
  const [department, setDepartement] = useState("");
  const [Instructor_Name, setInstructor_Name] = useState("");
  const [TimeSlot, setTimeslot] = useState("");

  const HandlingCourses = async () => {
    //validation
     if (!cCode || !cName || !department || !Instructor_Name || !TimeSlot) {
      // Alert.alert('All fields are required');
      Toast.show({
        type: 'error',
        text1: 'Oops!',
        text2: 'Don\'t worry just fill all the requirements',
        visibilityTime: 5000,
      })
      return;
    }

    try {
      const db = getFirestore();
      
      const docRef = await addDoc(collection(db, "courses", ), {
       
        Course_code: cCode,
        Course_name: cName,
        Department: department,
        Instructor_Name: Instructor_Name,
        TimeSlot: TimeSlot
      });

      console.log("Document written with ID: ", docRef.id);
      // Alert.alert("Course has register succesfully");
      Toast.show({
        type: 'success',
        text1: 'Congrats!',
        text2: 'Course has been registered successfully',
        visibilityTime: 5000,
      })
      navigation.navigate("Course List",{
        cCode,
        cName,
        department,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      // Alert.alert("Error registering document: ");
      Toast.show({
        type: 'error',
        text1: 'Oops!',
        text2: 'Error registering document',
        visibilityTime: 5000,
      })
       if(error.code === 'auth/network-request-failed'){
        Toast.show({
          type: 'error',
          text1: 'Internet Connection',
          text2: `Check your internet connection please`,
          visibilityTime: 5000,
        })
      }
    }
  };


  const getallCourses = async () => {

    const querySnapshot = await getDocs(collection(db, "courses"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      getList({
        ...doc.data(),
        id: doc.id
      })

    });
  };
  useEffect(() => {
   getallCourses()
  }, [])

 
  

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
        <Text style={styles.label}>Course Name</Text>
        <TextInput
          label="Search"
          value={cName}
          onChangeText={setcName}
          placeholder="Enter name"
          style={styles.inputText}
        />
        <Text style={styles.label}>Course Code</Text>
        <TextInput
          label="Search"
          value={cCode}
          onChangeText={setcCode}
          placeholder="Enter matricule"
          style={styles.inputText}
        />
        <Text style={styles.label}> Departement</Text>
        <TextInput
          label="Search"
          value={department}
          onChangeText={setDepartement}
          placeholder="select department"
          style={styles.inputText}
        />
        <Text style={styles.label}> Instructor Name</Text>
        <TextInput
          label="Search"
          placeholder="select department"
          value={Instructor_Name}
          onChangeText={setInstructor_Name}
          style={styles.inputText}
        />
        <Text style={styles.label}> Time Slot</Text>
        <TextInput
          label="Search"
          placeholder="select department"
          value={TimeSlot}
          onChangeText={setTimeslot}
          style={styles.inputText}
        />
      </View>

      {/* <Pressable style={styles.back_btn}>
       <Text style={styles.btn_text}>back</Text>
     </Pressable> */}
      <Pressable
        style={styles.next_btn}
        onPress={HandlingCourses}
      >
        <Text style={styles.btn_text}>Register</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Course_Reg;
