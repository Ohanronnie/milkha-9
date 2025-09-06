import React, { useEffect } from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import { Link } from "react-router-dom";
import { LuMessagesSquare } from "react-icons/lu";
import { useState } from "react";
import ProfileModal from "../../components/Profile/ProfileModal";
import { axiosInstance } from "../../utils/axios";
import Loading from "../layout/LoadingOrNull";
import ProfileCard from "../ProfileCard";

const MyLikes = () => {
  const [likes, setLikes] = useState(null);
  useEffect(function () {
    (async () => {
      const response = await axiosInstance.get("/matchmaking/liked");
      console.log("my likes are", response.data);
      setLikes(response.data);
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Likes</h2>
      <p className="text-purple-500 pb-8">
        A List of Potential Suitors you Liked.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {!likes ? (
          <Loading data={likes} />
        ) : (
          likes?.map((profile, index) => (
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

export default MyLikes;
