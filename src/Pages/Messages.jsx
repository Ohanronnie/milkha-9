import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaVideo,
  FaPhone,
  FaEllipsisV,
  FaPaperPlane,
  FaSmile,
  FaPaperclip,
} from "react-icons/fa";
import { axiosInstance } from "../utils/axios";

const RecentMatchItem = ({ avatar, name }) => (
  <div className="flex-shrink-0 text-center">
    <div className="w-12 h-12 rounded-full overflow-hidden mb-1">
      <img src={avatar} alt={name} className="w-full h-full object-cover" />
    </div>
    <span className="text-xs text-gray-600 block truncate w-12">{name}</span>
  </div>
);

const ConversationItem = ({
  avatar,
  name,
  lastMessage,
  time,
  unreadCount,
  conversation,
  isActive = false,
  onClick,
}) => (
  <div
    className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer ${
      isActive ? "bg-blue-50 border-r-2 border-blue-500" : ""
    }`}
    onClick={onClick}
  >
    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
      <img
        src={conversation.other_user.photos?.find((v) => v.is_primary)?.photo}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {conversation.other_user.first_name +
            " " +
            conversation.other_user.last_name}
        </h3>
        {conversation.unread_count && (
          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
            {conversation.unread_count}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 truncate mt-1">
        {conversation.last_message?.content || "Nothing here yet"}
      </p>
    </div>
  </div>
);

const MessageBubble = ({ messages }) => {
  if (!messages) return;
  const { sender_profile, sender, content, sent_at } = messages;
  let [message, time] = [content, sent_at];
  time = new Date(time).toLocaleTimeString()
  const isOwn = sender_profile?.id == window.user.id;
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isOwn
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        {false ? (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        ) : (
          <p className="text-sm">{message}</p>
        )}
        {time && (
          <p
            className={`text-xs mt-1 ${
              isOwn ? "text-purple-100" : "text-gray-500"
            }`}
          >
            {time}
          </p>
        )}
      </div>
    </div>
  );
};

export default function MessagingInterface() {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [conversations, setConversations] = useState(null);
  const [ws, setWs] = useState(null);

  const [messages, setMessages] = useState(null);
  const recentMatches = [
    {
      id: 1,
      name: "Kate",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Sarah",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Emma",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Lisa",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/matchmaking/chat-rooms");
        setConversations(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (selectedConversation) {
        const messages = await axiosInstance.get(
          `/matchmaking/chat-rooms/${selectedConversation.id}/messages`
        );
        setMessages(messages.data);
        console.log("Fetched messages:", messages.data);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [selectedConversation]);
  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    setSelectedUser(conversation.name);
    setShowChat(true);
  };

  const handleBackToMessages = () => {
    setShowChat(false);
    setSelectedConversation(null);
  };

  const handleSendMessage = () => {
  if (message.trim()) {
    console.log("selectedConversation.id:", selectedConversation.id);

    axiosInstance
      .post(
        "/matchmaking/chat-rooms/" + selectedConversation.id + "/messages",
        {
          sender: window.user.user,
          content: message,
        }
      )
      .then(({ data }) => setMessages((prev) => [...prev, data]))
      .catch((error) => {
        console.error("Failed to send message:", error.message);
        alert("Failed to send message. Please try again.");
      });
    console.log("Sending message:", message);
    setMessage("");
  }
};

  return (
    <div className="flex h-[95vh] bg-white lg:px-12 p-4">
      {/* Sidebar - Hidden on mobile when chat is open */}
      <div
        className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${
          showChat ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            <FaSearch className="text-gray-400 cursor-pointer" />
          </div>

          {/* Recent matches 
          <div>
            <p className="text-sm text-gray-500 mb-3">
              Recent matches you haven't messaged
            </p>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {recentMatches.map((match) => (
                <RecentMatchItem key={match.id} {...match} />
              ))}
            </div>
          </div>*/}
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations?.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={selectedConversation?.id === conversation.id}
              onClick={() => handleConversationClick(conversation)}
            />
          ))}
        </div>
      </div>

      {/* Main Chat Area - Hidden on mobile when no chat is selected */}
      <div
        className={`flex-1 flex flex-col ${
          !showChat ? "hidden md:flex" : "flex"
        }`}
      >
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                {/* Back button for mobile */}
                <button
                  className="md:hidden mr-3 text-gray-600"
                  onClick={handleBackToMessages}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src={
                      selectedConversation.other_user.photos?.find(
                        (v) => v.is_primary
                      )?.photo
                    }
                    alt={selectedConversation.first_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {selectedConversation.other_user.first_name +
                      " " +
                      selectedConversation.other_user.last_name}
                  </h2>
                  <p className="text-xs text-green-500">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
              {/*}  <FaVideo className="text-gray-400 cursor-pointer hover:text-gray-600" />
                <FaPhone className="text-gray-400 cursor-pointer hover:text-gray-600" />
                <div className="text-gray-500 text-xs hidden sm:block">
                  View Profile
                </div> */}
                <FaEllipsisV className="text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {messages?.map((msg) => (
                <MessageBubble key={msg.id} messages={msg} />
              ))}
              <MessageBubble isTyping={true} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  {/*<div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    <FaPaperclip className="text-gray-400 cursor-pointer hover:text-gray-600" />
                    <FaSmile className="text-gray-400 cursor-pointer hover:text-gray-600" />
                  </div>*/}
                </div>
                <button
                  onClick={handleSendMessage}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-colors"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No conversation selected - desktop only */
          <div className="hidden md:flex flex-1 items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <FaSearch className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">
                Select a conversation
              </h3>
              <p>Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
