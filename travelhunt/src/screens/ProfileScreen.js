import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, Modal, useColorScheme, Share, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../../context/UserContext'; // Import UserContext

const userBadges = [
  { id: '1', title: 'Explorer', icon: require('../../assets/badges/explorer.png') },
  { id: '2', title: 'Cultural Master', icon: require('../../assets/badges/cultural_master.png') },
  { id: '3', title: 'Photographer', icon: require('../../assets/badges/photographer.png') },
];

const userData = {
  username: 'Nomad Sharma',
  experiences: [
    { id: '1', title: 'Hiked the Himalayas', challenge: 'Completed a 7-day trek.', details: 'The trek included stunning views of snow-capped peaks and visits to local villages. Checkout the @TravelHunt app now.' },
    { id: '2', title: 'Cultural Immersion in Japan', challenge: 'Participated in a tea ceremony.', details: 'I learned about the history and significance of tea in Japanese culture. Checkout the @TravelHunt app now.' },
  ],
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { username, totalPoints } = useContext(UserContext); // Destructure from UserContext
  const [badgeModalVisible, setBadgeModalVisible] = useState(false);
  const [experienceModalVisible, setExperienceModalVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const colorScheme = useColorScheme();

  const handleBadgePress = (badge) => {
    setSelectedBadge(badge);
    setBadgeModalVisible(true);
  };

  const handleExperiencePress = (experience) => {
    setSelectedExperience(experience);
    setExperienceModalVisible(true);
  };

  const closeBadgeModal = () => {
    setBadgeModalVisible(false);
    setSelectedBadge(null);
  };

  const closeExperienceModal = () => {
    setExperienceModalVisible(false);
    setSelectedExperience(null);
  };

  const shareProfile = async () => {
    try {
      await Share.share({
        message: `Check out my travel profile! I'm ${username} and have earned ${totalPoints} points!`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const shareBadge = async () => {
    if (selectedBadge) {
      try {
        await Share.share({
          message: `I just earned the "${selectedBadge.title}" badge! 🎉 Check out my travel adventures!`,
        });
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileBox}>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.totalPoints}>
            Total Points: {totalPoints}
          </Text>
          <Button title="Invite Friends" onPress={shareProfile} color="#007bff" />
        </View>
      </View>

      <Text style={styles.subTitle}>Badges:</Text>
      <View style={styles.badgesContainer}>
        {userBadges.map((badge) => (
          <TouchableOpacity key={badge.id} onPress={() => handleBadgePress(badge)} style={styles.badgeItem}>
            <View style={styles.badge}>
              <Image source={badge.icon} style={styles.badgeImage} />
              <Text style={styles.badgeTitle}>{badge.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subTitle}>Your Experiences:</Text>
      <View style={styles.countriesContainer}>
        {userData.experiences.map((experience) => (
          <TouchableOpacity key={experience.id} onPress={() => handleExperiencePress(experience)} style={styles.experienceItem}>
            <View style={styles.experience}>
              <Text style={styles.experienceTitle}>{experience.title}</Text>
              <Text style={styles.experienceChallenge}>{experience.challenge}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.progressContainer}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={badgeModalVisible}
        onRequestClose={closeBadgeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedBadge && (
              <>
                <Image source={selectedBadge.icon} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedBadge.title}</Text>
                <TouchableOpacity style={styles.button} onPress={shareBadge}>
                  <Text style={styles.buttonText}>Share Badge</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={closeBadgeModal}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={experienceModalVisible}
        onRequestClose={closeExperienceModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedExperience && (
              <>
                <Text style={styles.modalTitle}>{selectedExperience.title}</Text>
                <Text style={styles.modalChallenge}>{selectedExperience.challenge}</Text>
                <Text style={styles.modalDetails}>{selectedExperience.details}</Text>
                <TouchableOpacity style={styles.button} onPress={closeExperienceModal}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  username: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  totalPoints: {
    fontSize: 18,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  badgeItem: {
    alignItems: 'center',
    marginVertical: 15,
  },
  badge: {
    alignItems: 'center',
  },
  badgeImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  badgeTitle: {
    marginTop: 10,
    fontSize: 14,
  },
  experienceItem: {
    marginVertical: 10,
  },
  experience: {
    marginBottom: 10,
  },
  experienceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  experienceChallenge: {
    fontSize: 14,
  },
  countriesContainer: {
    flexDirection: 'column',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalChallenge: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalDetails: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
