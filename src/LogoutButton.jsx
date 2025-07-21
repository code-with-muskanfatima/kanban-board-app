import React from "react";
import { account } from "../src/appwriteConfig";
import { useNavigate } from "react-router-dom";
import "../src/LogoutButton.css"

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/login");
    } catch (error) {
      alert("Logout failed");
    }
  };

  return <button className="btn" onClick={handleLogout}>Logout</button>;
}
