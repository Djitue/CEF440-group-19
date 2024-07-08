import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';

import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import Registration_list from './Registration_list';
import StudentMgnt from './StudentMgmt'

const StudentScreen = ({navigation}) => {

    const [dataFromSate, setData] = useState([]);

    useEffect(() => {
      getallCourses();
    }, []);
  
    const getallCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        const courses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(courses);
      } catch (error) {
        console.error("Error fetching student: ", error);
      }
    };
  return (
    <SafeAreaView style={{ flex: 1 }}>
    {dataFromSate.length > 0 ? (
      <Registration_list navigation={navigation} />
    ) : (
      <StudentMgnt navigation={navigation} />
    )}
  </SafeAreaView>
  )
}

export default StudentScreen