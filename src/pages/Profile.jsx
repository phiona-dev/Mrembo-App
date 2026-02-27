import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

const Profile = () => {
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    },[])

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
    }
    
  return (
    <div>
        <h2>Profile</h2>
        <p>Hi {user.name} ! Welcome to Mrembo</p>
        <p>{user.email}</p>
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Profile