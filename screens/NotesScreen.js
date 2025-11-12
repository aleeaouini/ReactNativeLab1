// src/screens/NotesScreen.js
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  getNotes,
  addNote,
  deleteNote,
  updateNote,
} from "../services/noteService";
import NoteItem from "../components/NoteItem";
import AddNoteModal from "../components/AddNoteModal";
import { AuthContext } from "../context/AuthContext";

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext); // current user from AuthContext



  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You don't have any notes yet.</Text>
        <Text style={styles.emptySubtext}>
          Tap the + button to create your first note!
        </Text>
      </View>
    );
  };


  // Fetch notes belonging to the current user
  const fetchNotes = async () => {
    if (!user) return;
    setIsLoading(true);
    setError(null);
    try {
      const fetchedNotes = await getNotes(user.$id);
      setNotes(fetchedNotes);
    } catch (err) {
      console.error("Failed to fetch notes:", err);
      setError("Failed to fetch notes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Run when user changes (on login)
  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);

  // Add note
  const handleAddNote = async (text) => {
    try {
      const newNote = await addNote(text, user.$id);
      setNotes((prev) => [newNote, ...prev]);
      setIsAddModalVisible(false);
    } catch (err) {
      console.error("Failed to add note:", err);
    }
  };

  // Delete note
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes((prev) => prev.filter((note) => note.$id !== noteId));
    } catch (err) {
      console.error("Failed to delete note:", err);
    }
  };

  // Update note
  const handleUpdateNote = async (noteId, newText) => {
    try {
      const updatedNote = await updateNote(noteId, newText);
      setNotes((prev) =>
        prev.map((note) => (note.$id === noteId ? updatedNote : note))
      );
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  // If still loading
  if (isLoading && notes.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  // If error
  if (error && notes.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  


  

   return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onDelete={handleDeleteNote}
            onUpdate={handleUpdateNote}
          />
        )}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={notes.length === 0 ? { flex: 1 } : {}}
        ListEmptyComponent={!isLoading && renderEmptyComponent()}
      />

      {/* Add button and modal remain the same */}

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
   emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },




});

export default NotesScreen;
