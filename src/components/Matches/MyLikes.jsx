import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import { Link } from "react-router-dom";
import { LuMessagesSquare } from "react-icons/lu";
import ProfileModal from "../../components/Profile/ProfileModal";
import { axiosInstance } from "../../utils/axios";
import Loading from "../layout/LoadingOrNull";
import ProfileCard from "../ProfileCard";

const MyLikes = () => {
  const [likes, setLikes] = useState(null);
  const [mutuals, setMutuals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [likesRes, mutualsRes] = await Promise.all([
          axiosInstance.get("/matchmaking/liked"),
          axiosInstance.get("/matchmaking/mutual"),
        ]);
        setLikes(likesRes.data);
        setMutuals(mutualsRes.data);
      } catch (err) {
        setLikes([]);
        setMutuals([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Build a set of mutual matched_profile ids for fast lookup
  const mutualIds = mutuals?.map((m) => m.matched_profile?.id) || [];

  // Filter out likes that are also in mutuals
  const filteredLikes = likes?.filter(
    (profile) => !mutualIds.includes(profile.matched_profile?.id)
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Likes</h2>
      <p className="text-purple-500 pb-8">
        A List of Potential Suitors you Liked.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <Loading data={likes} />
        ) : (
          filteredLikes?.map((profile, index) => (
            <ProfileCard
              key={index}
              profile={profile.matched_profile}
              optionalPhoto={profile.photo}
              isLiked={profile.liked}
              compatibilityScore={profile.compatibility_score}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyLikes;
