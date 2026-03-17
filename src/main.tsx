import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import AppNew from './AppNew'
import { Login } from './components/Login'
import './index.css'

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const user = localStorage.getItem('mock_tests_user')
    return !!user
  })

  const handleLogin = (email: string) => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('mock_tests_user')
    setIsLoggedIn(false)
  }

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <AppNew />
          {/* Add logout button in your app header */}
        </div>
      )}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
