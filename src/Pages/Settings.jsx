import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axios";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userSetting, setUserSetting] = useState(null);
  const [notificationSettings, setNotificationSettings] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const toggleSetting = (index) => {
    setNotificationSettings((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  useEffect(() => {
    const fetchSettingsData = async () => {
      const response = await axiosInstance.get("/profile/settings/account");
      setUserSetting(response.data);
    };
    fetchSettingsData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const response = await axiosInstance.patch("/profile/settings/account", {
        ...userSetting,
      });
      console.log("Settings updated:", response.data);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    // Dummy API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setDeleting(false);
    setShowDeleteModal(false);
    navigate("/signup");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl space-y-6 relative">
      {/* ACCOUNT INFORMATION */}
      <section className="bg-[#f5edff] p-4 rounded-xl">
        <h2 className="text-sm font-bold text-purple-800 uppercase mb-4">
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              First Name
            </label>
            <input
              type="text"
              value={userSetting?.first_name || "Jane"}
              onChange={(e) =>
                setUserSetting({ ...userSetting, first_name: e.target.value })
              }
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={userSetting?.last_name || "Doe"}
              onChange={(e) =>
                setUserSetting({ ...userSetting, last_name: e.target.value })
              }
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={userSetting?.email || "hello@gmail.com"}
            onChange={(e) =>
              setUserSetting({ ...userSetting, email: e.target.value })
            }
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </section>

      {/* LANGUAGE */}
      <section className="bg-[#f5edff] p-4 rounded-xl">
        <h2 className="text-sm font-bold text-purple-800 uppercase mb-4">
          Language
        </h2>
        <select className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400">
          <option>English</option>
          {/* <option>French</option>
          <option>Arabic</option> */}
        </select>
      </section>

      {/* CHANGE PASSWORD */}
      <section className="bg-[#f5edff] p-4 rounded-xl">
        <h2 className="text-sm font-bold text-purple-800 uppercase mb-4">
          Change Password
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              className="w-full p-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-2 top-9 text-gray-500"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
        >
          Save Changes
        </button>
      </section>

      {/* NOTIFICATIONS */}
      <section className="bg-[#f5edff] p-4 rounded-xl">
        <h2 className="text-sm font-bold text-purple-800 uppercase mb-4">
          Notifications
        </h2>
        <div className="space-y-4">
          {notificationSettings.map((item, idx) => (
            <div key={idx} className="flex items-start justify-between">
              <div className="pr-4">
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => toggleSetting(idx)}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${
                  item.enabled ? "bg-purple-600" : "bg-gray-300"
                }`}
                role="switch"
                aria-checked={item.enabled}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full shadow-md transition-transform duration-300 ${
                    item.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* DELETE BUTTON */}
      <div className="text-center">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md mt-4"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4 text-red-600">
              Confirm Account Deletion
            </h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                onClick={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
