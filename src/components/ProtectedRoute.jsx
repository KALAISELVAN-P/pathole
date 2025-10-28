import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
  
  if (!currentUser) {
    return <Navigate to="/" replace />
  }
  
  return children
}

export default ProtectedRoute