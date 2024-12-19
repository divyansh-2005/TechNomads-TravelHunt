import React, { createContext, useState } from 'react';
import uuid from 'react-native-uuid'; // Make sure this is properly installed

// Create a context for trip data
export const CreateTripContext = createContext();

export const CreateTripProvider = ({ children }) => {
    const [tripData, setTripData] = useState([]); // Initialize as an array

    // Function to add a new trip with a unique ID
    const addTrip = (locationInfo, travelDates, travelerInfo) => {
        const newTrip = {
            id: uuid.v4(), // Generate a unique ID
            locationInfo,
            travelDates,
            travelerInfo,
        };
        console.log("Adding New Trip:", newTrip);
        setTripData((prev) => {
            console.log("Previous Trip Data:", prev); // Log previous data
            // Ensure we're returning a new array
            return [...prev, newTrip];
        });
    };

    return (
        <CreateTripContext.Provider value={{ tripData, addTrip, setTripData }}>
            {children}
        </CreateTripContext.Provider>
    );
};
