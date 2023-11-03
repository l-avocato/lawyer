import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

const ReviewSummary = () => {
  const [category, setCategory] = useState("Category Type");
  const [lawyerName, setLawyerName] = useState("Lawyer Name");
  const [dateTime, setDateTime] = useState("Date & Time");
  const [total, setTotal] = useState(100);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleConfirmPayment = () => {
    setIsConfirmed(false);
    setIsModalVisible(true); 
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.whiteBackground}>
        <Text style={styles.title}>Review Summary</Text>
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
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.totalAmount}>{total} DT</Text>
      </View>
      {!isConfirmed && (
         <TouchableOpacity
         style={[
           styles.confirmButton,
           { backgroundColor: isConfirmed ? "#CCCCCC" : "#000000" }, 
         ]}
         onPress={isConfirmed ? null : handleConfirmPayment} 
       >
         <Text style={styles.confirmButtonText}>
           {isConfirmed ? "Payment Confirmed" : "Confirm Payment"}
         </Text>
       </TouchableOpacity>
     )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.enlargedModalContent}>
            <Image
              source={require("../assets/check.png")} 
              style={styles.checkMarkImage}
            />
            <Text style={styles.modalHeader}>Payment Confirmed</Text>
            <Text style={styles.modalText}>
              You have successfully made a payment.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.viewReceiptButton}>
                <Text style={styles.modalButtonText}>E-receipt</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Close</Text>
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
  enlargedModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    width: 300, // Decrease the width of the pop-up as per your preference
  },
  checkMarkImage: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
  },
  viewReceiptButton: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 30, // Set the same horizontal padding as the close button
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  closeButton: {
    backgroundColor: "#FF0000",
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
