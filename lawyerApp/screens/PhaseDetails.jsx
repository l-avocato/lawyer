import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import Modal from "react-native-modal"; // Import the Modal component

const ProcessNotesTab = () => {
  const [selectedTab, setSelectedTab] = useState("processNotes");
  const [modalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setNoteText("");
    setSelectedFile(null);
  };

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});
      console.log("Selected file:", res);
      setSelectedFile(res);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleFile = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: selectedFile.assets[0].uri,
      type: selectedFile.type,
      name: selectedFile.assets[0].name || "file",
    });
    formData.append("upload_preset", "xhqp21a0");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgztaxbvi/upload",
        formData
      );
      console.log("this is response",response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addNote = () => {
    console.log("Note:", noteText);
    console.log("File:", selectedFile);

    closeModal();
  };

  const processNotes = [
    { id: 1, note: "Tomorrow we have a court hearing" },
    { id: 2, note: "We have to call the attorney" },
  ];

  return (
    <ScrollView style={styles.tabContent}>
     {processNotes.map((note) => (
  <Card key={note.id} containerStyle={styles.noteCard}>
    <Card.Image source={require("../assets/ahmed.png")}
     style={{ width: 40, height: 40,borderRadius:50}} />
    <Card.Title style={styles.noteTitle}>{note.note}</Card.Title>
    <Text>{note.writer}</Text>
  </Card>
))}

      {/* Floating Add Note Button */}
      <TouchableOpacity style={styles.floatingButton} onPress={openModal}>
        <Ionicons name="add" size={35} color="white" />
      </TouchableOpacity>

      {/* Modal for adding notes */}
      <Modal isVisible={modalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.modalInput}
            placeholder="Write your note..."
            multiline
            value={noteText}
            onChangeText={(text) => setNoteText(text)}
          />
          <TouchableOpacity onPress={selectOneFile}>
            <View style={styles.modalButtonContainer}>
              <Ionicons
                name="document-attach-outline"
                size={35}
                color="black"
                style={{ right: 5, top: 0 }}
              />
              <Text style={styles.modalButtonText}>Attach File</Text>
            </View>
          </TouchableOpacity>
          <Button
            buttonStyle={styles.modalAddButton}
            title="Add Note"
            onPress={() => {
              addNote();
              handleFile();
            }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const DocumentsTab = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const folders = [
    { id: 1, name: "Folder 1", files: ["File 1", "File 2"] },
    { id: 2, name: "Folder 2", files: ["File 3", "File 4", "File 5"] },
  ];

  const handleFolderClick = (folder) => {
    setSelectedFolder(folder);
  };

  const handleBackClick = () => {
    setSelectedFolder(null);
  };

  return (
    <ScrollView style={styles.tabContent}>
      {!selectedFolder ? (
        <View style={styles.folderContainer}>
          {folders.map((folder) => (
            <TouchableOpacity
              key={folder.id}
              onPress={() => handleFolderClick(folder)}
            >
              <Card containerStyle={styles.folderCard}>
                <MaterialIcons
                  name="folder"
                  style={{ position: "absolute", top: 10, right: 60 }}
                  size={40}
                  color="#FFD700"
                />
                <Text style={styles.folderTitle}>{folder.name}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <>
          <Button
            title="Back"
            icon={<Icon name="arrow-back" color="white" />}
            onPress={handleBackClick}
            buttonStyle={styles.backButton}
          />
          <View style={styles.filesContainer}>
            {selectedFolder.files.map((file, index) => (
              <Card key={index} containerStyle={styles.fileCard}>
                <Icon
                  name="file-text"
                  type="feather"
                  color="#292929"
                  size={30}
                  style={{ top: 10, zIndex: 10 }}
                />
                <Text style={styles.fileText}>{file}</Text>
              </Card>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
};

const PhaseDetails = () => {
  const [selectedTab, setSelectedTab] = useState("processNotes");

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 70, height: 40, top: 75, left: -20 }}
      />
      <Text style={styles.title}>Phase Details</Text>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            selectedTab === "processNotes" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("processNotes")}
        >
          <Text style={styles.tabText}>Process Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            selectedTab === "documents" && styles.selectedTab,
          ]}
          onPress={() => setSelectedTab("documents")}
        >
          <Text style={styles.tabText}>Documents</Text>
        </TouchableOpacity>
      </View>

      {selectedTab === "processNotes" && <ProcessNotesTab />}
      {selectedTab === "documents" && <DocumentsTab />}
    </View>
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
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    alignItems: "center",
    flexDirection: "row", // Allow for icons and text in the tab items
    justifyContent: "center", // Center the icons and text
  },
  selectedTab: {
    borderBottomColor: "#D5B278",
  },
  tabText: {
    color: "black",
    fontWeight: "bold",
  },
  tabContent: {
    flex: 1,
  },
  noteCard: {
    backgroundColor: "#D5B278",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 5,
    padding: 26,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    height:"35%",
  },
  noteTitle: {
    fontSize: 19,
    color: "white",
    fontWeight: "700",
    marginBottom: 5,
    left: 20,
    top: -25,
  },
  commentsContainer: {
    marginTop: 10,
  },
  commentCard: {
    backgroundColor: "#f0f2f5",
    borderRadius: 80,
    marginBottom: 8,
    padding: 15,
    left: -15,
    width: "100%",
  },
  commentTitle: {
    fontSize: 16,
    color: "black",
    marginBottom: -5,
    fontWeight: "700",
    top: -55,
    left: 80,
    alignSelf: "flex-start",
  },
  commentText: {
    fontSize: 15,
    color: "black",
    fontWeight: "400",
    left: 83,
    top: -45,
    flexWrap: "wrap",
    maxWidth: "80%",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 18,
    marginRight: 10,
    paddingLeft: 10,
    height: 40,
  },
  addCommentButton: {
    backgroundColor: "black",
    borderRadius: 20,
    height: 40,
    justifyContent: "center", // Center the text and icon
    alignItems: "center", // Center the text and icon
  },

  commentButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  commentButtonText: {
    color: "black",
    marginLeft: 5,
    fontSize: 16,
  },

  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  floatingButton: {
    position: "absolute",
    // bottom: 20,
    // right: -1,
    backgroundColor: "black",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    bottom:290,
  },
  modalInput: {
    backgroundColor: "#F0F0F0",
    borderRadius: 18,
    marginBottom: 10,
    paddingLeft: 10,
    height: 80,
  },
  modalButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  modalButtonText: {
    color: "black",
    marginLeft: 5,
    fontSize: 16,
  },
  modalAddButton: {
    backgroundColor: "black",
    borderRadius: 20,
    height: 40,
    justifyContent: "center", // Center the text and icon
    alignItems: "center", // Center the text and icon
  },
  folderContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  folderCard: {
    backgroundColor: "#292929",
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
    padding: 20,
    alignItems: "center",
    height: 110,
    width: 155,
  },
  folderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    top: 20,
    left: 20,
  },
  backButton: {
    backgroundColor: "#292929",
    borderRadius: 10,
    marginTop: 10,
  },
  filesContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  fileCard: {
    backgroundColor: "#D5B278",
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 90,
  },
  fileText: {
    fontSize: 18,
    color: "#292929",
    fontWeight: "600",
    left: 60,
    top: -15,
  },
});

export default PhaseDetails;
