import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useNavigation } from '@react-navigation/native';
import solo from '../../assets/images/solo-traveller.png';
import couple from '../../assets/images/couple.png';
import family from '../../assets/images/family.png';
import friends from '../../assets/images/friend.png';

const SelectTraveler = () => {
    const { setTripData } = useContext(CreateTripContext);
    const navigation = useNavigation();
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    const OptionList = [
        {
            id: 1,
            title: 'Just Me',
            desc: 'A sole traveler in exploration',
            icon: solo,
            people: '1 person',
        },
        {
            id: 2,
            title: 'A Couple',
            desc: 'Two travelers in tandem',
            icon: couple,
            people: '2 people',
        },
        {
            id: 3,
            title: 'Family',
            desc: 'A group of fun-loving adventurers',
            icon: family,
            people: '3 to 5 people',
        },
        {
            id: 4,
            title: 'Friends',
            desc: 'A bunch of thrill-seekers',
            icon: friends,
            people: '4 to 10 people',
        },
    ];

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, [navigation]);

    const handleOptionSelect = (item) => {
        setTripData((prev) => ({
            ...prev,
            travelerInfo: {
                type: item.title,
                peopleCount: item.people,
            },
        }));
        navigation.navigate('SelectDates'); // Ensure this screen is correctly registered
    };

    const renderOption = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.optionContainer,
                { backgroundColor: isDarkTheme ? '#333' : '#fff', borderColor: isDarkTheme ? '#555' : '#ddd' }
            ]}
            onPress={() => handleOptionSelect(item)}
        >
            {item.icon && <Image source={item.icon} style={styles.icon} />}
            <View style={styles.optionDetails}>
                <Text style={[styles.optionTitle, { color: isDarkTheme ? '#fff' : '#000' }]}>{item.title}</Text>
                <Text style={[styles.optionDesc, { color: isDarkTheme ? '#ccc' : 'gray' }]}>{item.desc}</Text>
                <Text style={[styles.optionPeople, { color: isDarkTheme ? '#ccc' : 'gray' }]}>{item.people}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: isDarkTheme ? '#000' : '#fff' }]}>
            <View style={styles.themeToggleContainer}>
                <Text style={{ color: isDarkTheme ? '#fff' : '#000', fontSize: 20 }}>Dark Mode</Text>
                <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
            </View>
            <FlatList
                data={OptionList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderOption}
                contentContainerStyle={{ paddingBottom: 30 }}
                ListEmptyComponent={<Text style={{ color: isDarkTheme ? '#fff' : '#000' }}>No options available.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    optionContainer: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionDetails: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionDesc: {
        fontSize: 14,
    },
    optionPeople: {
        fontSize: 12,
    },
    icon: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    themeToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});

export default SelectTraveler;
