// components/ResetLinkModal.jsx
import { IoMdClose } from "react-icons/io";
import React, { useState, useRef } from "react";
import NewPasswordModal from "./NewPasswordModal";
import { FaKey } from "react-icons/fa";

const ResetLinkModal = ({ email, onClose, onResend, onPasswordReset }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showNewPasswordModal, setShowNewPasswordModal] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
    if (!value && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
    if (paste.length === 6) {
      setOtp(paste.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.some((digit) => digit === "")) {
      setError("Please enter the 6-digit code.");
      return;
    }
    setError("");
    setShowNewPasswordModal(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl focus:outline-none"
          aria-label="Close"
        >
          <IoMdClose />
        </button>

        {/* Icon */}
        <div className="flex flex-col items-center mb-4">
          <div
            className="relative mb-2 flex items-center justify-center"
            style={{ width: "4.5rem", height: "4.5rem" }}
          >
            {/* Outermost layer */}
            <span className="absolute flex items-center justify-center w-full h-full">
              <span className="bg-purple-50 rounded-full w-full h-full" />
            </span>
            {/* Middle layer */}
            <span className="absolute flex items-center justify-center w-12 h-12">
              <span className="bg-purple-100 rounded-full w-full h-full" />
            </span>
            {/* SVG icon layer */}
            <span className="relative z-10 bg-transparent rounded-full w-10 h-10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-purple-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.06 1.915l-7.44 4.65a2.25 2.25 0 01-2.4 0l-7.44-4.65a2.25 2.25 0 01-1.06-1.915V6.75"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Title and Text */}
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Reset Link Sent
        </h2>
        <p className="text-sm text-gray-500 mb-4 text-center">
          We sent a password reset link to <br />
          <span className="font-medium">{email}</span>
        </p>

        {/* OTP Code Form */}
        {!showNewPasswordModal && (
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium">OTP Code*</label>
              <div
                className="flex justify-between gap-2 mt-1"
                onPaste={handleOtpPaste}
              >
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    onChange={(e) => handleOtpChange(e, idx)}
                    className="w-10 h-12 border rounded text-center text-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-center text-white font-semibold py-2 rounded mb-2"
            >
              Continue
            </button>
          </form>
        )}
        {showNewPasswordModal && (
          <NewPasswordModal
            onClose={() => {
              onClose && onClose();
              onPasswordReset && onPasswordReset();
            }}
            email={email}
            otp={otp.join("")}
          />
        )}

        {/* Resend Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Didn't receive the email?{" "}
          <button
            type="button"
            onClick={onResend}
            className="text-purple-600 hover:underline"
          >
            Click to resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResetLinkModal;
