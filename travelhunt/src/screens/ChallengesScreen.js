import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable'; // Animatable Import
import { MotiView } from 'moti'; // Moti Import
import { Canvas, Circle } from '@shopify/react-native-skia'; // Skia Import
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const challenges = [
  { id: '1', title: 'Photo Quest: Capture the Hidden Waterfall', progress: 100, sustainability: false },
  { id: '2', title: 'Cultural Task: Attend a Local Festival', progress: 100, sustainability: false },
  { id: '3', title: 'Explorer: Visit 5 New Locations', progress: 100, sustainability: false },
  { id: '4', title: 'Culinary Adventure: Try a Local Cuisine', progress: 100, sustainability: false },
  { id: '5', title: 'Local Life: Talk to a Local About Their Life', progress: 100, sustainability: false },
  { id: '6', title: 'Learn a Local Slang Word', progress: 100, sustainability: false },
  { id: '7', title: 'Sustainability Check: Have You Cleaned the Environment?', progress: 100, sustainability: true },
  { id: '8', title: 'Recycling Engagement: Have You Contacted a Local Recycling Person?', progress: 100, sustainability: true },
  { id: '9', title: 'Plastic Reduction: Are You Reducing Plastic Use?', progress: 100, sustainability: true },
  { id: '10', title: 'Support Local: Do You Support Local Sustainable Businesses?', progress: 100, sustainability: true },
];

const ChallengeItem = ({ title, index, progress, sustainability }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const [pressed, setPressed] = useState(false);
  const navigation = useNavigation(); // Use useNavigation

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: index * 200,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, index]);

  const onPress = () => {
    Animated.sequence([  // Animate on press
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setPressed(!pressed);

    // Navigation logic for each challenge
    switch (title) {
      case 'Photo Quest: Capture the Hidden Waterfall':
        navigation.navigate('SelfieUploadScreen');
        break;
      case 'Cultural Task: Attend a Local Festival':
        navigation.navigate('CulturalTaskScreen');
        break;
      case 'Explorer: Visit 5 New Locations':
        navigation.navigate('ExplorerScreen');
        break;
      case 'Culinary Adventure: Try a Local Cuisine':
        navigation.navigate('CulinaryAdventureScreen');
        break;
      case 'Local Life: Talk to a Local About Their Life':
        navigation.navigate('LocalLifeScreen');
        break;
      case 'Learn a Local Slang Word':
        navigation.navigate('LearnSlangScreen');
        break;
      case 'Sustainability Check: Have You Cleaned the Environment?':
      case 'Recycling Engagement: Have You Contacted a Local Recycling Person?':
      case 'Plastic Reduction: Are You Reducing Plastic Use?':
      case 'Support Local: Do You Support Local Sustainable Businesses?':
        navigation.navigate('SustainabilityScreen');
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      {/* Animatable View for bounce effect on press */}
      <Animatable.View animation="fadeInUp" duration={1000}>
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
        >
          <Animated.View style={[styles.challenge, sustainability ? styles.sustainabilityMargin : null, { transform: [{ scale }], opacity: animatedValue }]}>
            <Text style={styles.challengeText}>{title}</Text>
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
          </Animated.View>
        </MotiView>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function ChallengesScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const parallaxAnim = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -30],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    // Bounce animation for character
    Animated.loop(
      Animated.sequence([  
        Animated.timing(bounceAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  return (
    <View style={styles.container}>
      {/* Background Animation */}
      <LottieView
        source={require('../../assets/animations/background-animation.json')}
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />

      {/* Character Animation with Parallax Effect */}
      <Animated.View style={{ transform: [{ translateY: parallaxAnim }, { scale: bounceAnim }] }}>
        <LottieView
          source={require('../../assets/animations/character-animation.json')}
          autoPlay
          loop
          style={styles.characterAnimation}
        />
      </Animated.View>

      <Text style={styles.title}>Available Challenges</Text>

      {/* Skia Animation Example */}
      <Canvas style={styles.skiaAnimation}>
        <Circle cx={75} cy={75} r={50} color="lightblue" />
      </Canvas>

      {/* Animated FlatList */}
      <Animated.FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <ChallengeItem title={item.title} index={index} progress={item.progress} sustainability={item.sustainability} />
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingBottom: 100 }} // Adjust padding to reduce gap
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#FAF9F6', // Off-White
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 0, // Reduced margin to remove gap
    textAlign: 'center',
    color: '#2F4F4F', // Dark Slate Gray
  },
  challenge: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sustainabilityMargin: {
    borderLeftWidth: 10,
    borderLeftColor: '#4CAF50', // Green color for sustainability challenges
  },
  challengeText: {
    fontSize: 18,
    color: '#2F4F4F', // Dark Slate Gray
  },
  characterAnimation: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  backgroundAnimation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF6F61', // Coral Pink
  },
  skiaAnimation: {
    height: 0,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
