// components/MapComponent.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const MapComponent = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [route, setRoute] = useState(null);
    const [routeInfo, setRouteInfo] = useState(null); // For travel time and distance

    const locationsData = [
        {
            id: 1,
            name: "Kashi Vishwanath Temple",
            latitude: 25.3109,
            longitude: 83.0076,
            description: "One of the most famous Hindu temples dedicated to Lord Shiva.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Kashi_Vishwanath_Temple.jpg"
        },
        {
            id: 2,
            name: "Sarnath",
            latitude: 25.3763,
            longitude: 83.0220,
            description: "An important Buddhist site where Gautama Buddha gave his first sermon.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Sarnath%2C_Buddhist_site.jpg"
        },
        {
            id: 3,
            name: "Dasaswamedh Ghat",
            latitude: 25.3076,
            longitude: 83.0104,
            description: "One of the main ghats on the Ganges River, famous for its Ganga Aarti.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Dasaswamedh_Ghat.jpg"
        }
    ];

    useEffect(() => {
        const fetchLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLoading(false);
                return;
            }

            let userLocation = await Location.getCurrentPositionAsync({});
            setLocation(userLocation.coords);
            setLoading(false);
        };

        fetchLocation();
    }, []);

    // Fetch route data
    const getDirections = async (destination) => {
        const apiKey = 'tQrmsXVhpvTOGs8EJAkxpymGxPpHieTS'; // Replace with your actual TomTom API key
        if (!location) return;

        const start = `${location.latitude},${location.longitude}`;
        const end = `${destination.latitude},${destination.longitude}`;
        const url = `https://api.tomtom.com/routing/1/calculateRoute/${start}:${end}/json?key=${apiKey}`;
        
        try {
            const response = await axios.get(url);
            if (response.data.routes.length > 0) {
                const steps = response.data.routes[0].legs[0].points.map(point => ({
                    latitude: point.latitude,
                    longitude: point.longitude
                }));

                const travelTime = response.data.routes[0].summary.travelTimeInSeconds;
                const distance = response.data.routes[0].summary.lengthInMeters;

                setRoute(steps);
                setRouteInfo({
                    duration: Math.round(travelTime / 60), // Convert to minutes
                    distance: Math.round(distance / 1000)  // Convert to kilometers
                });
            }
        } catch (error) {
            console.error("Error fetching directions:", error);
        }
    };

    if (loading || !location) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {/* User's current location */}
                <Marker
                    coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                    title="Your Location"
                    pinColor="blue"
                />

                {/* Markers for locations */}
                {locationsData.map((loc) => (
                    <Marker
                        key={loc.id}
                        coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                        title={loc.name}
                        description={loc.description}
                        onPress={() => {
                            setSelectedLocation(loc);
                            getDirections(loc);
                        }}
                    >
                        <Callout>
                            <View style={styles.callout}>
                                <Text style={styles.calloutTitle}>{loc.name}</Text>
                                <Text style={styles.calloutDescription}>{loc.description}</Text>
                                {loc.imageUrl && (
                                    <Image source={{ uri: loc.imageUrl }} style={styles.calloutImage} />
                                )}
                            </View>
                        </Callout>
                    </Marker>
                ))}

                {/* Polyline to show the route */}
                {route && <Polyline coordinates={route} strokeColor="#000" strokeWidth={3} />}
            </MapView>

            {/* Display route information like time and distance */}
            {routeInfo && (
                <View style={styles.infoContainer}>
                    <Text style={styles.locationName}>Estimated Time: {routeInfo.duration} min</Text>
                    <Text style={styles.locationName}>Distance: {routeInfo.distance} km</Text>
                </View>
            )}

            {/* Display selected location info */}
            {selectedLocation && (
                <View style={styles.infoContainer}>
                    <Text style={styles.locationName}>{selectedLocation.name}</Text>
                    <Text>{selectedLocation.description}</Text>
                    <Image source={{ uri: selectedLocation.imageUrl }} style={styles.image} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    callout: {
        width: 200,
        alignItems: 'center',
    },
    calloutTitle: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    calloutDescription: {
        fontSize: 12,
        marginTop: 5,
    },
    calloutImage: {
        width: 150,
        height: 100,
        marginTop: 5,
        borderRadius: 5,
    },
    infoContainer: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    locationName: {
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 150,
        marginTop: 5,
        borderRadius: 5,
    },
});

export default MapComponent;