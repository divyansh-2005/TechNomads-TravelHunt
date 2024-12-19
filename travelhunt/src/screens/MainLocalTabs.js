import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';  // Import LottieView

const MainLocalTabs = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* Lottie Animation */}
      <LottieView
        source={require('../../assets/animations/Local_page.json')} 
        autoPlay
        loop
        style={styles.animation}
      />

      {/* Registration Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Registration')}  // Navigate to RegistrationScreen
      >
        <Text style={styles.buttonText}>Go to Registration</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9F6',
  },
  animation: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,  // Shadow for Android
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MainLocalTabs;
