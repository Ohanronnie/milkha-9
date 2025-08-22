import React from "react";
import { FaBolt } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import Loading from "../layout/LoadingOrNull";

const ActivityItem = ({ name, imageUrl, match, activity, activityType }) => {
  const activityColors = {
    viewed: "text-blue-500",
    liked: "text-pink-500",
    shortlisted: "text-purple-500",
  };

  return (
    <div className="flex items-center justify-between py-2 border-b last:border-none">
      <div className="flex items-center space-x-3">
        <img src={Profile} alt={name} className="w-8 h-8 rounded-full" />
        <span className="font-medium text-[10px]">{name}</span>
        <span className="flex items-center bg-purple-100 text-purple-600 text-[10px] px-2 py-1 rounded-full">
          <FaBolt className="mr-1 text-xs" /> {match}%
        </span>
      </div>
      <span
        className={` font-medium text-[6px] ${activityColors[activityType]}`}
      >
        {activity}
      </span>
    </div>
  );
};

const ActivityFeed = () => {
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
      {true ? <Loading />  : activityData.map((item, index) => (
        <ActivityItem
          key={index}
          name={item.name}
          imageUrl="https://via.placeholder.com/40"
          match={75}
          activity={item.activity}
          activityType={item.activityType}
        />
      ))}
    </div>
  );
};

export default ActivityFeed;
