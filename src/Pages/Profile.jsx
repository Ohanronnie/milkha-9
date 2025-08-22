import React, { useEffect, useState } from "react";
import ProfileCard from "../components/Profile/ProfileCard";
import UserInfoPanel from "../components/Profile/UserInfoPanel";
import PhotoUploader from "../components/Profile/Photos";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axios";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  useEffect(function(){
    (async function(){
      try {
         const response = await axiosInstance.get("/profile/");
         setUserDetails(response.data);
      } catch(error){
        console.log(error)
        toast.error("Error occurred try reloading")
      }
      
    })()
  },[])
  return (
    <div>
      <ProfileCard userDetails={userDetails} />
      <UserInfoPanel userDetails={userDetails} />
      <PhotoUploader userDetails={userDetails} />
    </div>
  );
};

export default Profile;

