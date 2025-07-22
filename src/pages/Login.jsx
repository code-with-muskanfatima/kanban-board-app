import React, { useState } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // 👈 Link to the custom CSS

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Try deleting existing session if it exists
    try {
      await account.deleteSession('current');
    } catch (sessionError) {
      // No existing session — that's okay
      if (sessionError.code !== 401) {
        console.warn("⚠️ Unexpected session error:", sessionError);
      }
    }

    // Now create new session
    await account.createEmailPasswordSession(email, password);
    console.log("✅ Logged in successfully");
    navigate("/");
  } catch (error) {
    console.error("❌ Login failed:", error);
    alert("Login failed: " + error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form" autoComplete="off">
        <h2 className="login-title">Login</h2>

       <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="login-input"
  required
  autoComplete="off" // ✅ disables browser autofill
  name="email" // 🔁 give a unique or random name to avoid saved autofill
/>
<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="login-input"
  required
  autoComplete="new-password" // ✅ disables autofill suggestions for password
  name="password" // 🔁 give a different name
/>

        <button type="submit" className="login-button">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p style={{ textAlign: "center", marginTop: "10px" }}>
  Don't have an account? <a href="/signup">Sign up</a>
</p>
      </form>
    </div>
  );
}
