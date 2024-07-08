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
import {
  app,
  db,
 
  
} from "../../../firebase";



import styles from "../styles";
import {  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc, } from "firebase/firestore";

const Course_list = ({ navigation }) => {
  const [dataFromSate, setData] = useState([]);
  const [getList, setGetlist] = useState([]);
  const [NewData, setNewData] = useState("");


  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      setData(dataFromSate.filter((course) => course.id !== id));
      Alert.alert("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting document: ", error);
      Alert.alert("Error deleting course: ", error.message);
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.row} key={item.id}>
        <Text style={[styles.cell, { width: 60 }]}>
          {(index + 1).toString()}
        </Text>
        <Text style={[styles.cell, { width: 250 }]}>{item.Course_name}</Text>
        <Text style={[styles.cell, { width: 130 }]}>{item.Course_code}</Text>
        <Text style={[styles.cell, { width: 200 }]}>{item.Department}</Text>
        <Text style={[styles.cell, { width: 200 }]}>{item.Instructor_Name}</Text>
        <Text style={[styles.cell, { width: 200 }]}>{item.TimeSlot}</Text>

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
    const querySnapshot = await getDocs(collection(db, "courses"));
    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(courses);
  };
  useEffect(() => {
    getallCourses();
  }, []);

  const searchName = (input) => {
    let data = dataFromSate;
    let searchData = data.filter((item) => {
      return item.Course_name.toLowerCase().includes(input.toLowerCase());
    });
    setData(searchData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <TextInput
          label="Search"
          placeholder="Search course"
          onChangeText={(input) => {
            searchName(input);
          }}
          style={styles.SearchInput}
        />
      </View>

      <ScrollView horizontal>
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={[styles.Header_table_list, { width: 60 }]}>S.No</Text>
            <Text style={[styles.Header_table_list, { width: 250 }]}>
              Course Name
            </Text>
            <Text style={[styles.Header_table_list, { width: 130 }]}>
              Course Code
            </Text>
            <Text style={[styles.Header_table_list, { width: 200 }]}>
              Departements
            </Text>
            <Text style={[styles.Header_table_list, { width: 200 }]}>
              Instructor Name
            </Text>
            <Text style={[styles.Header_table_list, { width: 200 }]}>
              Time Slot
            </Text>
            <Text style={[styles.Header_table_list, { width: 200 }]}>
              Total 3
            </Text>
          </View>
          {/* <FlatList 
            data ={data}
            renderItem={renderItem}
            keyExtractor={(item, index) =>index.toString()}
            /> */}
          <FlatList
            data={dataFromSate}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>

      <Pressable
        style={styles.next_btn}
        onPress={() => {
          navigation.navigate("Course Registation");
        }}
      >
        <Text style={styles.btn_text}>Register</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Course_list;
