import React, { useState } from "react";
import { account, databases, DATABASE_ID } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignup) {
        // Signup
        const user = await account.create(ID.unique(), email, password, name);

        // ✅ Save user to "users" collection
        await databases.createDocument(DATABASE_ID, "users", ID.unique(), {
          email,
          name
        });

        alert("Signup successful!");
      } else {
        // Login
        await account.createSession(email, password);
        alert("Login successful!");
      }

      navigate("/kanban"); // redirect to Kanban
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div>
      <h2>{isSignup ? "Signup" : "Login"}</h2>
      {isSignup && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth}>{isSignup ? "Signup" : "Login"}</button>
      <p onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "No account? Signup"}
      </p>
    </div>
  );
}
