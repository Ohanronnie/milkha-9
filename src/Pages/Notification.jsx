import React from "react";
import { FaBell, FaUser, FaUserPlus, FaHeart, FaComment } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

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
  const notifications = [
    {
      id: 1,
      message: "Michael Bell sent you a message",
      time: "8 minutes",
      icon: <FaComment className="w-4 h-4" />,
      isUnread: true,
    },
    {
      id: 2,
      message: "You've been Matched",
      time: "25 minutes",
      description:
        "You and I love have a mutual friend or acquaintance, check them now!",
      icon: <FaHeart className="w-4 h-4" />,
      isUnread: true,
    },
    {
      id: 3,
      message: "You've been Matched",
      time: "28 minutes",
      description:
        "You and I love have a mutual friend or acquaintance, check them now!",
      icon: <FaHeart className="w-4 h-4" />,
      isUnread: true,
    },
    {
      id: 4,
      message: "You've been Matched",
      time: "40 minutes",
      description:
        "You and I love have a mutual friend or acquaintance, check them now!",
      icon: <FaHeart className="w-4 h-4" />,
      isUnread: true,
    },
    {
      id: 5,
      message: "Profile Views",
      time: "2 hours ago",
      description:
        "Your profile was viewed 12 times. Update your preferences for better matches.",
      icon: <FaUser className="w-4 h-4" />,
    },
    {
      id: 6,
      message: "8 Messages!",
      time: "2 hours ago",
      description: "You have 8 new messages and waiting to get some attention.",
      icon: <FaComment className="w-4 h-4" />,
    },
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <FaBell className="w-5 h-5 text-purple-500" />
          <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start space-x-3 p-4 hover:bg-gray-50 transition-colors ${
              notification.isUnread ? "bg-purple-50" : ""
            }`}
          >
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <FaUser className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {notification.message}
                    {notification.id === 1 && (
                      <MdVerified className="inline w-4 h-4 text-purple-500 ml-1" />
                    )}
                  </p>
                  {notification.description && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {notification.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="text-purple-500 flex-shrink-0">
                    {notification.icon}
                  </div>
                  {notification.isUnread && (
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
