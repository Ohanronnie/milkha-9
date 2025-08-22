import React from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import { Link } from "react-router-dom";
import { LuMessagesSquare } from "react-icons/lu";
import { useState } from "react";
import ProfileModal from "../../components/Profile/ProfileModal";

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
const LikedMe = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Matched Profiles
      </h2>
      <p className="text-purple-500 pb-8">
        A List of Potential Dates that liked you.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="bg-white rounded-xl overflow-hidden shadow-sm relative"
          >
            {/* Profile Image */}
            <div className="relative">
              <img
                src={profile.image}
                alt={profile.name}
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
                  {profile.name}
                </h3>
                <p className="text-sm text-gray-500">{profile.age} YRS</p>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FaMapMarkerAlt className="mr-1 text-green-500" />
                {profile.location}
              </div>

              <div className="flex items-center justify-between text-xs mb-4">
                <span className="text-green-500 font-semibold flex items-center gap-1">
                  <FaCheckCircle className="text-sm" />
                  {profile.status}
                </span>
                <FaHeart className="text-gray-300" />
              </div>

              {/* View Profile Button */}
              <div className="inline-flex w-full gap-2">
                <button
                  onClick={() => setSelectedProfile(profile)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold py-2 rounded-md"
                >
                  View Profile
                </button>
                {/* <Link to="/Messages">
                  <button className="w-full px-6 text-purple-500 border border-purple-500 text-xs font-semibold py-2 rounded-md">
                    <LuMessagesSquare className="text-xl" />
                  </button>
                </Link> */}
              </div>
              {selectedProfile && (
                <ProfileModal
                  profile={selectedProfile}
                  onClose={() => setSelectedProfile(null)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedMe;
