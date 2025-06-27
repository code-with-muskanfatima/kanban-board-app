import React from 'react';
import './Header.css';
import { Search, Lock, Settings, Bell } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="title">Kanban</h1>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <Search className="search-icon" />
          <input type="text" placeholder="Try searching tasks" />
        </div>
      </div>

      <div className="header-right">
        <button className="share-button">
          <Lock className="lock-icon" />
          Share
        </button>
        <button className="icon-button">
          <Settings className="icon" />
        </button>
        <button className="icon-button">
          <Bell className="icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
