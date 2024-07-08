import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';

import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebase'; 

import Course_list from './Course_list';
import Course_Magmt from './Course_Magmt'

const CourseMagementScreen = ({navigation}) => {
    const [dataFromSate, setData] = useState([]);

    useEffect(() => {
      getallCourses();
    }, []);
  
    const getallCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'courses'));
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
        <Course_list navigation={navigation} />
      ) : (
        <Course_Magmt navigation={navigation} />
      )}
    </SafeAreaView>
    );
}

export default CourseMagementScreen