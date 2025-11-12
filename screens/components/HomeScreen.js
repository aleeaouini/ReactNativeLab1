// src/screens/HomeScreen.js
import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import LogoutButton from "../components/LogoutButton";

const HomeScreen = ({ navigation }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Redirect unauthenticated users to Auth screen
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigation.replace("Auth");
    }
  }, [isAuthenticated, loading, navigation]);

  // Add LogoutButton to navigation header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogoutButton navigation={navigation} />,
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.name || "User"}!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Notes")}
      >
        <Text style={styles.buttonText}>View Notes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;