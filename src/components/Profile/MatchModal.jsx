// components/MatchModal.jsx
import { useEffect, useState } from "react";
import Profile from "../../assets/Profile.png";

const MatchModal = ({ onClose, onSendMessage, user1, user2 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay entry animation
    setTimeout(() => setShow(true), 50);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div
        className={`bg-[#ba9cff] rounded-xl text-white px-6 py-8 w-[90%] max-w-md transform transition duration-500 ease-out ${
          show ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">It’s a match!</h2>

        {/* Profile Cards */}
        <div className="relative flex justify-center items-center mb-8">
          <img
            src={Profile}
            alt="You"
            className="w-32 h-40 object-cover rounded-lg shadow-lg transform -rotate-6 -translate-x-4 z-10"
          />
          <img
            src={Profile}
            alt="Match"
            className="w-32 h-40 object-cover rounded-lg shadow-lg transform rotate-6 translate-x-4 z-10"
          />

          {/* Heart in Center */}
          <div className="absolute bg-white p-3 rounded-full shadow-xl z-20">
            <svg
              className="w-8 h-8 text-pink-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.13 2.44h1.74C14.09 5.01 15.76 4 17.5 4 20 4 22 6 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <p className="text-center text-lg mb-6">
          You and <span className="font-semibold">Zaria</span> like each other.{" "}
          Why not say Hi and be nice?
        </p>

        {/* Buttons */}
        <button
          onClick={onSendMessage}
          className="w-full bg-white text-purple-700 font-semibold py-2 rounded mb-3 shadow-md hover:bg-gray-100 transition"
        >
          Send Message
        </button>
        <button
          onClick={onClose}
          className="w-full text-white text-sm underline hover:text-gray-200"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
};

export default MatchModal;
