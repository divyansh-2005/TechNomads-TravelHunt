import { View, StyleSheet, TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { AccessibilityInfo } from 'react-native';

export default function LandingScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'ComicSans': require('../../assets/fonts/ComicSansMS.ttf'), // Adjust the path as needed
      });
      setFontsLoaded(true);
    };

    loadFonts();

    // Check reduced motion setting
    const checkReducedMotion = async () => {
      const isReducedMotion = await AccessibilityInfo.isReduceMotionEnabled();
      setReducedMotion(isReducedMotion);
    };

    checkReducedMotion();
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally return a loading spinner
  }

  return (
    <View style={styles.container}>
      {/* Lottie Animation for Welcome */}
      <LottieView
        source={require('../../assets/animations/welcome.json')}  // Ensure this path is correct
        autoPlay
        loop
        style={styles.animation}
        useNativeDriver={!reducedMotion}  // Use native driver based on reduced motion setting
      />

      {/* Animated Start Button for Traveller Entry */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Main')} // Navigate to the Main for travelers
        activeOpacity={0.7}  // Slight opacity change when pressed
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={['#F8B400', '#FF6F61']}  // Sand Yellow to Coral Pink gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.startButton}
        >
          <Text style={styles.TravellerButtonText}>Traveller Entry</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Animated Start Button for Local Entry */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')} // Navigate to the MainLocalTabs for locals
        activeOpacity={0.7}  // Slight opacity change when pressed
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={['#F8B400', '#FF6F61']}  // Sand Yellow to Coral Pink gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.startButtontwo}
        >
          <Text style={styles.LocalButtonText}>Local Entry</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',  // Off-White background
  },
  animation: {
    width: 300,
    height: 300,
  },
  buttonContainer: {
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  startButton: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    borderRadius: 30,  // Rounded corners for a modern look
    elevation: 5,  // Shadow effect for Android
  },
  startButtontwo: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginTop: 10,
    borderRadius: 30,  // Rounded corners for a modern look
    elevation: 5,
  },
  TravellerButtonText: {
    color: '#FFFFFF',  // White text for contrast
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'ComicSans',  // Use the font loaded in the previous step
    textTransform: 'uppercase',  // Makes text stand out more
  },
  LocalButtonText: {
    color: '#FFFFFF',  // White text for contrast
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'ComicSans',  // Use the font loaded in the previous step
    textTransform: 'uppercase',
  }
});
