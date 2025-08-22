import { FaCheckCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import DefaultProfile from "../../assets/Profile.png";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

export default function ProfileCard({ userDetails }) {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(
    
      DefaultProfile
  );
  useEffect(() => {
    setImageSrc(userDetails?.photos?.find?.((val) => val.is_primary)?.photo);
  },[userDetails])
  const handleIconClick = () => {
    fileInputRef.current.click(); // Trigger hidden file input
  };

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImageSrc(imageUrl);
      }
      formData.append("photo", file);
      formData.append("is_primary", true);

      await axiosInstance.post("/profile/photos/upload/", formData);
      toast.success("Profile picture changed successfully")
    } catch (error) {
      toast.error("Profile picture upload failed, retry");
    }
  };
  return (
    <div className="min-h-[350px]">
      <div className="w-full lg:px-12 lg:bg-gradient-to-b from-purple-400 h-[160px]  relative to-white rounded-lg lg:shadow-md">
        <div className=" mx-auto flex  md:flex-row items-center absolute lg:-bottom-36 gap-6 ">
          {/* Profile Picture */}
          <div className="relative w-fit">
            {/* Displayed Profile Image */}
            <img
              src={imageSrc}
              alt="Profile"
              className="w-60 h-60 rounded-xl object-cover border-4 border-white shadow-lg"
            />

            {/* Edit Icon */}
            <div
              onClick={handleIconClick}
              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md cursor-pointer"
            >
              <FiEdit2 className="text-gray-700 w-4 h-4" />
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 lg:mt-36">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">{userDetails?.first_name + " " + userDetails?.last_name}</h2>
              <FaCheckCircle className="text-blue-500" />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-6 text-sm text-gray-600">
              <div className="flex flex-col">
                <span className="uppercase text-xs text-gray-400">Gender</span>
                <span>{userDetails?.gender}</span>
              </div>
              <div className="flex flex-col">
                <span className="uppercase text-xs text-gray-400">Age</span>
                <span>{new Date().getFullYear() - new Date(userDetails?.date_of_birth).getFullYear() } Years</span>
              </div>
              <div className="flex flex-col relative">
                <span className="uppercase text-xs text-gray-400">
                  Location
                </span>
                <span className="flex items-center gap-1">
                  {userDetails?.emirate + ", "+userDetails?.country_of_residence }
                  <FiEdit2 className="text-gray-500 w-3 h-3 ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
