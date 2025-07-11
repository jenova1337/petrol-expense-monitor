import React, { useState, useEffect } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import Profile from "./Profile";

const App = () => {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState("signin");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
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
  };

  return (
    <div>
      {screen === "signup" && <Signup onSignup={handleSignup} />}

      {screen === "signin" && <Signin onSignin={handleSignin} />}

      {screen === "dashboard" && (
        <div>
          {/* Logout Button Top Right */}
          <div style={{ textAlign: "right", padding: 10 }}>
            <button onClick={handleLogout}>🚪 Log Out</button>
          </div>

          {/* Profile Section */}
          <Profile user={user} onLogout={handleLogout} />
        </div>
      )}

      {screen !== "dashboard" && (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          {screen === "signin" ? (
            <p>
              Don’t have an account?{" "}
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
