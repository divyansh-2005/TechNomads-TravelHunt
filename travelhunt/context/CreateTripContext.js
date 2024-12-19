import React, { createContext, useState } from 'react';
import uuid from 'react-native-uuid';

// Create a context for trip data
export const CreateTripContext = createContext();

export const CreateTripProvider = ({ children }) => {
    const [tripData, setTripData] = useState([]); // Ensure this starts as an array

    // Function to add a new trip
    const addTrip = (locationInfo, travelDates, travelerInfo) => {
        const newTrip = {
            id: Date.now(),  // Generate a unique ID
            locationInfo,
            travelDates,
            travelerInfo,
        };

        console.log("Adding New Trip:", newTrip);

        setTripData((prev) => {
            console.log("Previous Trip Data:", prev); // Log previous data for debugging
            // Ensure we're returning a new array
            if (!Array.isArray(prev)) {
                console.error("tripData is not an array:", prev); // Error log if not an array
                return [newTrip]; // Fallback to just the new trip
            }
            return [...prev, newTrip]; // Properly append new trip
        });
    };

    return (
        <CreateTripContext.Provider value={{ tripData, addTrip, setTripData }}>
            {children}
        </CreateTripContext.Provider>
    );
};
