import { Client } from "appwrite";
import { APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID } from "@env";

const client = new Client();

client.setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

export default client;
