//this file attaches React to DOM.
//it also wraps the app with provides(Router, etc)
//it is the entry door

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './context/AuthContext.jsx'
import { UIProvider } from './context/UIContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
            <App />
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
