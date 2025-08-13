// src/appwriteConfig.js
import { Client, Account, Databases, Functions, ID } from 'appwrite';

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
const functions = new Functions(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// ✅ Export everything from one place, cleanly
export {
  client,
  account,
  databases,
  functions,
  ID,
  DATABASE_ID,
  COLLECTION_ID
};
