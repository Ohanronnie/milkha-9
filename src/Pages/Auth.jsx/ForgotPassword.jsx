import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ResetLinkModal from "../../components/Auth/ResetLinkModal";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
const ForgotPassword = ({ onClose }) => {
  const [showResetModal, setShowResetModal] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendResetLink = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axiosInstance.post(
        "/auth/password/reset/request",
        {
          email,
        }
      );
      if (response.data) {
        toast.success("Reset link sent! Please check your email.");
        setShowResetModal(true);
        setError("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send reset link. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      {/* Only show the main ForgotPassword modal content if sub-modal is not open */}
      {!showResetModal && (
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative flex flex-col items-center">
          {/* X Icon for closing modal */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl focus:outline-none"
            onClick={onClose}
            aria-label="Close"
          >
            <IoMdClose />
          </button>
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
              {/* Key icon layer */}
              <span className="relative z-10 bg-transparent rounded-full w-10 h-10 flex items-center justify-center">
                <FaKey className="text-purple-600 text-2xl" />
              </span>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Forgot password?
            </h2>
            <p className="text-sm text-gray-500 mb-4 text-center">
              No worries, we&apos;ll send you reset instructions
            </p>
          </div>
          <form className="space-y-4 w-full" onSubmit={handleSendResetLink}>
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
        </div>
      )}
      {/* Show ResetLinkModal or NewPasswordModal as overlays, same size as main modal */}
      {showResetModal && (
        <ResetLinkModal
          email={email}
          onClose={() => setShowResetModal(false)}
          onResend={() => setShowResetModal(false)}
          onPasswordReset={() => {
            setShowResetModal(false);
            onClose && onClose();
          }}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
