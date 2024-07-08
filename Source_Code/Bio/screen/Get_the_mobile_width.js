import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';

// Get the device dimensions
const { width, height } = Dimensions.get('window');

const isTablet = width >= 768; // A simple way to distinguish tablets from phones

const Get_the_mobile_width = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Responsive Design</Text>
      <Text style={styles.subtitle}>This is a cool {isTablet ? 'Tablet' : 'Phone'} layout</Text>
      <View style={styles.content}>
        <Text style={styles.contentText}>
          Content adjusts to screen size.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: isTablet ? 20 : 10,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: isTablet ? 32 : 24,
    fontWeight: 'bold',
    marginBottom: isTablet ? 20 : 10,
  },
  subtitle: {
    fontSize: isTablet ? 24 : 18,
    marginBottom: isTablet ? 20 : 10,
  },
  content: {
    width: '90%',
    padding: isTablet ? 20 : 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  contentText: {
    fontSize: isTablet ? 18 : 14,
    textAlign: 'center',
  },
});

export default Get_the_mobile_width;