import React from 'react'

const Login = ({ username, password, setUsername, setPassword, handleLogin }) => (
  <div>
    <h2>Log In To Application</h2>
    <form onSubmit={handleLogin}>
      <div>
      username <input id="usernameInput" type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
      password <input id="passwordInput" type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button id="loginButton" type="submit">login</button>
    </form>
  </div>
)

export default Login
