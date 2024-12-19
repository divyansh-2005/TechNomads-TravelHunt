import { View, Text, StyleSheet, FlatList, Animated, Dimensions, RefreshControl } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { BACKEND_URL } from '@env';

const { width } = Dimensions.get('window');

const Leaderboard = () => {
  const [scores, setScores] = useState([]); // State to hold the fetched scores
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/leaderboard/global`);
      const data = await response.json();
      setScores(data); // Update the state with the fetched scores
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();

    // Animation on mount
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      friction: 2,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  // Function to handle refresh action
  const handleRefresh = async () => {
    setRefreshing(true); // Set refreshing to true when the refresh action starts
    await fetchData(); // Re-fetch the data
    setRefreshing(false); // Set refreshing to false after the data has been fetched
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.headerTitle}>Leaderboard</Text>

        {/* Podium for top 3 */}
        <View style={styles.podiumContainer}>
          {scores[1] && (
            <View style={styles.podiumPosition2}>
              <Text style={styles.podiumName}>{scores[1].username}</Text>
              <Text style={styles.podiumRank}>{scores[1].totalPoints}</Text>
            </View>
          )}
          {scores[0] && (
            <View style={styles.podiumPosition1}>
              <Text style={styles.podiumName}>{scores[0].username}</Text>
              <Text style={styles.podiumRank}>{scores[0].totalPoints}</Text>
            </View>
          )}
          {scores[2] && (
            <View style={styles.podiumPosition3}>
              <Text style={styles.podiumName}>{scores[2].username}</Text>
              <Text style={styles.podiumRank}>{scores[2].totalPoints}</Text>
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={scores.slice(3)}
        renderItem={({ item, index }) => (
          <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.cardDataContainer}>
              <Text style={styles.cardIndex}>{index + 4}</Text>
              <Text style={styles.cardTitle}>{item.username}</Text>
            </View>
            <View style={styles.cardRankContainer}>
              <Text style={styles.cardRankTitle}>{item.totalPoints}</Text>
            </View>
          </Animated.View>
        )}
        keyExtractor={(item) => item._id.toString()}

        // Add RefreshControl for pull-to-refresh
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Set the refreshing state
            onRefresh={handleRefresh} // Trigger the handleRefresh function when pulled
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingBottom: 10,
  },
  topContainer: {
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    padding: 20,
    paddingBottom: 40,
    marginBottom: 20,
    backgroundColor: "#FFD700",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: -20,
  },
  podiumPosition1: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFD700",
    padding: 20,
    borderRadius: 15,
    flex: 1,
    maxWidth: width * 0.3,
    elevation: 10,
  },
  podiumPosition2: {
    alignItems: "center",
    backgroundColor: "#C0C0C0",
    padding: 15,
    borderRadius: 15,
    flex: 1,
    maxWidth: width * 0.25,
    marginRight: 10,
    elevation: 8,
  },
  podiumPosition3: {
    alignItems: "center",
    backgroundColor: "#CD7F32",
    padding: 15,
    borderRadius: 15,
    flex: 1,
    maxWidth: width * 0.25,
    marginLeft: 10,
    elevation: 8,
  },
  podiumName: {
    color: "#333",
    fontSize: 16,
    fontWeight: '600',
  },
  podiumRank: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  card: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  cardDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  cardIndex: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  cardRankContainer: {},
  cardRankTitle: {
    color: "#FF4500",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Leaderboard;
