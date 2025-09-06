import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import Loading from "../layout/LoadingOrNull";
import ProfileCard from "../ProfileCard";

const SuggestedProfiles = ({ suggestedProfiles }) => {
  return (
    <div className="bg-gray-50 lg:px-12 p-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Suggested Profiles
      </h2>
      <p className="text-purple-500 pb-6">
        List of Potential Soulmates you might like.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {!suggestedProfiles ? (
          <Loading data={suggestedProfiles} />
        ) : (
          suggestedProfiles?.map?.((profile, index) => (
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

export default SuggestedProfiles;
