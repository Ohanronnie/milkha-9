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
  const [mutuals, setMutuals] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [likedMeRes, mutualsRes] = await Promise.all([
          axiosInstance.get("/matchmaking/users-who-liked-me"),
          axiosInstance.get("/matchmaking/mutual"),
        ]);
        setProfiles(likedMeRes.data);
        setMutuals(mutualsRes.data);
      } catch (error) {
        setProfiles([]);
        setMutuals([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Build a set of mutual matched_profile ids for fast lookup
  const mutualIds = mutuals?.map((m) => m.matched_profile?.id) || [];

  // Filter out those who are mutual (i.e., I have liked them back)
  const filteredProfiles = profiles?.filter(
    (profile) => !mutualIds.includes(profile.profile?.id)
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Matched Profiles
      </h2>
      <p className="text-purple-500 pb-8">
        A List of Potential Dates that liked you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          <Loading data={profiles} />
        ) : (
          filteredProfiles?.map((profile, index) => (
            <ProfileCard
              key={index}
              profile={profile.profile}
              optionalPhoto={profile.photo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LikedMe;
