import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';

import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import Instructors_list from './Instructors_list';
import LecturerMagnt from './LecturerMgmnt' 

const LectureScreen = ({navigation}) => {

    const [dataFromSate, setData] = useState([]);

    useEffect(() => {
      getallCourses();
    }, []);
  
    const getallCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const courses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(courses);
      } catch (error) {
        console.error("Error fetching courses: ", error);
      }
    };
  return (
    <SafeAreaView style={{ flex: 1 }}>
    {dataFromSate.length > 0 ? (
      <Instructors_list navigation={navigation} />
    ) : (
      <LecturerMagnt navigation={navigation} />
    )}
  </SafeAreaView>
  )
}

export default LectureScreen