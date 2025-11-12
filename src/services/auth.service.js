// src/services/auth.service.js
import { ID } from "appwrite";
import { appwriteClient } from "../config/appwrite";

class AuthService {
  // Reference to Appwrite Account service
  account;

  constructor() {
    this.account = appwriteClient.account;
  }

  // Register a new user
  async createAccount(email, password, name) {
    try {
      // Create a new account using Appwrite SDK
      const userAccount = await this.account.create(
        ID.unique(), // Generate a unique ID
        email,
        password,
        name
      );

      // If account creation is successful, automatically log the user in
      if (userAccount) {
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  // Log in an existing user
  async login(email, password) {
    try {
      // Create an email session using Appwrite SDK
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  }

  // Get current session/user
  async getCurrentUser() {
    try {
      // Get current account information
      return await this.account.get();
    } catch (error) {
      console.error("Error getting current user:", error);
      return null; // Return null if no user is logged in
    }
  }

  // Log out the current user
  async logout() {
    try {
      // Delete all sessions for the current user
      return await this.account.deleteSession("current");
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;