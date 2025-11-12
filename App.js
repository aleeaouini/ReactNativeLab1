// App.js
import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import AuthNavigator from "./src/Navigation/AuthNavigator"; 

export default function App() {
  return (
    <AuthProvider>
      <AuthNavigator />
    </AuthProvider>
  );
}