import React, { useState, createContext, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import './App.css'

// Context for theme and data
const AppContext = createContext()

// Components
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Complaints from './pages/Complaints'
import Admin from './pages/Admin'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  
  const [potholes, setPotholes] = useState([
    {
      id: 'P001',
      latitude: 10.9902,
      longitude: 76.9629,
      depth: 6.4,
      severity: 'High',
      location: 'Ukkadam',
      timestamp: '2025-10-28T17:35:00',
      status: 'Reported'
    },
    {
      id: 'P002',
      latitude: 10.9387,
      longitude: 76.9536,
      depth: 2.8,
      severity: 'Minor',
      location: 'BK Pudur',
      timestamp: '2025-10-28T16:20:00',
      status: 'Verified'
    },
    {
      id: 'P003',
      latitude: 11.0080,
      longitude: 76.9502,
      depth: 4.5,
      severity: 'Moderate',
      location: 'RS Puram',
      timestamp: '2025-10-28T15:45:00',
      status: 'Fixed'
    }
  ])

  // Initialize demo user
  React.useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.length === 0) {
      const demoUser = {
        id: 1,
        name: 'Demo User',
        email: 'demo@smartroad.com',
        password: 'demo123',
        createdAt: new Date().toISOString()
      }
      localStorage.setItem('users', JSON.stringify([demoUser]))
    }
  }, [])

  React.useEffect(() => {
    document.body.classList.remove('dark')
  }, [])

  const contextValue = {
    darkMode,
    setDarkMode,
    potholes,
    setPotholes
  }

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-gray-900">
          {/* Only show navbar on protected routes */}
          {currentUser && <Navbar />}
          
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={currentUser ? { marginTop: '120px' } : {}}
          >
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Login />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/complaints" element={
                <ProtectedRoute>
                  <Complaints />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/about" element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              } />
              <Route path="/contact" element={
                <ProtectedRoute>
                  <Contact />
                </ProtectedRoute>
              } />
            </Routes>
          </motion.main>
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export { AppContext }
export default App