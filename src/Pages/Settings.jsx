import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Settings = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl space-y-6">
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
              value="Jane"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Last Name
            </label>
            <input
              type="text"
              value="Jane"
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
            value="hello@jane.com"
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
          <option>French</option>
          <option>Arabic</option>
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
        <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
          Save Changes
        </button>
      </section>

      {/* NOTIFICATIONS */}
      <section className="bg-[#f5edff] p-4 rounded-xl">
        <h2 className="text-sm font-bold text-purple-800 uppercase mb-4">
          Notifications
        </h2>
        <div className="space-y-4">
          {[
            {
              label: "Email Updates",
              desc: "Get notified about new features, offers, and announcements via email.",
              enabled: true,
            },
            {
              label: "Security Alerts",
              desc: "Receive alerts for login or password changes.",
              enabled: true,
            },
            {
              label: "Profile Views & Likes",
              desc: "See who viewed or liked your profile.",
              enabled: true,
            },
            {
              label: "New Match Alerts",
              desc: "Be notified when a new match is found.",
              enabled: false,
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked={item.enabled}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-purple-600 transition-all duration-300"></div>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* DELETE BUTTON */}
      <div className="text-center">
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md mt-4">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
