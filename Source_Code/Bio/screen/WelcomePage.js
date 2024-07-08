import { View, Text, StyleSheet , Image} from 'react-native'

import React, { useEffect } from 'react'

const WelcomePage = ({navigation}) => {
  useEffect(() =>{
    const timer = setTimeout(() =>{
      navigation.replace('Signup00')
    }, 10000)
    return () => clearTimeout(timer);
  }, [navigation])
  return (
    <View style={styles.container}>
      <Image source ={require('../assets/img/cover.png')} />
    </View>
  )
}

export default WelcomePage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f6f9ff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    subtitle1:{
       fontSize: 50,
       fontWeight: '500',
       color: '#404040'
    },
    subtitle2:{
        fontSize: 60,
       fontWeight: '600',
       color: '#012970',
       marginBottom: 20,
    },
    btn:{
       alignItems: 'center',
       justifyContent: 'center',
       elevation: 1,
       borderRadius: 5,
       backgroundColor: "#4154f1",
       
    },
    text:{
        fontSize: 25,
        lineHeight: 21,
        padding: 15,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#fff'
    }
  });
  