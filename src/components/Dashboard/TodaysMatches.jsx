import React from "react";
import { FiMessageSquare } from "react-icons/fi";
import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import Loading from "../layout/LoadingOrNull";

const ProfileCard = ({ name, age, location, imageUrl, match }) => (
  <div className="bg-white shadow rounded-lg p-4 w-64">
    <div className="relative">
      <img
        src={imageUrl}
        alt={name}
        className="rounded-md h-48 w-full object-cover"
      />
      <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
        {match}% MATCH
      </span>
    </div>
    <h3 className="mt-3 text-lg font-semibold">{name}</h3>
    <div className="flex items-center text-sm text-gray-500">
      <FaMapMarkerAlt className="mr-1" />
      {location}
    </div>
    <p className="text-sm text-gray-600 mt-1">{age} YRS</p>
    <button className="mt-4 bg-purple-600 text-white py-1 px-4 rounded hover:bg-purple-700">
      View Profile
    </button>
  </div>
);

const ShortlistedProfile = ({ name }) => (
  <div className="flex items-center justify-between py-2 border-b">
    <div className="flex items-center">
      <img src={Profile} alt={name} className="w-8 h-8 rounded-full mr-3" />
      <span>{name}</span>
    </div>
    <button className="text-blue-600 hover:underline text-sm flex items-center">
      <FiMessageSquare className="mr-1" /> Send a Message
    </button>
  </div>
);

const TodaysMatches = ({ matches, shortlisted }) => {
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

  return (
    <div className="min-h-full bg-gray-100 p-6 grid lg:grid-cols-3 gap-4 lg:px-12 px-4">
      {/* Today's Matches */}
      <div className="lg:col-span-2">
        <p className="text-2xl font-medium ">Today's Matches</p>
        <p className="pb-6"> Based on your prefrences</p>
        {!matches || matches?.length === 0 ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {!matches || matches?.length === 0 ? (
              <Loading />
            ) : (
              matches?.map((profile, index) => (
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
                      {profile.emirate + ", " + profile.country_of_residence}
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
        )}
      </div>
      {/* Shortlisted Profiles */}
      <div className="w-full bg-white  p-4 shadow rounded-lg ">
        <h2 className="text-lg font-semibold mb-4">Shortlisted Profiles</h2>
        {!shortlisted || shortlisted?.length === 0 ? (
          <Loading />
        ) : (
          shortlisted?.map?.((data, idx) => (
            <ShortlistedProfile
              key={data?.matched_user}
              name={data?.matched_profile}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodaysMatches;
