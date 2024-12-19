import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const CoinAnimation = () => (
  <LottieView
    source={require('../../assets/animations/coin.json')} // Adjust the path as needed
    autoPlay
    loop
    style={styles.coinAnimation}
  />
);

const ConnectComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Earn more coins by connecting</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Connect with Instagram <CoinAnimation /></Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Connect with Facebook <CoinAnimation /></Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Connect with Other Platforms <CoinAnimation /></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative', // Allows positioning of the coin animation
    padding: 20,
    backgroundColor: '#FAF9F6', // Off-White background
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F4F4F', // Dark Slate Gray for the heading
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%', // Make buttons take full width
  },
  button: {
    backgroundColor: '#F8B400', // Sand Yellow for buttons
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15, // Space between buttons
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#008080', // Teal border for contrast
    flexDirection: 'row', // Align text and animation in a row
    justifyContent: 'space-between', // Space between text and animation
  },
  buttonText: {
    color: '#2F4F4F', // Dark Slate Gray text
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Allow text to take available space
    textAlign: 'center', // Center align text
  },
  coinAnimation: {
    width: 50, // Increased width for better visibility
    height: 50, // Increased height for better visibility
    marginLeft: 10, // Space between text and animation
  },
});

export default ConnectComponent;
