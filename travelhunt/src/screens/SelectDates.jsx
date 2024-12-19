import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { CreateTripContext } from '../../context/CreateTripContext';

const SelectDates = () => {
    const { addTrip, tripData } = useContext(CreateTripContext); // Use addTrip and tripData from context
    const navigation = useNavigation();
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const handleSaveDates = () => {
        const travelDates = [startDate.toDateString(), endDate.toDateString()];
        console.log("Saving Travel Dates:", travelDates); // Log travel dates
    
        // Use addTrip from context
        addTrip(
            tripData.locationInfo, // Using the location info from the tripData context
            travelDates,
            tripData.travelerInfo // Using traveler info from tripData context
        );
    
        // Navigate to MyTrip (correct name)
        navigation.navigate('MyTrip');
    };
    

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, [navigation]);

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#fff' }]}>
            <View style={styles.themeToggleContainer}>
                <Text style={{ color: isDarkTheme ? '#fff' : '#000', fontSize: 20 }}>Dark Mode</Text>
                <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
            </View>

            {/* Start Date Picker */}
            <View style={styles.pickerContainer}>
                <Text style={[styles.label, { color: isDarkTheme ? '#fff' : '#000' }]}>Start Date</Text>
                <TouchableOpacity onPress={() => setShowStartPicker(true)}>
                    <Text style={{ color: isDarkTheme ? '#fff' : '#000' }}>
                        {startDate.toDateString()}
                    </Text>
                </TouchableOpacity>
                {showStartPicker && (
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            if (date) {
                                setStartDate(date);
                            }
                            setShowStartPicker(false); // Hide picker after selection
                        }}
                        themeVariant={isDarkTheme ? 'dark' : 'light'}
                    />
                )}
            </View>

            {/* End Date Picker */}
            <View style={styles.pickerContainer}>
                <Text style={[styles.label, { color: isDarkTheme ? '#fff' : '#000' }]}>End Date</Text>
                <TouchableOpacity onPress={() => setShowEndPicker(true)}>
                    <Text style={{ color: isDarkTheme ? '#fff' : '#000' }}>
                        {endDate.toDateString()}
                    </Text>
                </TouchableOpacity>
                {showEndPicker && (
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            if (date) {
                                setEndDate(date);
                            }
                            setShowEndPicker(false); // Hide picker after selection
                        }}
                        themeVariant={isDarkTheme ? 'dark' : 'light'}
                    />
                )}
            </View>

            <TouchableOpacity onPress={handleSaveDates} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Dates</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    pickerContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    themeToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SelectDates;
