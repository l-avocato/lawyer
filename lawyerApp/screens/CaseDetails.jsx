import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableWithoutFeedback, Animated, TouchableOpacity } from 'react-native';
import { Bar } from 'react-native-progress';
import NavTab from './NavTab';

const GradientProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBarContainer}>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>{`${(progress * 100).toFixed(0)}% Complete`}</Text>
    </View>
  );
};

const CaseDetails = ({navigation}) => {
  const [animatedValue] = useState(new Animated.Value(1));
  const [selectedTab, setSelectedTab] = useState('phases'); 

  const handleCardPress = () => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: false, 
    }).start(() => navigation.navigate("phaseDetails"));
  };

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
  const casePhases = [
    { id: 1, phase: 'Investigation', progress: 0.5 },
    { id: 2, phase: 'Court Hearing', progress: 0.2 },
    { id: 3, phase: 'Discovery', progress: 0.8 },
    { id: 4, phase: 'Negotiation', progress: 0.4 },
    { id: 5, phase: 'Trial', progress: 0.6 },
    { id: 6, phase: 'Appeal', progress: 0.3 }
  ];

  // Calculate the overall progress by averaging phase progresses
  const overallProgress = casePhases.reduce((sum, phase) => sum + phase.progress, 0) / casePhases.length;

  // Sample payment history data
  const paymentHistory = [
    { id: 1, date: '2023-01-01', amount: 500 },
    { id: 2, date: '2023-02-15', amount: 300 },
    { id: 3, date: '2023-03-30', amount: 700 },
  ];

  return (
    <ScrollView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={{ width: 70, height: 40, top: 75, left: -20 }} />

      <Text style={styles.title}>Case Details</Text>

      {/* Segment control for switching between phases and payment */}
      <View style={styles.segmentControl}>
        <TouchableOpacity
          style={[styles.segmentItem, selectedTab === 'phases' && styles.selectedSegment]}
          onPress={() => setSelectedTab('phases')}
        >
          <Text style={[styles.segmentText, selectedTab === 'phases' && styles.selectedSegmentText]}>Phases</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentItem, selectedTab === 'payment' && styles.selectedSegment]}
          onPress={() => setSelectedTab('payment')}
        >
          <Text style={[styles.segmentText, selectedTab === 'payment' && styles.selectedSegmentText]}>Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional rendering based on the selected tab */}
      {selectedTab === 'phases' && (
        <>
          {/* Customized Progress Bar */}
          <GradientProgressBar progress={overallProgress} />

          {casePhases.map((phase) => (
            <TouchableWithoutFeedback
              key={phase.id}
              onPressIn={handleCardPress}
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
                <Text style={styles.phaseTitle}>{phase.phase}</Text>
                <Text style={styles.progress}>{`${(phase.progress * 100).toFixed(0)}% Complete`}</Text>
                {/* <View style={styles.navTabContainer}><NavTab/></View> */}
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </>
      )}

{selectedTab === 'payment' && (
        <View style={styles.paymentHistoryContainer}>
          <Text style={styles.paymentHistoryTitle}>Payment History</Text>
          {paymentHistory.map((payment) => (
            <View key={payment.id} style={styles.paymentItem}>
              <View style={styles.paymentItemHeader}>
                <Text style={styles.paymentDate}>{payment.date}</Text>
                <Text style={styles.paymentAmount}>{`$${payment.amount}`}</Text>
              </View>
              <View style={styles.paymentItemDetails}>
                {/* Add more payment details as needed */}
              </View>
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
    backgroundColor: '#F0F0F0', 
  },
  title: {
    fontSize: 27,
    color: 'gray',
    fontWeight: '700',
    marginLeft: 50,
    marginTop: 40,
    marginBottom: 70,
  },
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBarBackground: {
    width: '100%',
    height: 20,
    backgroundColor: '#E0E0E0', 
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#D5B278', 
  },
  progressText: {
    fontSize: 18,
    color: 'gray', 
    marginTop: 10,
  },
  card: {
    backgroundColor: '#292929',
    padding: 15,
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  progress: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
  navTabContainer: {
    flex: 1, 
    top:120,
    height:0,
  },
  navTab: {
    position: 'absolute',
    width: '100%',
  },
  segmentControl: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  segmentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#D5B278',
  },
  selectedSegment: {
    backgroundColor: '#292929',
  },
  segmentText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectedSegmentText: {
    color: '#D5B278',
  },
  paymentHistoryContainer: {
    marginTop: 20,
  },
  paymentHistoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentItem: {
    backgroundColor: '#D5B278',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  paymentItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentDate: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  paymentAmount: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default CaseDetails;
