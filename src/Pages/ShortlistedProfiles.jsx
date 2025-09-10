import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../assets/Profile.png";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import Loading from "../components/layout/LoadingOrNull";
import ProfileCard from "../components/ProfileCard";

function ShortlistedProfileCard({ profile }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm relative">
      <ProfileCard
        profile={profile.matched_profile}
        optionalPhoto={profile.photo}
        isLiked={profile.liked}
      />
      {/* Profile Image */}
    </div>
  );
}

function ShortlistedProfiles() {
  const [profiles, setProfiles] = useState(null);

  useEffect(function () {
    (async () => {
      try {
        const response = await axiosInstance.get("/matchmaking/shortlisted/");
        console.log(response.data);
        setProfiles(response.data);
      } catch (error) {
        toast.error("error occured, reload page");
      }
    })();
  }, []);
  return (
    <div className="bg-gray-50 lg:px-12 p-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Shortlisted Profiles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {!profiles ? (
          <Loading data={profiles} />
        ) : (
          profiles
            .filter((profile) => profile.shortlisted && !profile.liked)
            .map((profile, index) => (
              <ShortlistedProfileCard key={index} profile={profile} />
            ))
        )}
      </div>
    </div>
  );
}

export default ShortlistedProfiles;
