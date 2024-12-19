import React, { useContext, useState } from 'react';
import { View, Text, Switch, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { CreateTripContext } from '../../context/CreateTripContext';
import StartNewTripCard from './StartNewTripCard';
import TripCard from './addTrip/TripCard';

const MyTrips = () => {
    const { tripData } = useContext(CreateTripContext);
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const navigation = useNavigation();

    const navigateToNewTrip = () => {
        navigation.navigate('SearchPlace');
    };

    // New function to navigate back to the homepage
    const navigateToHomepage = () => {
        navigation.navigate('HomeScreen'); // Change 'HomeScreen' to your actual homepage screen name
    };

    return (
        <View style={{ padding: 25, paddingTop: 55, backgroundColor: isDarkTheme ? '#000' : '#fff', height: '100%' }}>
            <View style={styles.toggleContainer}>
                <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 20, color: isDarkTheme ? '#fff' : '#000' }}>
                    {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
                </Text>
                <Switch value={isDarkTheme} onValueChange={(value) => setIsDarkTheme(value)} />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 35, color: isDarkTheme ? '#fff' : '#000' }}>
                    My Trips
                </Text>
                <TouchableOpacity onPress={navigateToNewTrip}>
                    <Ionicons name="add-circle" size={50} color={isDarkTheme ? '#fff' : 'black'} />
                </TouchableOpacity>
            </View>

            {Array.isArray(tripData) && tripData.length === 0 ? ( // Ensure tripData is an array
                <StartNewTripCard />
            ) : (
                <FlatList
                    data={tripData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <TripCard trip={item} />}
                />
            )}

            {/* Back to Homepage Button styled as a submit button */}
            <TouchableOpacity onPress={navigateToHomepage} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back to Homepage</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#007BFF', // Change this color as needed
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Outfit-Bold',
    },
});

export default MyTrips;
