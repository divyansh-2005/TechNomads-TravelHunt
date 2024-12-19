import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Animated, KeyboardAvoidingView, ScrollView, Alert, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import * as ImagePicker from 'expo-image-picker';

export default function RegistrationScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
  const [hiddenLocation, setHiddenLocation] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [buttonAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'ComicSans': require('../../assets/fonts/ComicSansMS.ttf'), // Adjust path as needed
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handleRegister = () => {
    if (!name || !email || !location) {
      Alert.alert("Please fill out all required fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match!");
      return;
    }

    // Perform registration logic
    Alert.alert("Registration successful!");
    navigation.navigate('LandingScreen'); // Redirect to MainLocalTabs upon successful registration
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.uri);
    }
  };

  if (!fontsLoaded) {
    return null; // Optionally return a spinner here
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView contentContainerStyle={styles.innerContainer} keyboardShouldPersistTaps="handled">
        
        {/* Lottie Animation */}
        <LottieView
          source={require('../../assets/animations/local_reg.json')}  // Replace with your animation
          autoPlay
          loop
          style={styles.animation}
        />
        
        {/* Title */}
        <Text style={styles.title}>Register</Text>

        {/* Form Inputs */}
        <TextInput
          style={styles.input}
          placeholder="Name *"
          placeholderTextColor="#8E8E8E"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email *"
          placeholderTextColor="#8E8E8E"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Location *"
          placeholderTextColor="#8E8E8E"
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Hidden Location"
          placeholderTextColor="#8E8E8E"
          value={hiddenLocation}
          onChangeText={setHiddenLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Business Name"
          placeholderTextColor="#8E8E8E"
          value={businessName}
          onChangeText={setBusinessName}
        />

        <TextInput
          style={styles.input}
          placeholder="Business Description"
          placeholderTextColor="#8E8E8E"
          value={businessDescription}
          onChangeText={setBusinessDescription}
          multiline
        />

        {/* Upload Photo */}
        <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
          <Text style={styles.uploadText}>{photo ? "Change Photo" : "Upload Photo"}</Text>
        </TouchableOpacity>
        {photo && <Image source={{ uri: photo }} style={styles.imagePreview} />}

        {/* Upload Video */}
        <TouchableOpacity onPress={pickVideo} style={styles.uploadButton}>
          <Text style={styles.uploadText}>{video ? "Change Video" : "Upload Video"}</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleRegister}
          onPressIn={() => {
            Animated.spring(buttonAnim, {
              toValue: 0.9,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.spring(buttonAnim, {
              toValue: 1,
              useNativeDriver: true,
            }).start();
          }}
        >
          <Animated.View style={[styles.button, { transform: [{ scale: buttonAnim }] }]}>
            <LinearGradient
              colors={['#F8B400', '#FF6F61']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Register</Text>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up full height
    backgroundColor: '#FAF9F6',  // Off-white background
  },
  innerContainer: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'ComicSans',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 30,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    fontFamily: 'ComicSans',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,  // Shadow for Android
  },
  uploadButton: {
    backgroundColor: '#FF6F61',
    padding: 10,
    borderRadius: 25,
    marginVertical: 10,
  },
  uploadText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'ComicSans',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
  button: {
    width: '100%',
    marginTop: 20,
    borderRadius: 30,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    elevation: 5,  // Shadow effect for Android
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'ComicSans',
  },
  loginText: {
    marginTop: 20,
    fontSize: 14,
    color: '#FF6F61',
    textDecorationLine: 'underline',
    fontFamily: 'ComicSans',
  },
});
