import React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity,Image } from 'react-native';

const HelpCenter = () => {
  const faqs = [
    { question: 'How do I reset my password?', answer: 'Go to settings and click on "Reset Password".' },
    { question: 'How do I update my profile?', answer: 'Go to your profile and click on "Edit Profile".' },
    { question: 'Can I change my email address?', answer: 'Yes, you can update your email in the settings.' },
    { question: 'What types of cases can I find lawyers for?', answer: 'Our app covers a wide range of legal areas such as Family Law, Criminal Defense, Business Law, and more.' },
    { question: 'How does the appointment booking work?', answer: 'Visit the lawyer’s profile, check their availability, and book an appointment slot that suits you.' },
    { question: 'Is my data secure?', answer: 'Yes, we take security seriously. Your data is encrypted and stored securely.' },
 
  ];

  const renderFAQ = ({ item }) => (
    <View style={styles.faqContainer}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help Center</Text>
  <Image source={require("../assets/logo.png")} style={{ width: 70, height: 40, top:-30,left:-20 }} />

      <TextInput style={styles.searchBar} placeholder="Search for help..." />

      <FlatList
        data={faqs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderFAQ}
      />

      <TouchableOpacity style={styles.contactButton}>
        <Text style={styles.contactButtonText}>Contact Support</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    marginLeft: 50,
    fontSize: 27,
    color:"gray", 
    fontWeight: '700'
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  faqContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  answer: {
    fontSize: 16,
    color: '#555',
  },
  contactButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    marginBottom: 100,
  },
  contactButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HelpCenter;
