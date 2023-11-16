import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

const ProcessNotesTab = () => {
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState('');

  const addComment = (noteId, name) => {
    setComments((prevComments) => ({
      ...prevComments,
      [noteId]: [...(prevComments[noteId] || []), { text: commentInput, name }],
    }));
    setCommentInput('');
  };
  
  const renderComments = (noteId) => {
    const noteComments = comments[noteId] || [];
    return (
      <View style={styles.commentsContainer}>
        {noteComments.map((comment, index) => (
          <Card key={index} containerStyle={styles.commentCard}>
            <Card.Title style={styles.commentTitle}>{comment.name}</Card.Title>
            <Text style={styles.commentText}>{comment.text}</Text>
          </Card>
        ))}
      </View>
    );
  };
  
  // When adding a comment, pass the name of the person who made the comment
  <Button
    icon={<Icon name='add' color='#ffffff' />}
    buttonStyle={styles.addCommentButton}
    title='Add Comment'
    onPress={() => addComment(note.id, 'John Doe')} // Replace 'John Doe' with the actual name
  />

  const processNotes = [
    { id: 1, note: 'Tomorrow we have a court hearing' },
    { id: 2, note: 'We have to call the attorney' },
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
              value={commentInput}
              onChangeText={(text) => setCommentInput(text)}
            />
          <Button
          // icon={<Icon name='add' color='#ffffff' />}
          buttonStyle={styles.addCommentButton}
          title='Send'
          onPress={() => addComment(note.id, 'John Doe')} // Replace 'John Doe' with the actual name
          />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

const DocumentsTab = () => {
  // Placeholder data for documents
  const folders = [
    { id: 1, name: 'Folder 1', files: ['File 1', 'File 2'] },
    { id: 2, name: 'Folder 2', files: ['File 3', 'File 4', 'File 5'] },
    // Add more folders as needed
  ];

  return (
    <ScrollView style={styles.tabContent}>
      {folders.map((folder) => (
        <Card key={folder.id} containerStyle={styles.folderCard}>
          <Card.Title style={styles.folderTitle}>{folder.name}</Card.Title>
          {folder.files.map((file, index) => (
            <Text key={index} style={styles.fileText}>{file}</Text>
          ))}
        </Card>
      ))}
    </ScrollView>
  );
};

const PhaseDetails = () => {
  const [selectedTab, setSelectedTab] = useState('processNotes'); // 'processNotes' or 'documents'

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={{ width: 70, height: 40, top: 75, left: -20 }} />
      <Text style={styles.title}>Phase Details</Text>

      {/* Tabs for switching between process notes and documents */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'processNotes' && styles.selectedTab]}
          onPress={() => setSelectedTab('processNotes')}
        >
          <Text style={styles.tabText}>Process Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'documents' && styles.selectedTab]}
          onPress={() => setSelectedTab('documents')}
        >
          <Text style={styles.tabText}>Documents</Text>
        </TouchableOpacity>
      </View>

      {/* Conditional rendering based on the selected tab */}
      {selectedTab === 'processNotes' && <ProcessNotesTab />}
      {selectedTab === 'documents' && <DocumentsTab />}
    </View>
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
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row', // Allow for icons and text in the tab items
    justifyContent: 'center', // Center the icons and text
  },
  selectedTab: {
    borderBottomColor: '#D5B278',
  },
  tabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
  },
  noteCard: {
    backgroundColor: '#D5B278',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
    padding: 26,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  noteTitle: {
    fontSize: 19,
    color: 'white',
    fontWeight: '700',
    marginBottom: 10,
  },
  commentsContainer: {
    marginTop: 10,
  },
  commentCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    padding: 15, 
    left:-15
  },
  commentTitle: {
    fontSize: 16,
    color: 'black', // Change text color to improve readability
    marginBottom: 5,
    fontWeight: '700', // Bold the commenter's name
  },
  commentText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '500',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  commentInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 18,
    marginRight: 10,
    paddingLeft: 10,
    height: 40,
  },
  addCommentButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center', // Center the text and icon
    alignItems: 'center', // Center the text and icon
  },
  folderCard: {
    backgroundColor: '#292929',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 5,
  },
  folderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 10,
  },
  fileText: {
    fontSize: 16,
    color: 'white',
  },
});

export default PhaseDetails;
