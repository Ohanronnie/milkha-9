import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import Loading from "../layout/LoadingOrNull";

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
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm relative"
            >
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={profile.photo}
                  alt={profile.fullname}
                  className="w-full h-64 object-cover"
                />
                {/* Completion Badge */}
                <span className="absolute top-2 right-2 bg-white text-xs font-semibold text-gray-700 px-2 py-1 rounded-full shadow">
                  {profile.completion}% COMPLETED
                </span>
              </div>

              {/* Profile Details */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-md font-semibold text-gray-800">
                    {profile.fullname}
                  </h3>
                  <p className="text-sm text-gray-500">{profile.age} YRS</p>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <FaMapMarkerAlt className="mr-1 text-green-500" />
                  {profile.emirate}
                </div>

                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="text-green-500 font-semibold flex items-center gap-1">
                    <FaCheckCircle className="text-sm" />
                    {profile.marital_status}
                  </span>
                  <FaHeart className="text-gray-300" />
                </div>

                {/* View Profile Button */}
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 rounded-md">
                  View Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SuggestedProfiles;
