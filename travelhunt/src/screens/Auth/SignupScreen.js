// src/screens/Auth/SignupScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BACKEND_URL } from '@env';  // Import the backend URL from .env

const SignupScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);  // State for loading

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setLoading(true);  // Show loader
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
                username,
                password
            });

            const { token } = response.data;
            await AsyncStorage.setItem('token', token);
            // console.log('Signup successful: ', token);
            navigation.replace('LandingScreen');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('User already exists');
            } else if (error.response.status === 504) {
                setErrorMessage('Server is down');
            } else {
                setErrorMessage('Signup failed');
                console.log("signupError:", error);
            }
        } finally {
            setLoading(false);  // Hide loader
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

            <TextInput 
                style={styles.input} 
                placeholder="Username" 
                value={username} 
                onChangeText={setUsername} 
                placeholderTextColor="#B0B0B0"
            />
            <TextInput 
                style={styles.input} 
                placeholder="Password" 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry 
                placeholderTextColor="#B0B0B0"
            />
            <TextInput 
                style={styles.input} 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChangeText={setConfirmPassword} 
                secureTextEntry 
                placeholderTextColor="#B0B0B0"
            />

            {loading ? (
                <ActivityIndicator size="large" color="#F8B400" style={styles.loader} />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Sign Up" onPress={handleSignup} color="#FF6F61" />
                </View>
            )}

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Already have an account?</Text>
                <Button 
                    title="Login" 
                    onPress={() => navigation.navigate('Login')} 
                    color="#F8B400" 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        padding: 20, 
        backgroundColor: '#212121' 
    },
    title: { 
        fontSize: 24, 
        marginBottom: 20, 
        textAlign: 'center', 
        color: '#F8B400',  
        fontWeight: 'bold'
    },
    input: { 
        borderWidth: 1, 
        borderColor: '#B0B0B0', 
        padding: 12, 
        marginBottom: 15, 
        borderRadius: 8, 
        fontSize: 16, 
        color: '#E0E0E0',  
        backgroundColor: '#1E1E1E'
    },
    error: { 
        color: '#FF6F61', 
        marginBottom: 20, 
        textAlign: 'center' 
    },
    buttonContainer: {
        marginBottom: 20,
        borderRadius: 8
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupText: {
        color: '#E0E0E0',
        marginRight: 5
    },
    loader: {
        marginBottom: 20
    }
});

export default SignupScreen;