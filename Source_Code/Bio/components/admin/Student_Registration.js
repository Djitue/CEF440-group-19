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
import React from "react";
import styles from "./styles";
import { useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import {
  app,
  db,
 
} from "../../firebase/index";
import { getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc, } from "firebase/firestore";
  import Toast from "react-native-toast-message";

const Student_Registration = ({ navigation }) => {
  const [name, setName] = useState("");
  const [matricule, setMatricule] = useState("");
  const [department, setDepartement] = useState("");
  const [level, setLevel] = useState("");
  const [fingerprintData, setFingerprintData] = useState(null);
  const db = getFirestore();

  const handleRegister = async () => {
    if (!name || !matricule || !department || !level) {
      Toast.show({
        type: 'error',
        text1: 'Oops❌!!',
        text2: 'Fill all the requirements please',
        visibilityTime: 5000,
      })
      return;
    }

    try {
     
      const docRef = await addDoc(collection(db, "students"), {
        name: name,
        matricule: matricule,
        department: department,
        level: level,
        fingerprintData: [],
      });

      console.log("Document written with ID: ", docRef.id);
      // Alert.alert('Student details saved. Now scan your fingerprints.');
      Toast.show({
        type: 'success',
        text1: 'Well!!',
        text2: 'Student details saved. Now scan your fingerprints.',
        visibilityTime: 5000,
      })

      let scanning = true;
      const collectedFingerprints = [];

      while (scanning && collectedFingerprints.length < 200) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Scan your fingerprint',
        });

        if (result.success) {
          collectedFingerprints.push({ timestamp: new Date().toISOString() });
          setFingerprintData(collectedFingerprints);

          const addMore = await new Promise((resolve) => {
            // Alert.alert(
            //   'Fingerprint saved successfully!'
            // );
            Toast.show({
              type: 'success',
              text1: 'Good!!',
              text2: 'Fingerprint saved successfully',
              visibilityTime: 5000,
            })
          });

          scanning = addMore;
        } else {
          // Alert.alert('Fingerprint scanning failed');
          Toast.show({
            type: 'error',
            text1: 'Oopps❌!!',
            text2: 'Fingerprint scanning failed',
            visibilityTime: 5000,
          })
          scanning = false;
        }
      }

      if (collectedFingerprints.length > 0) {
        await updateDoc(doc(db, "students", docRef.id), {
          fingerprintData: collectedFingerprints,
        });

        console.log("Fingerprint data updated for document ID: ", docRef.id);
        // Alert.alert('All fingerprints saved successfully!');
        navigation.navigate('Registration list'); 
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Error adding document: ", e.message);
    }
  };
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
        <Text style={styles.label}>Student Name</Text>
        <TextInput
          label="Search"
          value={name}
          onChangeText={setName}
          placeholder="Enter name"
          style={styles.inputText}
        />
        <Text style={styles.label}>Student Matricule</Text>
        <TextInput
          label="Search"
          value={matricule}
          onChangeText={setMatricule}
          placeholder="Enter matricule"
          style={styles.inputText}
        />
        <Text style={styles.label}>Student Departement</Text>
        <TextInput
          label="Search"
          value={department}
          onChangeText={setDepartement}
          placeholder="select department"
          style={styles.inputText}
        />
        <Text style={styles.label}>Student Level</Text>
        <TextInput
          label="Search"
          value={level}
          onChangeText={setLevel}
          placeholder="level"
          style={styles.inputText}
        />
      </View>

      {/* <Pressable style={styles.back_btn}>
       <Text style={styles.btn_text}>back</Text>
     </Pressable> */}
      <Pressable style={styles.next_btn} onPress={handleRegister}>
        <Text style={styles.btn_text}>Register</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Student_Registration;
