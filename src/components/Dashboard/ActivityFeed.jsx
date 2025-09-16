import React, { useEffect, useState } from "react";
import { FaBolt } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import Loading from "../layout/LoadingOrNull";
import { axiosInstance } from "../../utils/axios";

const ActivityItem = ({ imageUrl, match, actor, activity, activityType,compatibility }) => {
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState(null);
  useEffect(function(){
    axiosInstance.get("/profile/"+actor).then(({ data }) => {
      if(!data) return;
      setPhoto(data.photos[0].photo);
      setName(`${data.first_name} ${data.last_name}`)
    })
  },[])
  const activityColors = {
    viewed: "text-blue-500",
    liked: "text-pink-500",
    shortlisted: "text-purple-500",
  };

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-none">
      <div className="flex items-center space-x-3">
        <img src={photo} alt={name} className="w-8 h-8 rounded-full" />
        <span className="font-medium text-[10px]">{name}</span>
        <span className="flex items-center bg-purple-100 text-purple-600 text-[10px] px-2 py-1 rounded-full">
          <FaBolt className="mr-1 text-xs" /> {compatibility || 50}%
        </span>
      </div>
      <span
        className={`capitalize font-medium text-sm ${activityColors[activityType]}`}
      >
        {activity}
      </span>
    </div>
  );
};

const ActivityFeed = () => {
   const [data, setData] = useState([]);
function removeDuplicates(arr) {
  const seen = new Set();
  return arr.filter((item) => {
    if (seen.has(item.actor)) return false;
    seen.add(item.actor);
    return true;
  });
}

  useEffect(function () {
    axiosInstance.get("/matchmaking/user/activity-feed").then(({ data }) => {

      setData(removeDuplicates(data.slice(1, 10)));
      
    });
  }, []);
  const activityData = [
    {
      name: "Sarah Kate",
      activity: "VIEWED YOUR PROFILE",
      activityType: "viewed",
    },
    { name: "Sarah Kate", activity: "LIKED YOUR PHOTO", activityType: "liked" },
    {
      name: "Sarah Kate",
      activity: "ADDED YOU TO THEIR SHORTLIST",
      activityType: "shortlisted",
    },
    { name: "Sarah Kate", activity: "LIKED YOUR PHOTO", activityType: "liked" },
    {
      name: "Sarah Kate",
      activity: "ADDED YOU TO THEIR SHORTLIST",
      activityType: "shortlisted",
    },
  ];

  return (
    <div className="w-full  bg-white p-4 rounded-lg shadow">
      <h2 className="text-md font-semibold mb-4">🔍 Profile Activity Feed</h2>
      {false ? (
        <Loading />
      ) : (
      data.map((item, index) => (
          <ActivityItem
            key={index}
            name={item.name}
            imageUrl="https://via.placeholder.com/40"
            match={75}
            activity={item.activity_type}
            activityType={item.activity_type}
            compatibility={item.compatibility_score}
            actor={item.actor}
          />
        ))
      )}
    </div>
  );
};

export default ActivityFeed;
