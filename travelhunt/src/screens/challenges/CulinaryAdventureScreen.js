import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { UserContext } from '../../../context/UserContext'; // Import UserContext
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env'; // Import the backend URL from .env

export default function CulinaryAdventureScreen({ navigation }) {
  const { totalPoints, setTotalPoints } = useContext(UserContext); // Access UserContext

  // Function to mark task as done, add points, update backend, and navigate
  const markAsDone = async () => {
    const newPoints = totalPoints + 10;  // Add 10 points
    setTotalPoints(newPoints);  // Update points in context

    try {
      const token = await AsyncStorage.getItem('token');
      // Update points on backend
      const response = await axios.put(
        `${BACKEND_URL}/user/update`,
        { totalPoints: newPoints },  // Send the new total points
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        // If the points update is successful, show success alert
        Alert.alert('Success!', 'You have earned 10 points!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Challenges'), // Navigate to Challenges screen
          },
        ]);
      } else {
        throw new Error('Failed to update points.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update points on the server.');
      console.error('Error updating points:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Culinary Adventure: Try a Local Cuisine</Text>
      <Text style={styles.description}>
        Taste the flavors of the local cuisine. Share your experience with the community!
      </Text>
      
      {/* Mark as Done button */}
      <Button title="Mark as Done" onPress={markAsDone} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
