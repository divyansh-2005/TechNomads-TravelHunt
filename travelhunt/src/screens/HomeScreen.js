import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { Svg, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native'; // Add navigation hook

// Predefined badge images mapping
const badgeImages = {
  explorer: require('../../assets/badges/explorer.png'),
  adventurer: require('../../assets/badges/adventurer.jpg'),
  conqueror: require('../../assets/badges/conqueror.jpg'),
  legend: require('../../assets/badges/legend.jpg'),
  master: require('../../assets/badges/master.jpg'),
};

// Reusable LevelButton Component
const LevelButton = ({ level, unlockedLevel, handleLevelUnlock, badgeName, navigation, screen }) => {
  const isUnlocked = unlockedLevel >= level;
  const isCurrentLevel = unlockedLevel === level;

  return (
    <View style={styles.levelRow}>
      <Animatable.View
        animation="bounceIn"
        delay={100 * level}
        style={[
          styles.levelButton,
          isUnlocked ? styles.unlocked : styles.locked,
          isCurrentLevel && styles.currentLevel,
        ]}
      >
        <TouchableOpacity
          disabled={!isUnlocked}
          onPress={() => {
            if (isUnlocked) {
              navigation.navigate(screen); // Navigate to specific screen
              handleLevelUnlock(level + 1, badgeName); // Unlock the next level
            }
          }}
        >
          <Text style={styles.levelText}>Level {level}</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

// Define HomeScreen component
export default function HomeScreen() {
  const [unlockedLevel, setUnlockedLevel] = useState(1); // Keep track of unlocked levels
  const [showBadgePopup, setShowBadgePopup] = useState(false); // Modal visibility
  const [badgeInfo, setBadgeInfo] = useState({ level: 1, badgeName: 'Explorer' }); // Badge information

  const navigation = useNavigation(); // Access navigation

  // Function to handle level unlocking
  const handleLevelUnlock = (level, badgeName) => {
    if (unlockedLevel < level) {
      setUnlockedLevel(level); // Unlock the next level
      setBadgeInfo({ level, badgeName }); // Set badge info
      setShowBadgePopup(true); // Show popup when level is unlocked
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Levels Section */}
      <View style={styles.levelsContainer}>
        <Text style={styles.sectionTitle}>Start Journey!!!</Text>

        {/* Render Level Buttons */}
        <LevelButton
          level={1}
          unlockedLevel={unlockedLevel}
          handleLevelUnlock={handleLevelUnlock}
          badgeName="Explorer"
          navigation={navigation}
          screen="Level1Screen" // Navigate to Level 1 screen
        />
        <Svg height="100" width="120" style={styles.line}>
          <Path d="M60,0 C50,50 100,50 70,100" stroke="#FFAB40" strokeWidth="2" strokeDasharray="5,5" fill="none" />
        </Svg>

        <LevelButton
          level={2}
          unlockedLevel={unlockedLevel}
          handleLevelUnlock={handleLevelUnlock}
          badgeName="Adventurer"
          navigation={navigation}
          screen="Level2Screen" // Navigate to Level 2 screen
        />
        <Svg height="100" width="60" style={styles.line}>
          <Path d="M10,-2 C0,70 70,50 55,100" stroke="#FFAB40" strokeWidth="2" strokeDasharray="5,5" fill="none" />
        </Svg>

        <LevelButton
          level={3}
          unlockedLevel={unlockedLevel}
          handleLevelUnlock={handleLevelUnlock}
          badgeName="Conqueror"
          navigation={navigation}
          screen="Level3Screen" // Navigate to Level 3 screen
        />
        <Svg height="100" width="120" style={styles.line}>
          <Path d="M50,0 C50,50 100,50 70,100" stroke="#FFAB40" strokeWidth="2" strokeDasharray="5,5" fill="none" />
        </Svg>

        <LevelButton
          level={4}
          unlockedLevel={unlockedLevel}
          handleLevelUnlock={handleLevelUnlock}
          badgeName="Legend"
          navigation={navigation}
          screen="Level4Screen" // Navigate to Level 4 screen
        />
      </View>

      {/* Badge Popup Modal */}
      {/* <Modal visible={showBadgePopup} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Animatable.View animation="zoomIn" style={styles.modalContent}>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalMessage}>
              You've unlocked {badgeInfo.badgeName} badge for completing Level {badgeInfo.level}.
            </Text>
            <Image source={badgeImages[badgeInfo.badgeName.toLowerCase()]} style={styles.badgeImage} />
            <Button title="Close" onPress={() => setShowBadgePopup(false)} />
          </Animatable.View>
        </View>
      </Modal> */}
    </ScrollView>
  );
}

// Define your styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 10,
  },
  levelsContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    color: '#FFAB40',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  levelRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  levelButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  unlocked: {
    backgroundColor: 'lightgreen',
  },
  locked: {
    backgroundColor: '#333',
  },
  currentLevel: {
    borderColor: '#FFD700', // Gold glowing ring for the current level
    borderWidth: 6,
    backgroundColor: 'orange',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  line: {
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#2e2e2e',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    color: '#FFAB40',
    fontWeight: 'bold',
  },
  modalMessage: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 10,
  },
  badgeImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
});
