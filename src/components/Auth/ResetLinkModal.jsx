// components/ResetLinkModal.jsx
import { IoMdClose } from "react-icons/io";

const ResetLinkModal = ({ email, onClose, onResend, onResetClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose size={24} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-purple-100 p-3 rounded-full">
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
          </div>
        </div>

        {/* Title and Text */}
        <h2 className="text-xl font-semibold text-center mb-2">
          Reset Link Sent
        </h2>
        <p className="text-gray-600 text-center mb-6">
          We sent a password reset link to <br />
          <span className="font-medium">{email}</span>
        </p>

        {/* Reset Button */}
        <div
          onClick={onResetClick}
          className="w-full bg-purple-600 hover:bg-purple-700 text-center text-white py-2 rounded-md transition"
        >
          Reset Password
        </div>

        {/* Resend Link */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Didn't receive the email?{" "}
          <button
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
