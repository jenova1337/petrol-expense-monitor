import React, { useState, useEffect } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import Profile from "./Profile";
import AddBike from "./AddBike";
import BikeDetails from "./BikeDetails";
import PetrolPump from "./PetrolPump";
import Mileage from "./Mileage";

const App = () => {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("signin");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setScreen("dashboard");
    }
  }, []);

  const handleSignup = () => {
    setScreen("signin");
  };

  const handleSignin = (userData) => {
    setUser(userData);
    setScreen("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setScreen("signin");
    setActiveTab("profile");
    localStorage.removeItem("user");
  };

  const renderDashboard = () => {
    return (
      <div style={{ padding: "20px" }}>
        {/* Logout and Tabs */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div>
            <button onClick={() => setActiveTab("profile")}>👤 Profile</button>
            <button onClick={() => setActiveTab("addbike")}>➕ Add Bike</button>
            <button onClick={() => setActiveTab("bikedetails")}>📋 Bike Details</button>
            <button onClick={() => setActiveTab("petrol")}>⛽ Petrol Pump</button>
            <button onClick={() => setActiveTab("mileage")}>📊 Mileage</button>
          </div>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && <Profile user={user} />}
        {activeTab === "addbike" && <AddBike onAdd={() => setActiveTab("bikedetails")} />}
        {activeTab === "bikedetails" && <BikeDetails />}
        {activeTab === "petrol" && <PetrolPump />}
        {activeTab === "mileage" && <Mileage />}
      </div>
    );
  };

  return (
    <div>
      {screen === "signup" && <Signup onSignup={handleSignup} />}
      {screen === "signin" && <Signin onSignin={handleSignin} />}
      {screen === "dashboard" && renderDashboard()}

      {/* Bottom switch between sign up and sign in */}
      {screen !== "dashboard" && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          {screen === "signin" ? (
            <p>
              Don't have an account?{" "}
              <button onClick={() => setScreen("signup")}>Sign Up</button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setScreen("signin")}>Sign In</button>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
