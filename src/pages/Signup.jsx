import React, { useState } from 'react'

const Signup = () => {
  const [user, setUser] = useState([])
  


  return (
    <form>
      <label>Email</label>
      <input type="email"></input>
      <label>Password</label>
      <input type="password"></input>
      <button type="submit">SignUp</button>
      <p>Already have an account? <u>Login</u></p>
    </form>
  )
}

export default Signup