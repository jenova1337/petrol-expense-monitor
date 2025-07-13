import React from "react";

const Profile = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      <p><strong>Total Bikes:</strong> {user.bikeCount}</p>

      <button onClick={onLogout}>🚪 Log Out</button>
    </div>
  );
};

export default Profile;
