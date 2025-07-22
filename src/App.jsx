import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// ✅ Import your components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./components/Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<Navigate to="/kanban-board-app" replace />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route
    path="/kanban-board-app"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />
</Routes>

    </Router>
  );
}

export default App;
