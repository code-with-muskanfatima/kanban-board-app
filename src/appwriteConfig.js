// src/appwriteConfig.js
import { Client, Account, Databases, ID } from "appwrite";

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Project ID

// Appwrite services
const account = new Account(client);
const databases = new Databases(client);

// Database + Collection IDs from .env
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TASKS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_TASKS_COLLECTION_ID;
const USERS_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

// Export everything
export {
  client,
  account,
  databases,
  ID,
  DATABASE_ID,
  TASKS_COLLECTION_ID,
  USERS_COLLECTION_ID,
};
