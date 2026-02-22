import React, { useState } from 'react'
import "./auth.css";
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required!")
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {email, password})

      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user))
        navigate("/app")
      
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError("An error occurred. Please try again.")
      }
    }
  }
  return (
    <div className="page">
      <div className="container">
        <div className="heading">Login</div>

        <form onSubmit={handleSubmit}>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div>
            <label>Email: </label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} required></input>
          </div>
          <div>
            <label>Password: </label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} required></input>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login