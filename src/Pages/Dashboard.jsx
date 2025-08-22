import React, { useEffect, useState } from "react";
import Stats from "../components/Dashboard/Stats";
import TodaysMatches from "../components/Dashboard/TodaysMatches";
import ActivityFeed from "../components/Dashboard/ActivityFeed";
import ProfileEnhancement from "../components/Dashboard/ProfileEnhancement";
import { axiosInstance } from "../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/layout/LoadingOrNull";
const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [matches, setMatches] = useState(null);
  const [chats, setChatList] = useState(null);
  const [matchesCount, setMatchesCount] = useState(null);
  const [shortListedProfiles, setShortListedProfiles] = useState(null);
  useEffect(function () {
    const fetchAllData = async () => {
      try {
        const [profileRes, matchesRes, chatsRes, countsRes, shortlisted] = await Promise.all(
          [
            axiosInstance.get("/profile/"),
            axiosInstance.get("/matchmaking/matches/today/"),
            axiosInstance.get("/matchmaking/chat-rooms/"),
            axiosInstance.get("/matchmaking/counts/"),
            axiosInstance.get("/matchmaking/shortlisted/")
          ]
        );

        setUserDetails(profileRes.data);
        setMatches(matchesRes.data);
        setChatList(chatsRes.data);
        setMatchesCount(countsRes.data);
        setShortListedProfiles(shortlisted.data)

      } catch (error) {
        toast.error("Error occurred somewhere, reload page");
      }
    };
    fetchAllData();
  }, []);

  return (
    <div>
      <Toaster />
      <Stats
        details={userDetails}
        matchCounts={matchesCount}
        chats={chats}
      
      />
      <TodaysMatches details={userDetails} matches={matches} shortlisted={shortListedProfiles} />
      <div className="bg-gray-100 grid lg:grid-cols-3 gap-4 lg:px-12 px-4">
        <div className="lg:col-span-1 col-span-3">
         { <ActivityFeed details={userDetails} />}
        </div>
        <div className="lg:col-span-2 col-span-3 pb-">
          
          <ProfileEnhancement details={userDetails} />
        </div>
      </div>
      <div className="h-[20vh]" />
    </div>
  );
};

export default Dashboard;
