import { useState, useEffect } from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../assets/Profile.png";
import { useNavigate } from "react-router-dom";
import { LuMessagesSquare } from "react-icons/lu";
import getAge from "../utils/getAge";
import ProfileModal from "./Profile/ProfileModal";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

const ProfileCard = ({ profile, optionalPhoto, isLiked, compatibilityScore }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [liked, setLiked] = useState(!!isLiked);
  const [mutual, setMutual] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchMutualStatus = async () => {
      try {
        // Only check for mutual
        const mutualRes = await axiosInstance.get(
          `/matchmaking/check-mutual/${profile.user}`
        );
        if (!mounted) return;
        setMutual(!!mutualRes.data.is_match);
      } catch (e) {
        // ignore
      }
    };
    if (profile?.user) fetchMutualStatus();
    return () => {
      mounted = false;
    };
  }, [profile?.user]);

  if (!profile) return null;

  const handleLike = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(`/matchmaking/like/${profile.user}/`);
      setLiked(true);
      toast.success(
        `You just liked ${profile.first_name} ${profile.last_name}`
      );
    } catch (e) {
      toast.error("Could not like profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async () => {
    setLoading(true);
    try {
      await axiosInstance.post(`/matchmaking/unlike/${profile.user}/`);
      setLiked(false);
      toast.success(
        `You just unliked ${profile.first_name} ${profile.last_name}`
      );
    } catch (e) {
      toast.error("Could not unlike profile");
    } finally {
      setLoading(false);
    }
  };

  const handleMessageClick = async () => {
    try {
      const response = await axiosInstance.get(
        `/matchmaking/check-mutual/${profile.user}`
      );
      if (response.data.is_match) {
        navigate(`/Messages`);
      } else {
        toast.error(
          "You can only message users who have also liked you (mutual match)."
        );
      }
    } catch (error) {
      toast.error("Could not check match status. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg relative hover:shadow-xl transition">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={profile.photo || optionalPhoto || Profile}
            alt={profile.fullname}
            className="w-full h-56 object-cover"
          />
          {compatibilityScore && compatibilityScore != 0 && (
            <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
              {compatibilityScore}% COMPATIBLE
            </span>
          )}
        </div>

        {/* Profile Details */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg w-9/12 font-bold text-gray-800 uppercase truncate">
              {(profile.first_name && profile.last_name
                ? `${profile.first_name} ${profile.last_name}`
                : profile.fullname) || "NO NAME"}
            </h3>
            <p className="text-sm text-gray-500 font-semibold">
              {(getAge(profile.date_of_birth) || profile.age || 0) + " YRS"}
            </p>
          </div>
          <div className="flex items-center text-xs text-gray-600 mb-2 uppercase">
            <FaMapMarkerAlt className="mr-1 text-green-500" />
            {(
              profile.emirate +
              ", " +
              profile.country_of_residence
            ).toUpperCase()}
          </div>
          <div className="flex items-center justify-between text-xs mb-4">
            <span className="text-green-600 font-semibold flex items-center gap-1 uppercase">
              <FaCheckCircle className="text-base" />
              {profile.marital_status?.toUpperCase()}
            </span>
          </div>
          {/* View Profile Button & Like/Unlike/Message icons */}
          <div className="inline-flex w-full gap-2 items-center">
            <button
              onClick={() => setShowProfileModal(true)}
              className="w-8/12 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white text-sm font-bold py-2 rounded-lg shadow transition"
            >
              VIEW PROFILE
            </button>
            {mutual ? (
              <button
                onClick={handleMessageClick}
                className="w-4/12 px-6 text-purple-500 border border-purple-500 text-xs font-semibold py-2 rounded-md flex items-center justify-center"
                title="Message"
              >
                <LuMessagesSquare className="text-xl" />
              </button>
            ) : liked ? (
              <button
                onClick={handleUnlike}
                disabled={loading}
                className="w-4/12 px-6 text-red-500 text-xs font-semibold py-2 rounded-md flex items-center justify-center"
                title="Unlike"
              >
                <FaHeart className="text-red-500 text-xl" />
              </button>
            ) : (
              <button
                onClick={handleLike}
                disabled={loading}
                className="w-4/12 px-6 text-purple-500 text-xs font-semibold py-2 rounded-md flex items-center justify-center"
                title="Like"
              >
                <FaHeart className="text-gray-300 text-xl" />
              </button>
            )}
          </div>
        </div>
      </div>
      {showProfileModal && (
        <ProfileModal
          profile={profile}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </>
  );
};

export default ProfileCard;
// <div className="inline-flex w-full gap-2">
//   <button
//     onClick={() => setShowProfileModal(true)}
//     className="w-8/12 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white text-sm font-bold py-2 rounded-lg shadow transition"
//   >
//     VIEW PROFILE
//   </button>
//   <button
//     onClick={handleMessageClick}
//     className="w-4/12 px-6 text-purple-500 border border-purple-500 text-xs font-semibold py-2 rounded-md flex items-center justify-center"
//   >
//     <LuMessagesSquare className="text-xl" />
//   </button>
// </div>;
