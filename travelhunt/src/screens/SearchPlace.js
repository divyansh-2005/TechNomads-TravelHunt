import React, { useContext, useState } from 'react';
import { View, Text, Switch, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { CreateTripContext } from '../../context/CreateTripContext';

const SearchPlace = () => {
    const { tripData, setTripData } = useContext(CreateTripContext); // Ensure tripData is accessed
    const [query, setQuery] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const navigation = useNavigation();

    const places = [
        { id: '1', name: 'Shimla' },
        { id: '2', name: 'Varanasi' },
        { id: '3', name: 'Agra' },
        { id: '4', name: 'Nagpur' },
        { id: '5', name: 'Mumbai' },
        { id: '6', name: 'Jammu' },
    ];

    const filteredPlaces = places.filter((place) =>
        place.name.toLowerCase().includes(query.toLowerCase())
    );

    const handlePlaceSelect = (place) => {
        // Set the selected place information to the context
        setTripData((prev) => ({
            ...prev,
            locationInfo: {
                name: place.name,
            },
        }));
        navigation.navigate('SelectTraveler'); // Navigate to the SelectTraveler screen
    };

    const navigateBack = () => {
        navigation.navigate('MyTrip'); // Navigate back to MyTrips screen
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
                    Search Places
                </Text>
                <TouchableOpacity onPress={navigateBack}>
                    <Ionicons name="arrow-back" size={30} color={isDarkTheme ? '#fff' : 'black'} />
                </TouchableOpacity>
            </View>

            <TextInput
                style={[styles.input, { color: isDarkTheme ? '#fff' : '#000' }]}
                placeholder="Search Places"
                placeholderTextColor={isDarkTheme ? '#ccc' : '#666'}
                value={query}
                onChangeText={setQuery}
            />
            <FlatList
                data={filteredPlaces}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handlePlaceSelect(item)}>
                        <Text style={[styles.placeText, { color: isDarkTheme ? '#fff' : '#000' }]}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={<Text style={{ color: isDarkTheme ? '#fff' : '#000' }}>No places found.</Text>}
            />
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
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    placeText: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default SearchPlace;
