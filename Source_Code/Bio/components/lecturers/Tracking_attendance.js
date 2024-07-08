import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { db, auth } from "../../firebase";

import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import Toast from "react-native-toast-message";





const Tracking_attendance = ({navigation}) => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
    const [attendance, setAttendance] = useState({});

   


    useEffect(() => {
        const fetchCourses = async () => {
          const querySnapshot = await getDocs(collection(db, "courses"));
          const courseList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCourses(courseList);
        };
        fetchCourses();
      }, []);
   
  
    useEffect(() => {
      const fetchStudents = async () => {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudents(studentList);
      };
      fetchStudents();
    }, []);
  
    const handleMarkAttendance = async (studentId) => {
        if (currentStudentIndex >= students.length) {
            Alert.alert("All students have been processed.");
            Toast.show({
              type: 'success',
              text1: 'Nice one!!',
              text2: 'All students have been processed',
              visibilityTime: 5000,
            })
            return;
          }
      
          const student = students[currentStudentIndex];
      
          try {
            const result = await LocalAuthentication.authenticateAsync({
              promptMessage: 'Verify your fingerprint',
            });
      
            if (result.success) {
              const timestamp = new Date().toISOString();
              const attendanceRecord = {
                studentId: student.id,
                name: student.name,
                matricule: student.matricule,
                timestamp: timestamp,
                status: "present",
              };
      
              await addDoc(collection(db, "attendance"), attendanceRecord);
              setAttendance({ ...attendance, [student.id]: "present" });
              // Alert.alert(`Attendance marked as present for ${student.name}`);
              Toast.show({
                type: 'success',
                text1: 'Well done!!',
                text2: `Attendance marked as present for ${student.name}`,
                visibilityTime: 5000,
              })
      
              if (currentStudentIndex < students.length - 1) {
                setCurrentStudentIndex(currentStudentIndex + 1);
              } else {
                // Alert.alert("All students have been marked.");
                Toast.show({
                  type: 'sucess',
                  text1: 'Congrats!!',
                  text2:  'All students have been marked.',
                  visibilityTime: 5000,
                })
              }
            } else {
              // Alert.alert("Fingerprint authentication failed");
              Toast.show({
                type: 'error',
                text1: 'Oops!!',
                text2:  'Fingerprint authentication failed',
                visibilityTime: 5000,
              })
            }
          } catch (e) {
            console.error("Error marking attendance: ", e);
            Alert.alert("Error marking attendance: ", e.message);
          }
    };

    const renderStudent = ({ item }) => (
        <View style={styles.itemContainer}>
          {/* <Text style={styles.itemText}>{item.name || 'Unknown'}</Text> */}
          <Text style={styles.itemText}>{item.name} ({item.matricule})</Text>
          <Button
            title="Mark Attendance"
            onPress={() => handleMarkAttendance(item.id)}
          />
          <Text style={styles.statusText}>
            Status: {attendance[item.id] || "absent"}
          </Text>
        </View>
      );
      const renderCourse = ({ item }) => (
        <View style={styles.itemContainer}>
          {/* <Text style={styles.itemText}>Course: {item.courseName}</Text> */}
          <Button
            title="Mark Attendance"
            onPress={() => handleMarkAttendance(item.id)}
          />
        </View>
      );
  
    return (
        <SafeAreaView style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={renderCourse}
      />
    </SafeAreaView>
    );
}

export default Tracking_attendance


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },

})