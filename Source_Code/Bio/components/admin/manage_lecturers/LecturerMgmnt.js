import { View, Text, FlatList, SafeAreaView, TextInput , Image, Button, Pressable} from 'react-native'
import React from 'react'
import styles from '../styles'


const LecturerMgmnt = ({navigation}) => {
  return (
    <SafeAreaView  style={styles.container}>
     
    <View style={styles.search}>
      <TextInput label="Search" placeholder='Search lecturer' style={styles.SearchInput} />
    </View>
    <View style={styles.SearchList}>
     <View style={styles.image_box}>
      <Image source={require('../../../assets/img/att2.png')} style={styles.image} />
      <Text style={styles.subText}>No  registered lecturers</Text>
      <Text style={styles.subText}>Click on <Text style={styles.Textanchor} >Register</Text> to register students</Text>
     </View>
    </View>
    <Pressable style={styles.next_btn}  onPress={() =>{navigation.navigate('Lecturer List')}}>
     <Text style={styles.btn_text}>Register</Text>
   </Pressable>
  </SafeAreaView>
  )
}

export default LecturerMgmnt