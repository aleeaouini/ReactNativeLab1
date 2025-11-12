import { Databases, Query } from "appwrite";
import client from "./appwrite-config";
import { APPWRITE_DATABASE_ID, APPWRITE_COLLECTION_ID } from "@env";

// Initialize the Databases SDK
const databases = new Databases(client);

// List all documents/notes in the collection
export const listDocuments = async (queries = []) => {
  try {
    // Fetch documents from the specified database and collection
    // 'queries' parameter allows filtering, sorting, and limiting results
    const response = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      APPWRITE_COLLECTION_ID,
      queries
    );
    // Return the documents array from the response
    return response.documents;
  } catch (error) {
    // Log and rethrow any errors that occur during the operation
    console.error("Error listing documents:", error);
    throw error;
  }
};