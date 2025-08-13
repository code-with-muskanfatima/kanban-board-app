import { Client, Users } from "node-appwrite";

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT) // Example: https://cloud.appwrite.io/v1
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // Admin API key chahiye

  const users = new Users(client);

  try {
    const result = await users.list();
    return res.json({ users: result.users });
  } catch (err) {
    error(err);
    return res.json({ error: err.message });
  }
};
