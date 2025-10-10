import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StyleDemo() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Styled Component</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "#3498db",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});