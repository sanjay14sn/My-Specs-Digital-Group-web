import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'
import './index.css'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <CartProvider>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </CartProvider>
    </FavoritesProvider>
  </React.StrictMode>,
)
