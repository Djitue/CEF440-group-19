import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { db } from '../firebase/index';
import { setDoc, doc } from 'firebase/firestore';

const SignwithNumber = ({navigation}) => {

    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [matricule, setMatricule] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('lecturer');

    const validatePhoneNumber = (number) => {
        const phoneRegex = /^\+[1-9]\d{1,14}$/;
        return phoneRegex.test(number);
      };
      const handleSignup = async () => {
        if (!validatePhoneNumber(phoneNumber)) {
          Alert.alert('Invalid phone number format. Please include the country code.');
          return;
        }
    
        try {
          // Save user data in Firestore
          const userData = {
            phoneNumber,
            name,
            email,
            matricule,
            department,
            role, // Include role in user data
          };
          await setDoc(doc(db, 'users', phoneNumber), userData);
    
          Alert.alert('Signup successful! Now you can login.');
          navigation.navigate('LoginWithOtp', { phoneNumber });
        } catch (error) {
          Alert.alert('Error during signup', error.message);
        }
      };
        
      return (
        <View style={styles.container}>
          <Text>Signup using Phone Number</Text>
          <TextInput
            placeholder="Phone number with Country code"
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoCompleteType="tel"
            style={styles.textInput}
            value={phoneNumber}
          />
          <TextInput
            placeholder="Name"
            onChangeText={setName}
            style={styles.textInput}
            value={name}
          />
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCompleteType="email"
            style={styles.textInput}
            value={email}
          />
          <TextInput
            placeholder="Matricule"
            onChangeText={setMatricule}
            style={styles.textInput}
            value={matricule}
          />
          <TextInput
            placeholder="Department"
            onChangeText={setDepartment}
            style={styles.textInput}
            value={department}
          />
          <Text>Select Role:</Text>
          <TouchableOpacity onPress={() => setRole('lecturer')} style={[styles.roleButton, role === 'lecturer' && styles.selectedRole]}>
            <Text>Lecturer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setRole('admin')} style={[styles.roleButton, role === 'admin' && styles.selectedRole]}>
            <Text>Admin</Text>
          </TouchableOpacity>
    
          <TouchableOpacity onPress={handleSignup}>
            <Text>Signup</Text>
          </TouchableOpacity>
        </View>
      );
}

export default SignwithNumber

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#c5c5c5',
    },
    textInput: {
      marginTop: 10,
      marginBottom: 10,
      width: '80%',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    roleButton: {
      padding: 10,
      marginVertical: 5,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#000',
      width: '80%',
      alignItems: 'center',
    },
    selectedRole: {
      backgroundColor: '#ccc',
    },
  });