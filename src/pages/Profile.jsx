import React, { useState } from "react";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();

  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      return null;
    }

    return JSON.parse(storedUser);
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page">
        <div className="container">
            <h2 className="heading">My Profile</h2>
            <div className="profile-info">
                <p className="welcome">Hi {user.name}! Welcome to Mrembo</p>
                <div className="info-card">
                    <span>Email</span>
                    <p>{user.email}</p>
                </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
};

export default Profile;