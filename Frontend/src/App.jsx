import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import HomePage from "./components/RoutePages/homePage.jsx";
import SignUpPage from "./components/RoutePages/signUpPage.jsx";
import LoggedInPage from "./components/RoutePages/loggedInPage.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    userStats: [{}],
  });

  return (
    <div className="flex h-screen flex-col overflow-y-auto overflow-x-hidden drop-shadow-2xl">
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              !isLoggedIn ? (
                <HomePage onLogin={setIsLoggedIn} setData={setUserData} />
              ) : (
                <Navigate to="/loggedIn" />
              )
            }
          />
          <Route
            path="/loggedIn"
            element={
              isLoggedIn ? (
                <LoggedInPage onLogout={setIsLoggedIn} data={userData} />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
