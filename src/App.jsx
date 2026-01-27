//this is the map of the app
//shows app structure and routing(what page shows at what url)

import React from 'react'
import { Routes, Route } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AppPage from './pages/App'

const App = () => {
  return (
    
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/app" element={<AppPage />} />
    </Routes>
  )
}

export default App