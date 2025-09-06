import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import ShortlistedProfiles from "./Pages/ShortlistedProfiles";
import Settings from "./Pages/Settings";
import FilterBar from "./components/Search/FilterBar";
import Search from "./Pages/Search";
import Notifications from "./Pages/Notification";
import MessagingInterface from "./Pages/Messages";
import SignupPage from "./Pages/Auth.jsx/Signup";
import OTP from "./Pages/Auth.jsx/OTP";
import Login from "./Pages/Auth.jsx/Login";
import ForgotPassword from "./Pages/Auth.jsx/ForgotPassword";
import MatchModal from "./components/Profile/MatchModal";
import StepperForm from "./Pages/StepperForm";
import Navbar from "./components/layout/Navbar";

import Layout from "./components/layout/Layout";
import Matches from "./Pages/Matches";
import { axiosInstance } from "./utils/axios";
import { useEffect, useState } from "react";
import { set } from "date-fns";

const ProtectedRoute = ({ children }) => {
  const access = localStorage.getItem("access_token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        if (!response.data || !response.data?.first_name) {
          return setError(1);
        }
        window.user = response.data;
        console.log("User profile:", response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (error.response && error.response.status === 404) {
          setError(1);
        } else {
          setError(0);
        }
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);
  if (!access) return <Navigate to="/login" replace />;
  if (!loading) {
    if (error === 0) {
      return <Navigate to="/login" replace />;
    } else if (error === 1) {
      return <Navigate to="/RegistrationForms" replace />;
    } else if (!error) {

      console.log(1234, error);
      return children;
    } else {
      console.log(error)
    }
  }
};
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />

          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/Signup" element={<SignupPage />} />

          <Route path="/OTP" element={<OTP />} />

          <Route path="/RegistrationForms" element={<StepperForm />} />

          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Match"
              element={
                <ProtectedRoute>
                  <MatchModal />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ShortlistedProfiles"
              element={
                <ProtectedRoute>
                  <ShortlistedProfiles />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Matches"
              element={
                <ProtectedRoute>
                  <Matches />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Messages"
              element={
                <ProtectedRoute>
                  <MessagingInterface />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />

            <Route
              path="/Notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
