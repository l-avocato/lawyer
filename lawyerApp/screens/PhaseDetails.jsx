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
import { Linking } from "react-native";
import axios from "axios";
const ProcessNotesTab = () => {
  // Initialize comments state as an object with noteId as keys
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

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
    console.log(selectedFile);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgztaxbvi/upload",
        formData
      );
      const newComment = {
        name: "Ahmed Irmani",
        text: commentInput, // replace with the actual text
        file: {
          uri: response.data.secure_url,
          name: selectedFile.assets[0].name,
        },
      };
      console.log("open this", newComment.file);
      setUploadedFile(newComment.file);
      setComments({
        ...comments,
        [noteId]: [...(comments[noteId] || []), newComment],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = (noteId, name, text) => {
    const newComment = { name, text: commentInput[noteId], file: selectedFile };
    setComments({
      ...comments,
      [noteId]: [...(comments[noteId] || []), newComment],
    });
    setSelectedFile(null); // Reset the selected file
    setCommentInput({ ...commentInput, [noteId]: "" });
  };

  const renderComments = (noteId) => {
    const noteComments = comments[noteId] || [];
    return (
      <View style={styles.commentsContainer}>
        {noteComments.map((comment, index) => (
          <Card key={index} containerStyle={styles.commentCard}>
            <Image
              source={require("../assets/ahmed.png")}
              style={{ width: 70, height: 70, top: 5, left: 0,borderRadius: 50}}
            />
            <Card.Title style={styles.commentTitle}>{comment.name}</Card.Title>
            <Text style={styles.commentText} numberOfLines={3}>
              {comment.text}
            </Text>
            {comment.file && (
              <Text
                style={{ color: "blue", left: 84, fontSize: 12 ,top: -40}}
                onPress={() => Linking.openURL(uploadedFile.uri)}
              >
                Attached file: {comment.file.assets[0].name.slice(0, 10)}...
              </Text>
            )}
          </Card>
        ))}
      </View>
    );
  };

  // When adding a comment, pass the name of the person who made the comment
  <Button
    icon={<Icon name="add" color="#ffffff" />}
    buttonStyle={styles.addCommentButton}
    title="Add Comment"
    onPress={() => addComment(note.id, "Ahmed Irmani")} // Replace 'John Doe' with the actual name
  />;

  const processNotes = [
    { id: 1, note: "Tomorrow we have a court hearing" },
    { id: 2, note: "We have to call the attorney" },
    // Add more notes as needed
  ];

  return (
    <ScrollView style={styles.tabContent}>
      {processNotes.map((note) => (
        <Card key={note.id} containerStyle={styles.noteCard}>
          <Card.Title style={styles.noteTitle}>{note.note}</Card.Title>
          {renderComments(note.id)}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment"
              value={commentInput[note.id] || ""}
              onChangeText={(text) =>
                setCommentInput({ ...commentInput, [note.id]: text })
              }
            />
            <Ionicons
              name="document-attach-outline"
              size={35}
              color="black"
              style={{ right: 5, top: 0 }}
              onPress={selectOneFile}
            />
            <Button
              buttonStyle={styles.addCommentButton}
              title="Send"
              onPress={() => {
                addComment(note.id, "Ahmed Irmani", commentInput);
                handleFile(note.id);
                setCommentInput("");
              }}
            />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const DocumentsTab = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const folders = [
    { id: 1, name: "Folder 1", files: ["File 1", "File 2"] },
    { id: 2, name: "Folder 2", files: ["File 3", "File 4", "File 5"] },
    // Add more folders as needed
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
  const [selectedTab, setSelectedTab] = useState("processNotes"); // 'processNotes' or 'documents'

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 70, height: 40, top: 75, left: -20 }}
      />
      <Text style={styles.title}>Phase Details</Text>

      {/* Tabs for switching between process notes and documents */}
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

      {/* Conditional rendering based on the selected tab */}
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
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
    padding: 26,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  noteTitle: {
    fontSize: 19,
    color: "white",
    fontWeight: "700",
    marginBottom: 10,
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
    flexWrap: 'wrap',
    maxWidth: '80%', 
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
