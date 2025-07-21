import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./components/Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/kanban-react"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
