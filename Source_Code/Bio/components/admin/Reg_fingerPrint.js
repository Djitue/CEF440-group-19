import { View, Text, Pressable, Image, onPress, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './styles'
 

const Reg_fingerPrint = ({navigation}) => {
    

  return (
    <SafeAreaView  style={styles.container}>
    {/* <View style={styles.header} >
     <Text style={styles.title}>Student registration</Text>
     </View> */}
     <View style={styles.fingerprint_Box}>
        <Pressable onPress={() => setTimeout(()=>{navigation.navigate("Registration list")},2000)}  style={styles.fingerprint_image_container}>
            <Image source={require('../../assets/img/fingerprint.jpg')} style={styles.fingerprint_image} />
        </Pressable>
       
     </View>
     
     {/* <Pressable style={styles.back_btn} onPress={}>
       <Text style={styles.btn_text}>back</Text>
     </Pressable> */}
     
   </SafeAreaView>
  )
}

export default Reg_fingerPrint