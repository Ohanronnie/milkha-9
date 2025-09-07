import React from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import { Link } from "react-router-dom";
import { LuMessagesSquare } from "react-icons/lu";
import { useState, useEffect } from "react";
import ProfileModal from "../../components/Profile/ProfileModal";
import { axiosInstance } from "../../utils/axios";
import Loading from "../layout/LoadingOrNull";
import ProfileCard from "../ProfileCard";

const LikedMe = () => {
  const [profiles, setProfiles] = useState();
  const [selectedProfile, setSelectedProfile] = useState(null);

  useEffect(() => {
    const fetchLikedUsers = async () => {
      try {
        const response = await axiosInstance.get('/matchmaking/users-who-liked-me');
        console.log("Users who liked me:", response.data);
        setProfiles(response.data);
      } catch (error) {
        console.error("Failed to fetch liked users:", error);
      }
    };

    fetchLikedUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Matched Profiles
      </h2>
      <p className="text-purple-500 pb-8">
        A List of Potential Dates that liked you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {!profiles ? (
          <Loading data={profiles} />
        ) : (
          profiles?.map((profile, index) => (
            <ProfileCard
              key={index}
              profile={profile.matched_profile}
              optionalPhoto={profile.photo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LikedMe;