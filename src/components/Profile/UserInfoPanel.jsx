import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

function UserInfoPanel({ userDetails }) {
  const isOwnProfile = window?.user?.user === userDetails?.user;
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(userDetails?.bio || "");
  const [interests, setInterests] = useState(userDetails?.interests || "");
  const [maritalStatus, setMaritalStatus] = useState(
    userDetails?.marital_status || ""
  );
  const [academicQualification, setAcademicQualification] = useState(
    userDetails?.academic_qualification || ""
  );
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axiosInstance.patch("/profile/update/", {
        bio,
        interests,
        marital_status: maritalStatus,
        academic_qualification: academicQualification,
      });
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (e) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 text-sm text-gray-700 lg:px-12">
      {/* BIO */}
      <div className="border border-purple-300 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="uppercase font-bold text-xs text-gray-600">Bio</h4>
          {isOwnProfile && (
            <button onClick={() => setEditMode((e) => !e)}>
              <FiEdit2 className="text-gray-500 cursor-pointer" />
            </button>
          )}
        </div>
        {editMode && isOwnProfile ? (
          <textarea
            className="w-full border rounded p-2 text-sm"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        ) : (
          <p className="text-sm leading-relaxed">{bio}</p>
        )}
      </div>

      {/* HOBBIES */}
      <div className="border border-purple-300 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="uppercase font-bold text-xs text-gray-600">Hobbies</h4>
          {isOwnProfile && (
            <button onClick={() => setEditMode((e) => !e)}>
              <FiEdit2 className="text-gray-500 cursor-pointer" />
            </button>
          )}
        </div>
        {editMode && isOwnProfile ? (
          <input
            className="w-full border rounded p-2 text-sm"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {(interests ? interests.match(/[A-Z][a-z]*/g) : []).map(
              (item, idx) => (
                <span
                  key={idx}
                  className="bg-white text-purple-700 border border-purple-300 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-sm"
                >
                  <FaStar className="text-purple-300" /> {item}
                </span>
              )
            )}
          </div>
        )}
      </div>

      {/* PERSONAL INFO */}
      <div className="border border-purple-300 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="uppercase font-bold text-xs text-gray-600">
            Personal Info
          </h4>
          {isOwnProfile && (
            <button onClick={() => setEditMode((e) => !e)}>
              <FiEdit2 className="text-gray-500 cursor-pointer" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div>
            <p className="uppercase text-xs text-gray-400">Marital Status</p>
            {editMode && isOwnProfile ? (
              <input
                className="w-full border rounded p-2 text-sm"
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e.target.value)}
              />
            ) : (
              <p className="font-medium">{maritalStatus}</p>
            )}
          </div>
          <div>
            <p className="uppercase text-xs text-gray-400">
              Academic Qualification
            </p>
            {editMode && isOwnProfile ? (
              <input
                className="w-full border rounded p-2 text-sm"
                value={academicQualification}
                onChange={(e) => setAcademicQualification(e.target.value)}
              />
            ) : (
              <p className="font-medium">{academicQualification}</p>
            )}
          </div>
        </div>
        {editMode && isOwnProfile && (
          <div className="flex justify-end mt-4 gap-2">
            <button
              className="px-4 py-1 rounded bg-gray-200 text-gray-700"
              onClick={() => setEditMode(false)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 rounded bg-purple-600 text-white"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfoPanel;
