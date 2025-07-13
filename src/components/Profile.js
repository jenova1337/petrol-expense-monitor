import React from "react";

const Profile = ({ user }) => {
  if (!user) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>👤 Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Number of Bikes:</strong> {user.bikeCount}</p>
      <p><strong>Mobile Number:</strong> {user.mobile}</p>
    </div>
  );
};

export default Profile;
