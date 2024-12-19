import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TripCard = ({ trip }) => {
    // Use optional chaining and default values to avoid errors
    const locationName = trip.locationInfo?.name || 'Unknown Location';
    const travelerType = trip.travelerInfo?.type || 'Unknown Traveler';
    const peopleCount = trip.travelerInfo?.peopleCount || 'Unknown Count';
    const travelDates = trip.travelDates.length > 0 ? trip.travelDates.join(' to ') : 'No Dates Available';

    return (
        <View style={styles.card}>
            <Text style={styles.tripTitle}>{locationName}</Text>
            <Text>{travelerType} - {peopleCount}</Text>
            <Text>Dates: {travelDates}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
    },
    tripTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TripCard;
