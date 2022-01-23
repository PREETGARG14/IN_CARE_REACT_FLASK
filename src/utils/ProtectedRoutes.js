import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, auth }) {
  return auth ? children : <Navigate to="/" />;
}

export default ProtectedRoutes;
