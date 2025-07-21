// src/appwriteConfig.js
import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // e.g. 'https://cloud.appwrite.io/v1'
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Your project ID

export const account = new Account(client);
const databases = new Databases(client);

// Replace with your actual Database and Collection IDs
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export {
  client,
  databases,
  ID,
  DATABASE_ID,
  COLLECTION_ID
};
