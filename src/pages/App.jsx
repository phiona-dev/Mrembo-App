import React from 'react'
import { useNavigate } from 'react-router'


const AppPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Hello App</h1>
      <p>Go to <span style={{ color: "blue", cursor: "pointer"}} onClick={() => navigate("/profile")}>profile </span>page</p>
    </div>

  )
}

export default AppPage