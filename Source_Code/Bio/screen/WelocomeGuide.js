import { View, Text , SafeAreaView, Pressable, Image} from 'react-native'
import React from 'react'
import Screenstyles from './screenStyle'
import styles from '../components/admin/styles'


const WelocomeGuide = ({navigation}) => {
  return (
    <SafeAreaView>
        <View style={Screenstyles.Welcome}>
        <Image source={require("../assets/img/cover.png")} style={Screenstyles.Image} />
          <Text style={Screenstyles.Welcometitle}> <Text   style={Screenstyles.logo}>Hello!</Text></Text>
          <Text style={Screenstyles.Welcometitle}> Keep track of your attendance effortlessly  </Text>
          <Text style={Screenstyles.Welcometitle}>  and stay organised with our </Text>
          <Text style={Screenstyles.Welcometitle_Bold}> Biometric Student Attendance app </Text>
         
    
          
          
        </View>
      <View style={styles.box}>
          <Pressable style={Screenstyles.btnBox}  onPress={() => {
              navigation.navigate("Login");
            }}>
            <Text style={Screenstyles.btn}>Login</Text>
          </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default WelocomeGuide