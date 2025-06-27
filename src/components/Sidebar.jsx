import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-section">
        <div className="logo" />
        <span className="title">agency</span>
        <span className="dropdown">▾</span>
      </div>

      <nav className="nav-links">
        <button className="nav-button active">
          📋 <span>Boards</span>
        </button>
        <button className="nav-button disabled">
          📄 <span>Pages</span>
        </button>
        <button className="nav-button disabled">
          ⚙️ <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}
