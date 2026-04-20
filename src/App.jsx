//this is the map of the app
//shows app structure and routing(what page shows at what url)

import React from 'react'
import { Routes, Route } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AppPage from './pages/App'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import { ToastContainer } from 'react-toastify'
import Categories from './pages/Categories'
import ProductsDetails from './pages/ProductsDetails'

const App = () => {
  return (
    <>
      <ToastContainer/>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
        <Route path="/products/:id" element={<PrivateRoute><ProductsDetails /></PrivateRoute>} />
        <Route path="/app" element={
          <PrivateRoute>
            <AppPage />
          </PrivateRoute>
          }
        />
        
      </Routes>
    </>
    
  )
}

export default App