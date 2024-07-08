import {
  View,
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  TextInput,
  Pressable,
  Button,
  onPress,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles";

import {
  app,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth,
} from "../../../firebase/index";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Instructors_list = ({ navigation }) => {
  const [dataFromSate, setData] = useState([]);


  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Admins and Lecturers", id));
      setData(dataFromSate.filter((lecturers) => lecturers.id !== id));
      Alert.alert("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
      Alert.alert("Error deleting course: ", error.message);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.cell, { width: 60 }]}>
          {(index + 1).toString()}
        </Text>
        <Text style={[styles.cell, { width: 200 }]}>{item.name}</Text>
        <Text style={[styles.cell, { width: 150 }]}>{item.email}</Text>
        <Text style={[styles.cell, { width: 200 }]}>{item.matricule}</Text>
        <Text style={[styles.cell, { width: 200 }]}>{item.password}</Text>
        <Text style={[styles.cell, { width: 200 }]}>{item.entryDay}</Text>
        <Text style={[styles.cell, { width: 200 }]}>{item.phonNumber}</Text>
        <Text style={[styles.cell, { width: 200 }]}>{item.role}</Text>
        <Button
        title="Delete"
        onPress={() => handleDelete(item.id)}
        color="red"
        style={[styles.cell, { width: 100 }]}
      />
      </View>
    );
  };

  const getallCourses = async () => {
    const querySnapshot = await getDocs(collection(db, "Admins and Lecturers"));
    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(courses);
  };
  useEffect(() => {
    getallCourses();
  }, []);

 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <TextInput
          label="Search"
          placeholder="Search student"
         
          style={styles.SearchInput}
        />
      </View>

      <ScrollView horizontal>
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={[styles.Header_table_list, { width: 60 }]}>S.No</Text>
            <Text style={[styles.Header_table_list, { width: 200 }]}>
             Instructor Names
            </Text>
            <Text style={[styles.Header_table_list, { width: 150 }]}>
              email
            </Text>
            <Text style={[styles.Header_table_list, { width: 200 }]}>
              matricule
            </Text>
            <Text style={[styles.Header_table_list, { width: 200 }]}>
              password
            </Text>
            <Text style={[styles.Header_table_list, { width: 200 }]}>
              entryDay
            </Text>
            <Text style={[styles.Header_table_list, { width: 200 }]}>
              phone Number
            </Text>
            <Text style={[styles.Header_table_list, { width: 200 }]}>
              role
            </Text>
          </View>
          <FlatList
            data={dataFromSate}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>

      <Pressable
        style={styles.next_btn}
        onPress={() => {
          navigation.navigate("Student Registration");
        }}
      >
        <Text style={styles.btn_text}>Register</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Instructors_list;
