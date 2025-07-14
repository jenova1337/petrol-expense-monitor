import React, { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import AddBike from "./components/AddBike";
import BikeDetails from "./components/BikeDetails";
import PetrolPump from "./components/PetrolPump";
import Mileage from "./components/Mileage";
import Summary from "./components/Summary";

const App = () => {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("signin");
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      setScreen("dashboard");
    }
    const savedBikes = JSON.parse(localStorage.getItem("bikes") || "[]");
    setBikes(savedBikes);
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

  const handleBikeAdded = () => {
    const updatedBikes = JSON.parse(localStorage.getItem("bikes") || "[]");
    setBikes(updatedBikes);
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
          <AddBike onAdd={handleBikeAdded} />
          <hr />
          <BikeDetails bikes={bikes} />
          <hr />
          <PetrolPump bikes={bikes} />
          <hr />
          <Mileage bikes={bikes} />
          <hr />
          <Summary bikes={bikes} />
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

