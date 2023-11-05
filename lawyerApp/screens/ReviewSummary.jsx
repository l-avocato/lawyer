import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

const ReviewSummary = () => {
  const [category, setCategory] = useState("Category Type");
  const [lawyerName, setLawyerName] = useState("Lawyer Name");
  const [dateTime, setDateTime] = useState("Date & Time");
  const [total, setTotal] = useState(100);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("Can we schedule a consultation to discuss the details further?");

  const handleConfirmPayment = () => {
    setIsConfirmed(false);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={require("../assets/balkis.png")}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Balkis Bey</Text>
          <Text style={styles.profileLocation}>
            <Text style={styles.iconText}>1.5 km</Text>
            <Image
              source={require("../assets/location.png")}
              style={styles.icon}
            />
            <Text style={styles.iconText}>16/h</Text>
            <Image
              source={require("../assets/dollar.png")}
              style={styles.icon}
            />
            <Text style={styles.iconText}>4.4</Text>
            <Image
              source={require("../assets/ReviewStar.png")}
              style={styles.icon}
            />
          </Text>
        </View>
      </View>
      <Text style={styles.messageFieldLabel}>Message:</Text>
      <TextInput
        style={styles.messageInput}
        value={message}
        multiline
        editable={false}
      />
      <TouchableOpacity onPress={handleConfirmPayment}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/pins.png")}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.whiteBackground}>
        <Text style={styles.title}>Online consultation</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.info}>{category}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Lawyer</Text>
          <Text style={styles.info}>{lawyerName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Date & Time</Text>
          <Text style={styles.info}>{dateTime}</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>${total}</Text>
        </View>
      </ScrollView>
      {!isConfirmed && (
        <TouchableOpacity
          style={[
            styles.confirmButton,
            { backgroundColor: isConfirmed ? "#CCCCCC" : "#000000" },
          ]}
          onPress={isConfirmed ? null : handleConfirmPayment}
        >
          <Text style={styles.confirmButtonText}>
            {isConfirmed ? "Payment Confirmed" : "Confirm Booking"}
          </Text>
        </TouchableOpacity>
      )}
    <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.fullScreenModalContainer}>
          <View style={styles.fullScreenModalContent}>
            <Image
              source={require("../assets/check.png")}
              style={styles.checkMarkImage}
            />
            <Text style={styles.modalHeader}>Booking confirmed</Text>
            <Text style={styles.modalText}>
              You have successfully Booked ! 
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#FFD700" }]} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Back home</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  
  whiteBackground: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  fullScreenModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  fullScreenModalContent: {
    backgroundColor: "#FFD700", // Gold background color
    flex: 1,
    width: "100%",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  fileUploadContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D3D3D3",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20, 
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#D3D3D3",
    padding: 30, 
    borderRadius: 8, 
  },
  profileImage: {
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileLocation: {
    fontSize: 16,
    color: "#555",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  messageInput: {
    backgroundColor: "#EAEAEA",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 18,
    height: 100,
  },
  fileUploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
   fileInput: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 15,
    
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
 
  },
  uploadButton: {
    backgroundColor: "#000000",
    padding: 15,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  iconText: {
    fontSize: 16,
    marginRight: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#000000",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700", 
  },
  enlargedModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    width: 300,
  },
  checkMarkImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  viewReceiptButton: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "#000000", // Black background color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
});

export default ReviewSummary;
