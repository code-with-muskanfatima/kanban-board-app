import React, { useState } from "react";
import { Account, databases, ID } from "appwrite";
import { client, DATABASE_ID } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import './Signup.css';

const Signup = ({ onUserAdded }) => { // optional prop to notify Kanban
  const account = new Account(client);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Step 1: Create account
      const newAccount = await account.create(
        "unique()", // auto-generate user ID
        user.email,
        user.password,
        user.name
      );

      // ✅ Step 2: Create session (auto-login after signup)
      await account.createEmailPasswordSession(user.email, user.password);

      // ✅ Step 3: Create user document in `users` collection
      await databases.createDocument(DATABASE_ID, "64fa92bca2340e66cd15a6f9", ID.unique(), {
        name: user.name,
        email: user.email
      });

      // ✅ Optional: notify parent component Kanban to refresh users
      if(onUserAdded) onUserAdded({ $id: newAccount.$id, name: user.name, email: user.email });

      // ✅ Redirect to Kanban
      navigate("/kanban-board-app");
    } catch (error) {
      console.error("Signup Error:", error.message);
      alert("Signup failed. Check console.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;
