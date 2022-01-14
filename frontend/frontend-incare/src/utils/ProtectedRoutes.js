import React from 'react'
import {Navigate} from 'react-router-dom'

function ProtectedRoutes({ children,auth }) {
  console.log(auth)
  return auth ? children : <Navigate to="/login" />;
}

export default ProtectedRoutes
