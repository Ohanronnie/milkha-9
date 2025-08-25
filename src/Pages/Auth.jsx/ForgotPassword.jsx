import React, { useState } from "react";
import { FaApple, FaGoogle, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import CoupleImage from "../../assets/Couple.png"; // 👈 Your local image
import Logo from "../../assets/Logo.png"; // 👈 Your local image
import ResetLinkModal from "../../components/Auth/ResetLinkModal";
import NewPasswordModal from "../../components/Auth/NewPasswordModal";
import { axiosInstance } from "../../utils/axios";

const ForgotPassword = ({ onClose, onResend, onResetClick }) => {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendResetLink = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axiosInstance.post("/auth/password/reset/", { email });

      console.log("Reset link sent:", response.data);
      setShowResetModal(true);
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send reset link. Please try again."
      );
    }
  };


  

  const handleResetPasswordClick = () => {
    setShowResetModal(false);
    setShowNewPasswordModal(true);
  };

  return (
    <div className="h-[100vh] grid lg:grid-cols-2">
      {/* Right Section - Local Image */}
      <div className="hidden lg:block">
        <img src={CoupleImage} className="h-[100vh] w-full" />
      </div>
      {/* Left Section */}
      <div className="w-full flex flex-col items-center justify-center px-10 bg-white">
        {/* Logo */}
        <div className="mb-6">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>
        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Forgot password?
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          No Worries, we'll send you reset instructions
        </p>
        {/* Email Signup Form */}
        <form className="space-y-4" onSubmit={handleSendResetLink}>
          <div>
            <label className="text-sm font-medium">Email Address*</label>
            <input
              type="email"
              placeholder="hello@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-center text-white font-semibold py-2 rounded"
          >
            Reset Password
          </button>
        </form>
        {showResetModal && (
          <ResetLinkModal
            onClose={() => setShowResetModal(false)}
            onResend={() => alert("Resend clicked")}
            onResetClick={handleResetPasswordClick}
          />
        )}
        {showNewPasswordModal && (
          <NewPasswordModal onClose={() => setShowNewPasswordModal(false)} />
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;