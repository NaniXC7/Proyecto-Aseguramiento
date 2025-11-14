import React, { useState } from 'react'
import Login from './pages/Login.jsx'
import Products from './pages/Products.jsx'

export default function App() {
  const [token, setToken] = useState(null)
  return (
    <div style={{maxWidth: 720, margin: '2rem auto', fontFamily: 'system-ui, sans-serif'}}>
      <h1>QA Demo App</h1>
      {!token
        ? <Login onAuthed={setToken} />
        : <Products token={token} onLogout={()=>setToken(null)} />
      }
    </div>
  )
}
