import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BACKEND_URL } from '@env';  // Import the backend URL from .env
import { UserContext } from '../../../context/UserContext';  // Import UserContext

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);  // State for loading

    const { setUsername: setContextUsername, setTotalPoints } = useContext(UserContext);  // Get setters from context

    // Fetch the user profile after login to get the totalPoints
    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const { username, totalPoints } = response.data;

            // Update the context with the username and totalPoints
            setContextUsername(username);
            setTotalPoints(totalPoints);
        } catch (error) {
            console.log('Error fetching user profile:', error);
        }
    };

    const handleLogin = async () => {
        setLoading(true);  // Show loader
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                username,
                password,
            });

            const { token } = response.data;
            await AsyncStorage.setItem('token', token);

            // Fetch the user's profile data after login
            await fetchUserProfile(token);

            // Navigate to LandingScreen after successful login
            navigation.replace('LandingScreen');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMessage('Invalid credentials');
            } else {
                setErrorMessage('Login failed');
                console.log('loginError:', error);
            }
        } finally {
            setLoading(false);  // Hide loader
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/images/profile_picture.png')} style={styles.logo} />
            <Text style={styles.title}>Travel Hunt</Text>

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

            {loading ? (
                <ActivityIndicator size="large" color="#F8B400" style={styles.loader} />
            ) : (
                <View style={styles.buttonContainer}>
                    <Button title="Login" onPress={handleLogin} color="#FF6F61" />
                </View>
            )}

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <Button 
                    title="Sign Up" 
                    onPress={() => navigation.navigate('Signup')} 
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
    logo: {
        width: 340,
        height: 340,
        alignSelf: 'center',
        marginBottom: 20
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

export default LoginScreen;
