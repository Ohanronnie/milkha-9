import React, { useEffect } from "react";
import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import { Link } from "react-router-dom";
import { LuMessagesSquare } from "react-icons/lu";
import { useState } from "react";
import { axiosInstance } from "../../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../layout/LoadingOrNull";
import ProfileCard from "../ProfileCard";

const MatchList = () => {
  const [matches, setMatches] = useState(null);

  useEffect(function () {
    (async () => {
      try {
        const response = await axiosInstance.get("/profile/matches/search");
        console.log("matches", response.data);
        setMatches(response.data);
      } catch (error) {
        console.error(error);
        toast.error("Error occured somewhere, try reloading!");
      }
    })();
  }, []);

  return (
    <div>
      <Toaster />{" "}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Matched Profiles
      </h2>
      <p className="text-purple-500 pb-8">
        A List of Potential Dates you have matched with
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {!matches ? (
          <Loading data={matches} />
        ) : (
          matches.map((profile, index) => (
            <ProfileCard
              key={index}
              profile={profile}
              optionalPhoto={profile.photo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MatchList;
