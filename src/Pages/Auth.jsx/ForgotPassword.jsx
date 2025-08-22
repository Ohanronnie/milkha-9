import React, { useState } from "react";
import { FaApple, FaGoogle, FaEyeSlash } from "react-icons/fa";
import CoupleImage from "../../assets/Couple.png"; // 👈 Your local image

import Logo from "../../assets/Logo.png"; // 👈 Your local image
import ResetLinkModal from "../../components/Auth/ResetLinkModal";
import NewPasswordModal from "../../components/Auth/NewPasswordModal";

const ForgotPassword = ({ onClose, onResend, onResetClick }) => {
  const [showResetModal, setShowResetModal] = useState(false);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);

  const handleSendResetLink = () => {
    setShowResetModal(true);
  };

  const handleResetPasswordClick = () => {
    setShowResetModal(false);
    setShowNewPasswordModal(true);
  };
  return (
    <div className="h-[100vh] grid lg:grid-cols-2  ">
      {/* Right Section - Local Image */}
      <div className="hidden lg:block">
        <img src={CoupleImage} className="h-[100vh] w-full " />
      </div>
      {/* Left Section */}
      <div className="w-full  flex flex-col items-center justify-center px-10  bg-white">
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
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email Address*</label>
            <input
              type="email"
              placeholder="hello@gmail.com"
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div
            onClick={handleSendResetLink}
            className="w-full bg-purple-600 hover:bg-purple-700 text-center text-white font-semibold py-2 rounded"
          >
            Reset Password
          </div>
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
