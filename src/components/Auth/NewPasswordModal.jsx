import React, { useState } from "react";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";

const NewPasswordModal = ({ onClose, email, otp }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordValid, setPasswordValid] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const validatePassword = (pwd) => {
    return {
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      lower: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    };
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setNewPassword(pwd);
    setPasswordValid(validatePassword(pwd));
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    const valid = validatePassword(newPassword);
    if (
      !valid.length ||
      !valid.upper ||
      !valid.lower ||
      !valid.number ||
      !valid.special
    ) {
      setError("Password does not meet requirements.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post("/auth/password/reset/otp/", {
        email,
        otp,
        new_password: newPassword,
        confirm_new_password: confirmPassword,
      });
      toast.success("Password reset successful!");
      setError("");
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full relative flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        {/* Circle check icon with two-layered effect inside the card, above heading */}
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
          {/* Check icon layer */}
          <span className="relative z-10 bg-transparent rounded-full w-10 h-10 flex items-center justify-center">
            <FaCheckCircle className="text-purple-600 text-2xl" />
          </span>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-center">
          Set new Password
        </h2>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Your new password must be different to previously used passwords.
        </p>
        <form onSubmit={handleSavePassword} className="w-full">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handlePasswordChange}
            className="w-full border rounded px-3 py-2 mb-3"
            minLength={8}
            required
          />
          {/* Password validation checklist */}
          <ul className="mb-2 text-xs text-gray-600">
            <li className={passwordValid.length ? "text-green-600" : ""}>
              • At least 8 characters
            </li>
            <li className={passwordValid.upper ? "text-green-600" : ""}>
              • At least one uppercase letter
            </li>
            <li className={passwordValid.lower ? "text-green-600" : ""}>
              • At least one lowercase letter
            </li>
            <li className={passwordValid.number ? "text-green-600" : ""}>
              • At least one number
            </li>
            <li className={passwordValid.special ? "text-green-600" : ""}>
              • At least one special character
            </li>
          </ul>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4"
            minLength={8}
            required
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPasswordModal;
