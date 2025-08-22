import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../assets/Profile.png";
import { Link } from "react-router-dom";
import { LuMessagesSquare } from "react-icons/lu";
import { useState } from "react";
import ProfileModal from "../components/Profile/ProfileModal";
import LikedMe from "../components/Matches/LikedMe";
import MyLikes from "../components/Matches/MyLikes";
import MatchList from "../components/Matches/MatchList";
import Loading from "../components/layout/LoadingOrNull";

const profiles = [
  {
    name: "Odrea Azur",
    age: 27,
    location: "Middle-East, UAE",
    status: "ISLAM",
    image: Profile, // Replace with your local image path
    completion: 75,
  },
  {
    name: "Odrea Azur",
    age: 27,
    location: "Middle-East, UAE",
    status: "ISLAM",
    image: Profile,
    completion: 75,
  },
  {
    name: "Odrea Azur",
    age: 27,
    location: "Middle-East, UAE",
    status: "ISLAM",
    image: Profile,
    completion: 75,
  },
];

const Matches = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [activeTab, setActiveTab] = useState("match");

  const renderContent = () => {
    switch (activeTab) {
      case "match":
        return <MatchList />;
      case "likes":
        return <MyLikes />;
      case "likedMe":
        return <Loading />;
      default:
        return null;
    }
  };
  return (
    <div className="bg-gray-50 lg:px-12 p-4">
      <div className="w-full  mx-auto mt-6">
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "match"
                ? "border-b-2 border-purple-500 text-purple-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("match")}
          >
            Match List
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "likes"
                ? "border-b-2 border-purple-500 text-purple-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("likes")}
          >
            My Likes
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "likedMe"
                ? "border-b-2 border-purple-500 text-purple-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("likedMe")}
          >
            Liked Me
          </button>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-b">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Matches;
