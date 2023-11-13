import React from 'react';
import { ScrollView, Text, StyleSheet , Image} from 'react-native';

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Image source={require("../assets/logo.png")} style={{ width: 70, height: 40 ,marginTop:90}} />
      <Text style={styles.title}>Privacy Policy</Text>

      <Text style={styles.header}>Section 1: Introduction</Text>
      <Text style={styles.text}>
        Welcome to L'Avocato . We care about your privacy and are committed to
        protecting your personal information. This Privacy Policy explains how we collect, use, and
        disclose information when you use our App.
      </Text>

      <Text style={styles.header}>Section 2: Information We Collect</Text>
      <Text style={styles.text}>
        We collect various types of information, including but not limited to:
        - Personal Information: Name, email address, phone number, and other contact details.
        - Log Data: Information about your use of the App, such as IP address, device information,
          and pages viewed.
        - Location Information: We may collect and store your location information if you enable
          location services.
      </Text>

      <Text style={styles.header}>Section 3: How We Use Your Information</Text>
      <Text style={styles.text}>
        We use your information to:
        - Provide and maintain the App.
        - Improve and personalize your experience.
        - Send you updates, newsletters, and promotional materials.
        - Respond to your inquiries, comments, or feedback.
      </Text>

      <Text style={styles.header}>Section 4: Information Sharing and Disclosure</Text>
      <Text style={styles.text}>
        We may share your information with third parties for various purposes, including:
        - Service Providers: We may engage third-party companies or individuals to perform
          services on our behalf.
        - Legal Compliance: We may disclose your information to comply with applicable laws,
          regulations, or legal processes.
      </Text>

      <Text style={styles.header}>Section 5: Security</Text>
      <Text style={styles.text}>
        We take reasonable measures to protect your information from unauthorized access or
        disclosure. However, no method of transmission over the internet or electronic storage is
        100% secure.
      </Text>

      <Text style={styles.header}>Section 6: Changes to This Privacy Policy</Text>
      <Text style={styles.text}>
        We may update our Privacy Policy from time to time. We will notify you of any changes by
        posting the new Privacy Policy on this page.
      </Text>

      {/* Add more sections as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 20,
    color:"gray",
    marginTop: -40,
    marginLeft: 80,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 20,
  },
});

export default PrivacyPolicy;
