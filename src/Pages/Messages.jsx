import React, { useEffect, useState, useRef } from "react";
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

const NewMatches = ({ matches, onStartChat }) => {
  if (!matches || matches.length === 0) return null;

  return (
    <div>
      <p className="text-sm text-gray-700 mb-2 font-semibold">New matches</p>
      <div className="flex space-x-3 overflow-x-auto [&::-webkit-scrollbar]:hidden  pb-2">
        {matches.map((match) => (
          <button
            key={match.id}
            className="flex-shrink-0 focus:outline-none"
            onClick={() => onStartChat && onStartChat(match)}
            style={{ minWidth: "6rem" }}
          >
            <div className="relative w-28 h-40 md:w-24 md:h-32 rounded-2xl overflow-hidden shadow border-2 border-purple-300">
              <img
                src={match.avatar || "/default-avatar.png"}
                alt={match.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full py-2 px-1">
                <span className="text-md md:text-md font-bold text-white block truncate text-center">
                  {match.name}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const ConversationItem = ({ conversation, isActive = false, onClick }) => (
  <div
    className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer ${
      isActive ? "bg-blue-50 border-r-2 border-blue-500" : ""
    }`}
    onClick={onClick}
  >
    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
      <img
        src={conversation.photo || "/default-avatar.png"}
        // src={
        //   conversation.other_user.photos?.find((v) => v.is_primary)?.photo ||
        //   "/default-avatar.png"
        // }
        alt={conversation.other_user.first_name}
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
        {conversation.unread_count > 0 && (
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

const MessageBubble = ({ message }) => {
  if (!message) return null;

  const { sender_profile, content, sent_at } = message;
  const time = new Date(sent_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const isOwn = sender_profile?.id === window.user.id;

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isOwn
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <p className="text-sm">{content}</p>
        <p
          className={`text-xs mt-1 ${
            isOwn ? "text-purple-100" : "text-gray-500"
          }`}
        >
          {time}
        </p>
      </div>
    </div>
  );
};

export default function MessagingInterface() {
  const [message, setMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const conversationsPollingIntervalRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // Fetch conversations with polling
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosInstance.get("/matchmaking/chat-rooms/");
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    // Initial fetch
    //fetchConversations();

    // Set up polling for conversations
    conversationsPollingIntervalRef.current = setInterval(
      fetchConversations,
      5000
    ); // Poll every 5 seconds

    // Clean up interval on component unmount
    return () => {
      if (conversationsPollingIntervalRef.current) {
        clearInterval(conversationsPollingIntervalRef.current);
      }
    };
  }, []);

  // Fetch messages for selected conversation with polling
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;

      try {
        const response = await axiosInstance.get(
          `/matchmaking/chat-rooms/${selectedConversation.id}/messages/`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedConversation) {
      // Initial fetch
      setIsLoading(true);
      fetchMessages();
      console.log("Selected conversation:", selectedConversation);

      // Set up polling for messages
      pollingIntervalRef.current = setInterval(fetchMessages, 3000); // Poll every 3 seconds

      // Clean up interval when conversation changes or component unmounts
      return () => {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
      };
    }
  }, [selectedConversation]);

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    setShowChat(true);

    // Mark messages as read when opening conversation
    if (conversation.unread_count > 0) {
      markMessagesAsRead(conversation.id);
    }
  };

  const markMessagesAsRead = async (roomId) => {
    try {
      await axiosInstance.post("/matchmaking/message/mark-read/", {
        chat_id: roomId,
      });

      // Update conversations to reflect read status
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === roomId ? { ...conv, unread_count: 0 } : conv
        )
      );
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  const handleBackToMessages = () => {
    setShowChat(false);
    setSelectedConversation(null);

    // Clear the messages polling interval
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedConversation || isSending) return;

    setIsSending(true);
    try {
      const response = await axiosInstance.post(
        `/matchmaking/chat-rooms/${selectedConversation.id}/messages/`,
        {
          sender: window.user.user,
          content: message,
        }
      );

      // Add the new message to the messages list immediately for better UX
      setMessages((prev) => [...prev, response.data]);
      setMessage("");

      // Update the conversation list with the last message
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, last_message: response.data }
            : conv
        )
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white lg:px-12 p-4">
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

          {/* Recent matches - Uncomment if needed */}
          {/* <div>
            <p className="text-sm text-gray-500 mb-3">
              Recent matches you haven't messaged
            </p>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {recentMatches.map((match) => (
                <RecentMatchItem key={match.id} {...match} />
              ))}
            </div>
          </div> */}
          {/* pass in the user they havent chatted with yet */}
          <NewMatches
            matches={conversations
              .filter((c) => !c.last_message)
              .map((c) => ({
                id: c.other_user.id,
                name: c.other_user.first_name,
                avatar: c.photo || "/default-avatar.png",
                conversation: c,
              }))}
            onStartChat={(match) => {
              setSelectedConversation(match.conversation);
              setShowChat(true);
            }}
          />
          {/* <NewMatches matches={recentMatches} /> */}
        </div>

        {/* Conversations List */}
        <p className="text-sm text-gray-700 ml-2 my-2 font-semibold">
          Active Chats
        </p>
        <div className="flex-1 overflow-y-auto">
          {conversations.length > 0 ? (
            conversations
              .filter((conversation) => conversation.last_message) // Only show if there's a message
              .map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isActive={selectedConversation?.id === conversation.id}
                  onClick={() => handleConversationClick(conversation)}
                />
              ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No conversations yet
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area - Hidden on mobile when no chat is selected */}
      <div
        className={`flex-1 flex flex-col ${
          !showChat ? "hidden md:flex" : "flex"
        }`}
      >
        {selectedConversation ? (
          <div className="flex flex-col">
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
                    src={selectedConversation.photo || "/default-avatar.png"}
                    // src={
                    //   selectedConversation.other_user.photos?.find(
                    //     (v) => v.is_primary
                    //   )?.photo || "/default-avatar.png"
                    // }
                    alt={selectedConversation.other_user.first_name}
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
                <FaEllipsisV className="text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-[40rem] overflow-y-auto p-4 bg-gray-50">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                </div>
              ) : messages.length > 0 ? (
                <>
                  {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="flex flex-col w-56 mx-auto items-center justify-center h-full text-gray-500">
                  <div className="mb-4 text-base items-center justify-center text-center font-semibold text-gray-700">
                    You are matched with
                    <br />
                    {selectedConversation.other_user.first_name}{" "}
                    {selectedConversation.other_user.last_name}
                  </div>
                  <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-purple-200 shadow">
                    <img
                      src={selectedConversation.photo || "/default-avatar.png"}
                      alt={selectedConversation.other_user.first_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-500 text-center">
                    Don&apos;t be shy! Say something nice to start a
                    conversation
                  </div>
                </div>
              )}
            </div>
            {/* Message Input */}
            <div className="bg-gray-50 fixed md:w-[72.5%] w-full bottom-0 p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) =>
                      e.key === "Enter" && !isSending && handleSendMessage()
                    }
                    disabled={isSending}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isSending}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <FaPaperPlane className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
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
