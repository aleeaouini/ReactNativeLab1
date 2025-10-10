import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import NoteItem from "./components/NoteItem";
import NoteInput from "./components/NoteInput";

// Sample initial notes data
const initialNotes = [
  {
    id: "1",
    content: "Learn React Native",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    content: "Complete the tutorial",
    createdAt: new Date().toISOString(),
  },
];

export default function NotesScreen() {
  const [notes, setNotes] = useState(initialNotes);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  // Function to add or update a note
  const saveNote = () => {
    if (noteText.trim() === "") return;

    if (editingNote) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                content: noteText,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );
      setEditingNote(null);
    } else {
      // Add new note
      const newNote = {
        id: Date.now().toString(),
        content: noteText,
        createdAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    }

    setNoteText("");
    setModalVisible(false);
  };

  // Function to delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Function to open edit mode
  const editNote = (note) => {
    setEditingNote(note);
    setNoteText(note.content);
    setModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalVisible(false);
    setNoteText("");
    setEditingNote(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Notes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {notes.length > 0 ? (
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <NoteItem note={item} onEdit={editNote} onDelete={deleteNote} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notesList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notes yet. Create one!</Text>
        </View>
      )}

      <NoteInput
        visible={modalVisible}
        onClose={closeModal}
        onSave={saveNote}
        noteText={noteText}
        setNoteText={setNoteText}
        isEditing={!!editingNote}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    height: 100,
    backgroundColor: "#3498db",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "#3498db",
    fontWeight: "bold",
    marginTop: -2,
  },
  notesList: {
    padding: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#7f8c8d",
  },
});