import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';
import { UserContext } from '../../../context/UserContext'; // Import UserContext

export default function CulturalTaskScreen({ navigation }) {
  const { totalPoints, setTotalPoints } = useContext(UserContext); // Access UserContext

  const [title, setTitle] = useState('MIT Hackathon'); // Default title for task
  const [description, setDescription] = useState('Good experience'); // Default description for task
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);

  // Fetch the current location on component mount
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High, // High accuracy
      });
      setLocation(currentLocation);
    };

    getLocation();  // Automatically get location when the component loads
  }, []);

  // Handle image picking from the user's library
  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Square aspect ratio
      quality: 1,
    });
    if (!result.canceled) {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri, // Original image URI
        [{ resize: { width: 800 } }], // Resize the image to a smaller size
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG } // Compress the image
      );
      setImage(manipulatedImage.uri);  // Set the compressed image URI
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error("Error retrieving token from AsyncStorage:", error);
      return null;
    }
  };

  // Handle blog form submission
  const handleSubmit = async () => {
    if (!title || !description || !image || !location) {
      Alert.alert('Please fill in all fields, select an image, and ensure location is retrieved!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    formData.append('location', JSON.stringify({
      type: 'Point',
      coordinates: [location.coords.longitude, location.coords.latitude]
    }));

    const token = await getToken();

    if (!token) {
      Alert.alert('User is not authenticated. Please log in.');
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/blog`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        Alert.alert('Blog post created successfully!');

        // Add 50 points after successful submission
        const newPoints = totalPoints + 50; // Add 50 points
        setTotalPoints(newPoints);

        // Reset fields
        setTitle('');
        setDescription('');
        setImage(null);
        setLocation(null); // Reset location
      }
    } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);

      if (error.response) {
        Alert.alert('Error creating blog post', error.response.data.message || 'Please try again later.');
      } else {
        Alert.alert('Error creating blog post', error.message);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cultural Task: Attend a Local Festival</Text>
      <Text style={styles.description}>
        Attend a local festival and immerse yourself in the culture. Capture moments to share your experience!
      </Text>
      
      <Text style={styles.subTitle}>Create a Blog for your Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Pick an image from camera roll" onPress={handleImagePick} />
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <View style={styles.buttonContainer}>
        <Button title="Submit Blog and Earn 50 Points" onPress={handleSubmit} color="#008080" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF9F6',  // Off-White background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F4F4F',  // Dark Slate Gray text color
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#2F4F4F',  // Dark Slate Gray text color
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F4F',  // Dark Slate Gray text color
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2F4F4F',  // Dark Slate Gray border
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: '#2F4F4F',  // Dark Slate Gray text color
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#008080',  // Teal border for image preview
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 10,
  }
});
