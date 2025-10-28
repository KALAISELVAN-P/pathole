import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">SmartRoad</h1>
        <p className="text-xl mb-8">Smart Pothole Detection System</p>
        <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default LandingPage