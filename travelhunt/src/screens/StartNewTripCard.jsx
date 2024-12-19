import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StartNewTripCard = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Start a New Trip!</Text>
            <Text>Click the "+" button to add a new trip.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 20,
        margin: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default StartNewTripCard;
