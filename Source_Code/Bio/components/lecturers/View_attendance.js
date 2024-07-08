import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView ,StyleSheet, Button, ScrollView} from "react-native";
import { getFirestore, collection, getDocs, updateDoc, update, doc } from "firebase/firestore";
import { db } from "../../firebase";

import styles from '../admin/styles'

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


const View_attendance = () => {
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchAttendance = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "attendance"));
            const attendanceList = querySnapshot.docs.map(doc => doc.data());
            setAttendanceRecords(attendanceList);
          } catch (error) {
            console.error("Error fetching attendance: ", error);
            Alert.alert("Error fetching attendance: ", error.message);
          }
        };
        fetchAttendance();
      }, []);

      useEffect(() => {
        const fetchStudents = async () => {
          const querySnapshot = await getDocs(collection(db, "students"));
          const studentList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setStudents(studentList);
        };
        fetchStudents();
      }, []);

      const getStudentDetails = (studentId) => {
        const student = students.find(s => s.id === studentId);
        return student ? { name: student.name, matricule: student.matricule } : { name: "Unknown", matricule: "Unknown" };
      };
     

     
      const renderAttendance = ({ item, index }) => (

        
      
        <View style={styles.row}>
           <Text style={[styles.cell, { width: 60 }]}>{(index + 1).toString()}</Text>
         
          <Text style={[styles.cell, { width: 60 }]}>{item.name || 'Unknown'}</Text>
          <Text style={[styles.cell, { width: 300 }]}> {item.matricule || 'Unknown'}</Text>
          <Text style={[styles.cell, { width: 200 }]}>{item.status || 'Unknown'}</Text>
          <Text style={[styles.cell, { width: 200 }]}>{item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Unknown'}</Text>
        </View>
       
      );


      const handleViewAttendance = async () => {
        const querySnapshot = await getDocs(collection(db, "attendance"));
        const attendanceRecords = querySnapshot.docs.map(doc => doc.data());
    
        // Generate PDF
        const html = `
          <html>
            <body>
              <h1>Attendance Records</h1>
              <table border="1">
                <tr>
                  <th>Name</th>
                  <th>Matrilcule</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
                ${attendanceRecords.map(record => `
                  <tr>
                    <td>${record.name}</td>
                    <td>${record.matricule}</td>
                    <td>${record.status}</td>
                     <td>${record.timestamp ? new Date(record.timestamp).toLocaleDateString() : "Unknown"}</td>
                  </tr>
                `).join('')}
              </table>
            </body>
          </html>
        `;
    
        const { uri } = await Print.printToFileAsync({ html });
        await Sharing.shareAsync(uri);
      };

      const handleResetAttendance = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "attendance"));
          for (const docSnapshot of querySnapshot.docs) {
            const docRef = docSnapshot.ref;
            await updateDoc(docRef, { status: "absent" });
          }
          // Alert.alert("Attendance status reset to absent.");
          Toast.show({
            type: 'succes',
            text1: 'Good!!',
            text2:  'Attendance status reset to be absent default',
            visibilityTime: 5000,
          })
        } catch (error) {
          console.error("Error resetting attendance: ", error);
          Alert.alert("Error resetting attendance: ", error.message);
        }
      };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View style={styles.listContainer}>
        <View style={styles.listHeader}>
          <Text style={[styles.Header_table_list, { width: 60 }]}>S.No</Text>
          <Text style={[styles.Header_table_list, { width: 300 }]}>Names</Text>
          <Text style={[styles.Header_table_list, { width: 150 }]}>
            Matricules
          </Text>
          <Text style={[styles.Header_table_list, { width: 200 }]}>
            Status
          </Text>
          <Text style={[styles.Header_table_list, { width: 200 }]}>
            Date
          </Text>
          </View>
          <FlatList
        data={attendanceRecords}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderAttendance}
      />
        </View>
      </ScrollView>
     
       <Button title="View Attendance" onPress={handleViewAttendance} />
       <Button title="Reset Attendance" onPress={handleResetAttendance} />
    </SafeAreaView>
  )
}

export default View_attendance

// const styles = StyleSheet.create({

//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 16,
//       },

// })