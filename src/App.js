import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import AddBike from "./components/AddBike";
import BikeDetails from "./components/BikeDetails";
import PetrolPump from "./components/PetrolPump";
import Mileage from "./components/Mileage";

const App = () => {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("signin");

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
    localStorage.removeItem("user");
  };

  const handleBikeAdd = () => {
    // Optional: reload data or give feedback
    console.log("Bike added");
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      {screen === "signup" && <Signup onSignup={handleSignup} />}
      {screen === "signin" && <Signin onSignin={handleSignin} />}

      {screen === "dashboard" && (
        <>
          <div style={{ textAlign: "right" }}>
            <button onClick={handleLogout}>🚪 Log Out</button>
          </div>

          <h2>🏍️ Petrol Expense Monitor Dashboard</h2>

          <Profile user={user} />
          <hr />
          <AddBike onAdd={handleBikeAdd} />
          <hr />
          <BikeDetails />
          <hr />
          <PetrolPump />
          <hr />
          <Mileage />
        </>
      )}

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
