import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Bar } from "react-native-progress";
import NavTab from "./NavTab";
import axios from "axios";
import config from "./ipv";
import PhaseDetails from "./PhaseDetails";

const GradientProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>{`${(progress * 100).toFixed(
        0
      )}% Complete`}</Text>
    </View>
  );
};

const CaseDetails = ({ navigation, route }) => {
  const [animatedValue] = useState(new Animated.Value(1));
  const [selectedTab, setSelectedTab] = useState("phases");
  const [casePhases, setCasePhases] = useState([]);
  const { case: caseItem } = route.params;

  const getPhases = async () => {
    try {
      const response = await axios.get(
        `http://${config}:1128/api/phase/allPhase/${caseItem.id}`
      );
      setCasePhases(response.data.phases);
      console.log("this is response phases", response.data);
    } catch (error) {
      console.log("error fetching phases", error);
    }
  };

  // const handleCardPress = (phase) => {
  //   navigation.navigate("phaseDetails", { phase })
  // };

  const handleCardRelease = () => {
    // Add animation logic here
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: false, // You need to set useNativeDriver to false for certain animations
    }).start();
  };

  // Sample data for case phases and progress
  // const casePhases = [
  //   { id: 1, phase: 'Investigation', progress: 0.5 },
  //   { id: 2, phase: 'Court Hearing', progress: 0.2 },
  //   { id: 3, phase: 'Discovery', progress: 0.8 },
  //   { id: 4, phase: 'Negotiation', progress: 0.4 },
  //   { id: 5, phase: 'Trial', progress: 0.6 },
  //   { id: 6, phase: 'Appeal', progress: 0.3 }
  // ];

  // Calculate the overall progress by averaging phase progresses
  const overallProgress = 0.57;

  // Sample payment history data
  // const paymentHistory = [
  //   { id: 1, date: "2023-01-01", amount: 500 },
  //   { id: 2, date: "2023-02-15", amount: 300 },
  //   { id: 3, date: "2023-03-30", amount: 700 },
  // ];

  useEffect(() => {
    getPhases();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 70, height: 40, top: 75, left: -20 }}
      />

      <Text style={styles.title}>Case Details</Text>

      <View style={styles.segmentControl}>
        <TouchableOpacity
          style={[
            styles.segmentItem,
            selectedTab === "phases" && styles.selectedSegment,
          ]}
          onPress={() => setSelectedTab("phases")}
        >
          <Text
            style={[
              styles.segmentText,
              selectedTab === "phases" && styles.selectedSegmentText,
            ]}
          >
            Phases
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segmentItem,
            selectedTab === "payment" && styles.selectedSegment,
          ]}
          onPress={() => setSelectedTab("payment")}
        >
          <Text
            style={[
              styles.segmentText,
              selectedTab === "payment" && styles.selectedSegmentText,
            ]}
          >
            Payment
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conditional rendering based on the selected tab */}
      {selectedTab === "phases" && (
        <>
          {/* Customized Progress Bar */}
          <GradientProgressBar progress={overallProgress} />

          {casePhases.map((phase) => (
            <TouchableWithoutFeedback
              key={phase.id}
              onPress={() =>
                navigation.navigate("phaseDetails", { phase: phase })
              }
              // onPressIn={navigation.navigate("PhaseDetails", { phase })}
              onPressOut={handleCardRelease}
            >
              <Animated.View
                style={[
                  styles.card,
                  {
                    transform: [{ scale: animatedValue }],
                  },
                ]}
              >
                <Text style={styles.phaseTitle}>{phase.label}</Text>
                <Text style={styles.progress}>{`20% Complete`}</Text>
                {/* <View style={styles.navTabContainer}><NavTab/></View> */}
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </>
      )}

      {selectedTab === "payment" && (
        <View style={styles.paymentHistoryContainer}>
          <Text style={styles.paymentHistoryTitle}>Payment History</Text>
          {casePhases
            .filter((phase) => phase.price !== 0)
            .map((phase) => (
              <View key={phase.id} style={styles.paymentItem}>
                <View style={styles.paymentItemHeader}>
                  <Text style={styles.paymentDate}>{phase.label}</Text>
                  <Text style={styles.paymentDate}>
                    {phase.createdAt.slice(0, 10)}
                  </Text>
                  <Text style={styles.paymentAmount}>{`$${phase.price}`}</Text>
                  <Text style={{ color: phase.IsPaid ? "green" : "red" }}>
                    {phase.IsPaid ? "Paid" : "Not Paid"}
                  </Text>
                </View>
                <View style={styles.paymentItemDetails}></View>
              </View>
            ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 27,
    color: "gray",
    fontWeight: "700",
    marginLeft: 50,
    marginTop: 40,
    marginBottom: 70,
  },
  progressBarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressBarBackground: {
    width: "100%",
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#D5B278",
  },
  progressText: {
    fontSize: 18,
    color: "gray",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#292929",
    padding: 15,
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  progress: {
    fontSize: 18,
    color: "white",
    marginTop: 10,
  },
  navTabContainer: {
    flex: 1,
    top: 120,
    height: 0,
  },
  navTab: {
    position: "absolute",
    width: "100%",
  },
  segmentControl: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  segmentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#D5B278",
  },
  selectedSegment: {
    backgroundColor: "#292929",
  },
  segmentText: {
    color: "white",
    fontWeight: "bold",
  },
  selectedSegmentText: {
    color: "#D5B278",
  },
  paymentHistoryContainer: {
    marginTop: 20,
  },
  paymentHistoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentItem: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paymentItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  paymentDate: {
    fontSize: 16,
    color: "#292929",
    fontWeight: "bold",
  },
  paymentAmount: {
    fontSize: 18,
    color: "#292929",
    fontWeight: "bold",
  },
});

export default CaseDetails;
