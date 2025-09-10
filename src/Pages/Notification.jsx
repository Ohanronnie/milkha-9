import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaBell, FaUser } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { axiosInstance } from "../utils/axios";

const NotificationItem = ({
  icon,
  avatar,
  message,
  time,
  isUnread = false,
}) => (
  <div
    className={`flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors ${
      isUnread ? "bg-purple-50" : ""
    }`}
  >
    <div className="flex-shrink-0">
      {avatar ? (
        <img src={avatar} alt="User avatar" className="w-8 h-8 rounded-full" />
      ) : (
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <FaUser className="w-4 h-4 text-gray-600" />
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between">
        <p className="text-sm text-gray-900 leading-relaxed">{message}</p>
        <div className="flex items-center space-x-2 ml-4">
          <div className="text-purple-500 flex-shrink-0">{icon}</div>
          {isUnread && (
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await axiosInstance.post("/notifications/mark-read/");
      // Re-fetch notifications to update UI
      const response = await axiosInstance.get("/notifications");
      setNotifications(response.data);
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all as read");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaBell className="w-5 h-5 text-purple-500" />
          <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="text-xs text-purple-600 hover:underline px-2 py-1 rounded focus:outline-none"
        >
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            icon={
              notification.id === 1 ? (
                <>
                  {notification.icon}
                  <MdVerified className="inline w-4 h-4 text-purple-500 ml-1" />
                </>
              ) : (
                notification.icon
              )
            }
            avatar={notification.avatar}
            message={
              <>
                <span className="font-medium">{notification.message}</span>
                {notification.description && (
                  <span className="block text-xs text-gray-500 mt-1 leading-relaxed">
                    {notification.description}
                  </span>
                )}
              </>
            }
            time={notification.time}
            isUnread={notification.isUnread}
          />
        ))}
      </div>
    </div>
  );
}
