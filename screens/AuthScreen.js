// src/screens/AuthScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

const AuthScreen = ({ navigation }) => {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const [errorMessage, setErrorMessage] = useState("");

  // Get auth context
  const { user, login, register, isAuthenticated, loading } = useAuth();

  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigation.replace("Home"); // Redirect to Home if already logged in
    }
  }, [isAuthenticated, loading, navigation]);

  // Handle form submission
  const handleSubmit = async () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    if (!isLogin && !name) {
      setErrorMessage("Name is required for registration");
      return;
    }

    try {
      let result;

      if (isLogin) {
        // Handle login
        result = await login(email, password);
      } else {
        // Handle registration
        result = await register(email, password, name);
      }

      if (result.success) {
        // Navigate to home screen on success
        navigation.replace("Home");
      } else {
        // Display error message
        setErrorMessage(result.error?.message || "Authentication failed");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
      console.error("Auth error:", error);
    }
  };

  // Toggle between login and register forms
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>{isLogin ? "Login" : "Register"}</Text>

        {/* Name field (registration only) */}
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        )}

        {/* Email field */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password field */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Error message */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        {/* Submit button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {isLogin ? "Login" : "Register"}
          </Text>
        </TouchableOpacity>

        {/* Toggle between login and register */}
        <TouchableOpacity style={styles.switchButton} onPress={toggleAuthMode}>
          <Text style={styles.switchText}>
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: 15,
    alignItems: "center",
  },
  switchText: {
    color: "#007BFF",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default AuthScreen;