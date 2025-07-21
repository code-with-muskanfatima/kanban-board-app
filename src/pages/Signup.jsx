import React, { useState } from "react";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // 👈 Import the custom CSS

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = ID.unique();
      const createdUser = await account.create(userId, email, password, name);
      console.log("✅ User created:", createdUser);
      navigate("/");
    } catch (err) {
      console.error("❌ Signup error:", err);
      alert("Signup failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2 className="signup-title">Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
          required
        />

        <input
          type="password"
          placeholder="Password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input"
          required
          autoComplete="current-password"
        />

        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
