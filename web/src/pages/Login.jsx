import React, { useState } from 'react'
import { login } from '../api.js'

export default function Login({ onAuthed }) {
  const [email, setEmail] = useState('user@test.com')
  const [password, setPassword] = useState('Pass123!')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { access_token } = await login(email, password)
      onAuthed(access_token)
    } catch (err) {
      setError('Credenciales inválidas')
    }
  }

  return (
    <form onSubmit={onSubmit} aria-label="login-form">
      <div>
        <label htmlFor="email">Email</label><br/>
        <input id="email" data-testid="emailInput" value={email} onChange={(e)=>setEmail(e.target.value)} />
      </div>
      <div style={{marginTop: 8}}>
        <label htmlFor="password">Password</label><br/>
        <input id="password" type="password" data-testid="passwordInput" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <button id="submit" type="submit" style={{marginTop: 12}} data-testid="loginBtn">Entrar</button>
      {error && <p className="error" role="alert">{error}</p>}
    </form>
  )
}
