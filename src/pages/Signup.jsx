import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/signup", {name, email, password})

      if (response.status === 201){
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("")
        
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Name: </label>
        <input type="text" value={name} onChange={handleNameChange} required></input>
      </div>

      <div>
        <label>Email: </label>
        <input type="email" id="email" value={email} onChange={handleEmailChange} required></input>
      </div>

      <div>
        <label>Password: </label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} required></input>
      </div>

      <div>
        <label>Confirm password: </label>
        <input type="password" id="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} required></input>
      </div>
      <div>
        <button type="submit">SignUp</button>
        <p>Already have an account? <span style={{ color: "blue", cursor:"pointer"}} onClick={() => navigate("/login")}>Login</span></p>
      </div>
    </form>
  )
}

export default Signup