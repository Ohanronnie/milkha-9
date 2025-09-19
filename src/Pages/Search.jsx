import React, { useEffect, useState } from "react";
import FilterBar from "../components/Search/FilterBar";
import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import ProfileModal from "../components/Profile/ProfileModal";
import SuggestedProfiles from "../components/Search/SuggestedProfiles";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import Loading from "../components/layout/LoadingOrNull";

const Search = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchResult, setSearchResult] = useState(null);
  const [suggestedProfiles, setSuggestedProfiles] = useState(null);

  useEffect(() => {
    (async function () {
      if (!filters) return;
      let {
        age,
        interests,
        //  country,
        marital_status,
        religion,
        emirate,
        name_search, // include fullname from search input
        email,
      } = filters;
      let country = emirate;
      const initParams = {
        age_min: age?.split("-")[0],
        age_max: age?.split("-")[1],
        interests,
        country,
        marital_status,
        religion,
        // emirate,
        name_search,
        email,
      };

      const filtered = Object.entries(initParams).reduce(
        (acc, [key, value]) => {
          // exclude undefined/null/empty string values
          if (
            value !== undefined &&
            value !== null &&
            String(value).trim() !== ""
          ) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      try {
        const qs = new URLSearchParams(filtered).toString();
        console.log("Query string:", qs);
        const url = "/profile/matches/search/" + (qs ? `?${qs}` : "");
        const response = await axiosInstance.get(url);
        setSearchResult(response.data);
        console.log("Search results:", response.data);
      } catch (error) {
        console.error(error);
        toast.error("Search failed");
      }
    })();
  }, [filters]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/matchmaking/potential/");
        setSuggestedProfiles(response.data);
      } catch (error) {
        toast.error("Error occurred, retry");
      }
    })();
  }, []);

  return (
    <div>
      <FilterBar {...{ filters, setFilters }} />
      <h2 className="text-2xl ml-4 font-semibold text-gray-700 mb-0">
        Search Results...
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:px-12 px-4 py-12">
        {!searchResult ? (
          <Loading data={searchResult} />
        ) : (
          searchResult?.map?.((profile, index) => (
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
                {/* Completion Badge (optional) */}
                {profile.completion && (
                  <span className="absolute top-2 right-2 bg-white text-xs font-semibold text-gray-700 px-2 py-1 rounded-full shadow">
                    {profile.completion}% COMPLETED
                  </span>
                )}
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
                <button
                  onClick={() => {
                    setSelectedProfile(profile);
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2 rounded-md"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        )}
        {selectedProfile && (
          <ProfileModal
            profile={selectedProfile}
            onClose={() => setSelectedProfile(null)}
          />
        )}
      </div>
      <SuggestedProfiles suggestedProfiles={suggestedProfiles} />
    </div>
  );
};

export default Search;
