import React, { useState } from "react";
import { Account } from "appwrite";
import { client } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import './Signup.css';



const Signup = () => {
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
      await account.create(
        "unique()", // auto-generate user ID
        user.email,
        user.password,
        user.name
      );

      // ✅ Step 2: Create session (auto-login after signup)
      await account.createEmailPasswordSession(user.email, user.password);

      // ✅ Redirect to home
      navigate("/kanban-board-app");
    } catch (error) {
      console.error("Signup Error:", error.message);
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
