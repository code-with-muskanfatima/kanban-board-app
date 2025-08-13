import { Client, Users } from "node-appwrite";

const client = new Client();

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY); // Server key

const users = new Users(client);

export default async function(req, res) {
    try {
        const result = await users.list();
        // result.users is an array of users
        // Sirf name aur email nikalna
        const formattedUsers = result.users.map(user => ({
            name: user.name || user.email,
            id: user.$id
        }));
        res.json(formattedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
