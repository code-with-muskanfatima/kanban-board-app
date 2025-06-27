import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Kanban from './components/Kanban';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <div className="main-layout">
        <div className="sidebar-section">
          <Sidebar />
        </div>
        <div className="kanban-section">
          <Kanban />
        </div>
      </div>
    </>
  );
}

export default App;
