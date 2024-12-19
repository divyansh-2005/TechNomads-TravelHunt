import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for background
import * as Animatable from 'react-native-animatable'; // Import Animatable for animations

export default function Level1Screen() {
  const navigation = useNavigation(); // Access navigation

  return (
    <LinearGradient
      colors={['#1c1c1c', '#333', '#1c1c1c']} // Gradient background
      style={styles.container}
    >
      {/* Title with animation */}
      <Animatable.Text animation="fadeInDown" duration={2000} style={styles.title}>
        Welcome to Level 1
      </Animatable.Text>

      {/* Level 1 Content */}
      <Animatable.Image
        animation="pulse" // Image animation
        easing="ease-in-out"
        iterationCount="infinite"
        source={require('../../assets/badges/cultural_master.png')} // Placeholder image for Level 1
        style={styles.levelImage}
      />

      {/* Level Description */}
      <Text style={styles.description}>
        This is the beginning of your adventure. Explore, learn, and get ready for the JOURNEY AHEAD!
      </Text>

      {/* Custom Button with navigation */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MyTrip')} // Change navigation target to MyTrip
      >
        <LinearGradient
          colors={['#FF6347', '#FFAB40']} // Button gradient colors
          style={styles.buttonBackground}
        >
          <Text style={styles.buttonText}>Start New Trip</Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// Define your styles for Level 1 screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFAB40',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#FF6347',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  levelImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#FFAB40',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden', // Ensures the gradient doesn't overflow the button
  },
  buttonBackground: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
});
