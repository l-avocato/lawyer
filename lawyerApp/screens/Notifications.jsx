import React from 'react';
import { View, Text, StyleSheet, FlatList ,Image} from 'react-native';

const Notifications = () => {
  // Sample data
  const notifications = [
    ' Your appointment with Attorney Smith is scheduled for tomorrow at 10 AM.',
    'Attorney Johnson has accepted your consultation request. You can now book an appointment.',
    'Attorney White has sent you a message. Tap to view and reply.',
    'Attorney Taylor has responded to your appointment request. Review the details and confirm.',
    'Attorney Turner has completed your document review. Tap to view the summary.',
    'You have a new message from Attorney Green regarding your ongoing case. Tap to respond.',
    // Add more notifications as needed
  ];

  return (
    <View style={styles.container}>
     <Image source={require("../assets/logo.png")} style={{ width: 70, height: 40 ,marginTop:90}} />
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🔔</Text>
            </View>
            <Text style={styles.notificationText}>{item}</Text>
          </View>
        )}
      />
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
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 20,
    color:"gray",
    marginTop: -40,
    marginLeft: 80,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: '#ffd700',
    borderRadius: 50,
    padding: 10,
    marginRight: 15,
  },
  icon: {
    fontSize: 20,
    color: '#1e1e1e',
  },
  notificationText: {
    flex: 1,
    fontSize: 18,
    color: '#1e1e1e',
  },
});

export default Notifications;
