import React from "react";
import { Search, Settings, Bell, Lock } from "lucide-react";
import "./Header.css";
import LogoutButton from "../LogoutButton";

const Header = () => {
  return (
    <header className="header">
      <div className="my-logo">Kanban</div>

      <div className="search-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Try searching task"
          className="search-bar"
        />
      </div>

      <div className="header-icons">
        <button className="share-btn">
          <Lock size={18} />
          <span>Share</span>
        </button>
        <Settings className="icon" size={20} />
        <Bell className="icon" size={20} />
        <LogoutButton />
      </div>
    </header>
  );
};

export default Header;
