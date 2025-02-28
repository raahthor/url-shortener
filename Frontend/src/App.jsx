import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import HomePage from "./components/RoutePages/homePage.jsx";
import SignUpPage from "./components/RoutePages/signUpPage.jsx";
import LoggedInPage from "./components/RoutePages/loggedInPage.jsx";
import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

function App() {
  const [data, setUserData] = useState({
    name: "",
    username: "",
    userStats: [],
  });
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoadingdata, setIsLoadingData] = useState(true);

  async function checkAuthorization() {
    try {
      const response = await axios.get(`${baseURL}/api/checkAuthorization`, {
        withCredentials: true,
      });
      // console.log("api data", response.data);
      if (response.data.success) {
        setUserData({
          username: response.data.username,
          name: response.data.name,
          userStats: response.data.userStats,
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Error chechink auth : ", err.message);
      setIsLoggedIn(false);
    } finally {
      setIsLoadingData(false);
    }
  }

  useEffect(() => {
    checkAuthorization();
  }, []);

  if (isLoggedIn === null || isLoadingdata) return <p>Loading...</p>;

  return (
    <div className="flex h-screen flex-col overflow-y-auto overflow-x-hidden drop-shadow-2xl">
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              !isLoggedIn ? (
                <HomePage onLogin={checkAuthorization} />
              ) : (
                <Navigate to="/loggedIn" />
              )
            }
          />
          <Route
            path="/loggedIn"
            element={
              isLoggedIn ? (
                <LoggedInPage data={data} onLogout={setIsLoggedIn} />
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
