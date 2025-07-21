import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account } from "./appwriteConfig";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    account.get().then(
      () => setIsLoggedIn(true),
      () => setIsLoggedIn(false)
    );
  }, []);

  if (isLoggedIn === null) return <p>Loading...</p>;
  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
