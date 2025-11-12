// src/components/NoteItem.js (updated for edit)
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { deleteNote } from "../services/note-service";
import EditNoteModal from "./EditNoteModal";

const NoteItem = ({ note, onNoteDeleted, onNoteUpdated }) => {
  const [deleting, setDeleting] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Format the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Handle delete confirmation and execution
  const handleDelete = () => {
    // Same as before
    // ...
  };

  // Handle opening the edit modal
  const handleEdit = () => {
    setEditModalVisible(true);
  };

  // Handle when a note is updated
  const handleNoteUpdated = (updatedNote) => {
    if (onNoteUpdated) {
      onNoteUpdated(updatedNote);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.content} onPress={handleEdit}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.date}>
          Last updated: {formatDate(note.updatedAt)}
        </Text>
        <Text style={styles.noteContent} numberOfLines={3}>
          {note.content}
        </Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          disabled={deleting}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <EditNoteModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onNoteUpdated={handleNoteUpdated}
        note={note}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 14,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  editButton: {
    marginRight: 16,
  },
  editText: {
    color: "#2196F3",
    fontWeight: "500",
  },
  deleteButton: {},
  deleteText: {
    color: "red",
    fontWeight: "500",
  },
});

export default NoteItem;