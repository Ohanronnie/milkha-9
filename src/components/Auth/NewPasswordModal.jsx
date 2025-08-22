// components/NewPasswordModal.jsx
const NewPasswordModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Set New Password
        </h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border rounded px-3 py-2 mb-4"
        />
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">
          Save Password
        </button>
      </div>
    </div>
  );
};

export default NewPasswordModal;
