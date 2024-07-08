import { View, Text,Alert, ScrollView, FlatList, SafeAreaView, TextInput, Pressable ,Button, onPress} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import { db } from "../../firebase";

import {  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc, } from "firebase/firestore";


const Registration_list = ({navigation}) => {
  const [dataFromSate, setData] = useState([]);

 
  const [editItem, setEditItem] = useState('');
  const [newName, setNewName] = useState('');
  const [newMatricule, setNewMatricule] = useState('');
  const [newDepartement, setNewDepartement] = useState('');


  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setData(dataFromSate.filter((student) => student.id !== id));
      Alert.alert("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
      Alert.alert("Error deleting course: ", error.message);
    }
  };

  const renderItem = ({ item, index }) => {
   
    return (
        <View style={styles.row}>
            <Text style={[styles.cell, { width: 60 }]}>{(index + 1).toString()}</Text>
            <Text style={[styles.cell, { width: 200 }]}>{item.name}</Text>
            <Text style={[styles.cell, { width: 100 }]}>{item.matricule}</Text>
            <Text style={[styles.cell, { width: 200 }]}>{item.department}</Text>
            <Text style={[styles.cell, { width: 200 }]}>{item.level}</Text>
            <Button
        title="Delete"
        onPress={() => handleDelete(item.id)}
        color="red"
        style={[styles.cell, { width: 100 }]}
      />
        </View>
    )
   }
    
   const getallCourses = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
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

    <SafeAreaView  style={styles.container}>
   
     <View style={styles.search}>
       <TextInput label="Search" placeholder='Search student' style={styles.SearchInput} />
     </View>
     
     <ScrollView horizontal>
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={[styles.Header_table_list, { width: 60 }]}>S.No</Text>
          <Text style={[styles.Header_table_list, { width: 200 }]}>Names</Text>
          <Text style={[styles.Header_table_list, { width: 100 }]}>
            Matricules
          </Text>
          <Text style={[styles.Header_table_list, { width: 200 }]}>
            Departements
          </Text>
          <Text style={[styles.Header_table_list, { width: 200 }]}>
            Level
          </Text>
          
        </View>
        <FlatList 
        data ={dataFromSate}
        renderItem={renderItem}
        keyExtractor={(item, index) =>index.toString()}
        />
      </View>
    </ScrollView>

    <Pressable style={styles.next_btn} onPress={() =>{navigation.navigate('Student Registration')}} >
       <Text style={styles.btn_text}>Register</Text>
     </Pressable>
   </SafeAreaView>

   
  );
};

export default Registration_list;
