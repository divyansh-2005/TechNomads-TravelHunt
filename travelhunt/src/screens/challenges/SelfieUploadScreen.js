import React, { useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfettiCannon from 'react-native-confetti-cannon';
import { UserContext } from '../../../context/UserContext'; // Import the context
import { BACKEND_URL } from '@env'; // Import the backend URL from .env

const SelfieUploadScreen = ({ navigation }) => {  // Accept navigation prop
  const { totalPoints, setTotalPoints } = useContext(UserContext); // Use UserContext
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading
  const [similarityScore, setSimilarityScore] = useState(null); // To store similarity score
  const [earnedPoints, setEarnedPoints] = useState(0); // To store earned points

  const sampleImageUrl = 'https://images.pexels.com/photos/8829637/pexels-photo-8829637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleImageUpload(result.assets[0].uri);
    }
  };

  const handleImageUpload = async (uri) => {
    setLoading(true); // Start loading
    const token = await AsyncStorage.getItem('token'); // Retrieve the token

    const formData = new FormData();
    formData.append('uploadedImage', {
      uri: uri,
      type: 'image/jpeg',
      name: 'uploaded_image.jpg',
    });
    formData.append('referenceImageUrl', sampleImageUrl);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/image/check-similarity`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { uploadedImageUrl, similarityScore } = response.data;
      setUploadedImageUrl(uploadedImageUrl);
      setSimilarityScore(similarityScore);

      const pointsEarned = Math.round(similarityScore); // Calculate points earned based on similarity
      setEarnedPoints(pointsEarned); // Store earned points
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);

    } catch (error) {
      Alert.alert('Error', 'Image similarity check failed');
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Add points from the similarity score when the button is clicked and update backend
  const addPoints = async () => {
    if (earnedPoints > 0) {
      const newTotalPoints = totalPoints + earnedPoints;
      setTotalPoints(newTotalPoints); // Update points in UserContext

      try {
        const token = await AsyncStorage.getItem('token');
        // Update points on backend
        const response = await axios.put(
          `${BACKEND_URL}/user/update`,
          { totalPoints: newTotalPoints }, // Send the new total points
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.status === 200) {
          Alert.alert('Success', `Points updated successfully!`);
          // Navigate to Challenges page after updating points
          navigation.navigate('Challenges');  // Change this to the name of your "Challenges" screen
        } else {
          throw new Error('Failed to update points.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to update points on the server.');
        console.error('Error updating points:', error);
      }
    } else {
      Alert.alert('No points to add. Upload a selfie first!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Match the Selfie!</Text>
      <Text style={styles.subtitle}>Upload a photo similar to the one shown below:</Text>

      <Image source={{ uri: sampleImageUrl }} style={styles.sampleImage} />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Upload your selfie</Text>
      </TouchableOpacity>

      {/* Add Points button */}
      <TouchableOpacity style={styles.button} onPress={addPoints}>
        <Text style={styles.buttonText}>Add Points</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#F8B400" style={styles.loader} />}

      {uploadedImageUrl && <Image source={{ uri: uploadedImageUrl }} style={styles.uploadedImage} />}

      {similarityScore !== null && (
        <Text style={styles.similarityText}>Similarity Score: {similarityScore.toFixed(2)}%</Text>
      )}

      {showConfetti && <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} />}
      {earnedPoints > 0 && <Text style={styles.pointsText}>You earned {earnedPoints} points!</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#212121',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#b3b3b3',
    marginBottom: 20,
  },
  sampleImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 10,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
    borderRadius: 10,
  },
  similarityText: {
    fontSize: 18,
    marginTop: 10,
    color: '#F8B400',
  },
  pointsText: {
    fontSize: 18,
    marginTop: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  loader: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F8B400',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#212121',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SelfieUploadScreen;
