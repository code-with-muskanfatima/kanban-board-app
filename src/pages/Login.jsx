import React, { useState } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await account.deleteSession('current');
    } catch (sessionError) {
      if (sessionError.code !== 401) {
        console.warn("⚠️ Unexpected session error:", sessionError);
      }
    }

    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      localStorage.setItem("userName", user.name); // ✅ Save user name
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
          autoComplete="off"
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
          autoComplete="new-password"
          name="password"
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
