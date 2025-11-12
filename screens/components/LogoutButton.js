// src/components/LogoutButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

const LogoutButton = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        // Navigate to Auth screen after successful logout
        navigation.replace("Auth");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f44336",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LogoutButton;