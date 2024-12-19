import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';

export default function EditProfileScreen({ navigation }) {
  const [username, setUsername] = useState('Nomad Sharma');
  const [bio, setBio] = useState('Adventurer, traveler, and couch surfer!');
  const [location, setLocation] = useState('Current Location');
  const [preferences, setPreferences] = useState('No preferences yet');
  const [profilePhoto, setProfilePhoto] = useState(require('../../assets/profile.jpg')); // Sample profile photo

  const saveProfile = () => {
    // Save the profile changes logic here
    alert('Profile Updated');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Change Username:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Bio:</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Location:</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Preferences:</Text>
      <TextInput
        style={styles.input}
        value={preferences}
        onChangeText={setPreferences}
        multiline
        numberOfLines={2}
      />

      <Text style={styles.label}>Change Profile Photo:</Text>
      <Image source={profilePhoto} style={styles.profileImage} />
      <Button title="Change Photo" onPress={() => alert('Profile Photo change functionality here')} color="#F8B400" />

      {/* Gap added here */}
      <View style={styles.gap} />

      <Button title="Save Profile" onPress={saveProfile} color="#FF6F61" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF9F6', // Off-White background
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2F4F4F', // Dark Slate Gray for text
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#FFFFFF', // White background for inputs
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  gap: {
    height: 20, // Adjust the height as needed for your gap
  },
});
