import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React from "react";
import styles from "../components/admin/styles";
import Screenstyles from "./screenStyle";



const LoginAs = ({navigation}) => {
  return (
    <SafeAreaView>
        <View style={Screenstyles.Welcome}>
        <Image source={require("../assets/img/cover.png")} style={Screenstyles.Image} />
          <Text style={Screenstyles.Welcometitle}>Welcome to <Text   style={Screenstyles.logo}>BioTrack</Text></Text>
          <Text style={Screenstyles.Welcometitle}>Are you an  <Text   style={Screenstyles.subtitle}>Admin</Text> or  <Text   style={Screenstyles.subtitle}>Instructor</Text>?</Text>
    
          
          
        </View>
      <View style={styles.box}>
        <Pressable style={styles.card}>
          <Image source={require("../assets/img/admin.png")} />
          <Text
            style={styles.CardText}
            onPress={() => {
              navigation.navigate("Welcome back");
            }}
          >
            Admin
          </Text>
        </Pressable>
        <View style={styles.card}>
          <Image source={require("../assets/img/instructor.png")} />
          <Text
            style={styles.CardText}
            onPress={() => {
              navigation.navigate("Welcome back");
            }}
          >
            Instructor
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginAs;
