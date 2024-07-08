import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import styles from '../components/admin/styles';
import Screenstyles from './screenStyle';
import { auth, signInWithEmailAndPassword, onAuthStateChanged, db } from '../firebase/index'; // Ensure correct import
import { getFirestore, setDoc, doc, query, collection, where, getDocs } from 'firebase/firestore';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const navigateBasedOnRole = async (email) => {
    const userRef = query(collection(db, 'users'), where('email', '==', email));
    const userSnapshot = await getDocs(userRef);

    if (userSnapshot.empty) {
      Alert.alert('Error', 'Invalid credentials');
      return;
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.role === 'admin' && email === 'roland01@gmail.com') {
      navigation.navigate('AdminDashboard');
    } else if (userData.role === 'lecturer') {
      navigation.navigate('LecturerDash', { name: userData.name });
    } else {
      Alert.alert('Error', 'Invalid role');
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // If login is successful, navigate based on user role
      navigateBasedOnRole(email);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <SafeAreaView>
      <View style={Screenstyles.Image_login_box}>
        <Image
          source={require('../assets/img/cover.png')}
          style={Screenstyles.Image_login}
        />
      </View>

      <View style={Screenstyles.inputbox}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          label='Email'
          value={email}
          onChangeText={setEmail}
          placeholder='Enter email'
          style={styles.inputText}
          autoCapitalize='none'
          autoComplete='none'
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          label='Password'
          value={password}
          onChangeText={setPassword}
          placeholder='Enter password'
          style={styles.inputText}
          secureTextEntry
        />
        <Pressable style={Screenstyles.forgot_pass}>
          <Text style={Screenstyles.forgot_pass_text}>Forgot password?</Text>
        </Pressable>

        <Pressable style={Screenstyles.btnBox} onPress={handleLogin}>
          <Text style={Screenstyles.btn}>Login</Text>
        </Pressable>

        <Text style={Screenstyles.or}>Or</Text>

        <Pressable
          style={Screenstyles.login_with}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Image
            source={require('../assets/img/google.png')}
            style={Screenstyles.oo}
          />
          <Text style={Screenstyles.login_with_text}>Continue with Google</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
