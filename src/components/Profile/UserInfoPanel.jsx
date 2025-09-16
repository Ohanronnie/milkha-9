import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

function UserInfoPanel({ userDetails }) {
  const isOwnProfile = window?.user?.user === userDetails?.user;
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState(userDetails?.bio || "");
  const [showBioModal, setShowBioModal] = useState(false);
  const [interests, setInterests] = useState(userDetails?.interests || "");
  const [showHobbiesModal, setShowHobbiesModal] = useState(false);
console.log(userDetails)
  const [hobbySearch, setHobbySearch] = useState("");
  const hobbiesList = [
    "Reading",
    "Travel",
    "Music",
    "Writing",
    "Fitness",
    "Painting",
    "Cooking",
    "Gym",
    "Baking",
    "Acting & Theatre",
    "Yoga & Meditation",
    "Swimming",
    "Dance (Ballet, Hip-Hop, Salsa)",
    "Food Blogging",
    "Public Speaking & Debating",
    "Comedy",
    "Fashion",
    "Collecting (Stamps, Coins, Sneakers, etc.)",
    "Social Volunteering & Charity Work",
    "Content Creation",
  ];
  const hobbyColors = [
    "bg-purple-200 text-purple-800",
    "bg-pink-200 text-pink-800",
    "bg-blue-200 text-blue-800",
    "bg-green-200 text-green-800",
    "bg-yellow-200 text-yellow-800",
    "bg-red-200 text-red-800",
    "bg-indigo-200 text-indigo-800",
    "bg-teal-200 text-teal-800",
    "bg-orange-200 text-orange-800",
    "bg-fuchsia-200 text-fuchsia-800",
    "bg-amber-200 text-amber-800",
    "bg-lime-200 text-lime-800",
    "bg-rose-200 text-rose-800",
    "bg-cyan-200 text-cyan-800",
    "bg-violet-200 text-violet-800",
    "bg-emerald-200 text-emerald-800",
    "bg-sky-200 text-sky-800",
    "bg-gray-200 text-gray-800",
    "bg-stone-200 text-stone-800",
    "bg-slate-200 text-slate-800",
  ];
  function getHobbyColor(hobby) {
    // Deterministic color for each hobby
    let hash = 0;
    for (let i = 0; i < hobby.length; i++) hash += hobby.charCodeAt(i);
    return hobbyColors[hash % hobbyColors.length];
  }
  const filteredHobbies = hobbiesList.filter((h) =>
    h.toLowerCase().includes(hobbySearch.toLowerCase())
  );
  const handleHobbiesSave = async () => {
    setLoading(true);
    try {
      // Save as comma-separated string for backend compatibility
      await axiosInstance.patch("/profile/update/", {
        interests,
      });
      toast.success("Hobbies updated successfully");
      setShowHobbiesModal(false);
    } catch (e) {
      toast.error("Failed to update hobbies");
    } finally {
      setLoading(false);
      window.location.reload(); // Refresh to show updated hobbies
    }
  };
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
        marital_status: maritalStatus,
        academic_qualification: academicQualification,
      });
      toast.success("Profile updated successfully");
      setEditMode(false);
    } catch (e) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
      window.location.reload(); // Refresh to show updated hobbies
    }
  };

  const handleBioSave = async () => {
    setLoading(true);
    try {
      await axiosInstance.patch("/profile/update/", { bio });
      toast.success("Bio updated successfully");
      setShowBioModal(false);
    } catch (e) {
      toast.error("Failed to update bio");
    } finally {
      setLoading(false);
      window.location.reload(); // Refresh to show updated hobbies
    }
  };

  return (
    <div className="space-y-4 text-sm text-gray-700 lg:px-12">
      {/* BIO */}
      <div className="border border-purple-300 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="uppercase font-bold text-xs text-gray-600">Bio</h4>
          {isOwnProfile && (
            <button
              onClick={() => {
                setShowBioModal(true);
              }}
            >
              <FiEdit2 className="text-gray-500 cursor-pointer" />
            </button>
          )}
        </div>
        <p className="text-sm leading-relaxed">{bio || userDetails?.bio}</p>
        {/* Bio Edit Modal */}
        {showBioModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowBioModal(false)}
                disabled={loading}
                aria-label="Close"
              >
                <FiX />
              </button>
              <h2 className="text-lg font-bold mb-2 text-purple-700">
                Tell the world about yourself!
              </h2>
              <p className="mb-4 text-gray-600 text-sm">
                Write a short bio to let potential matches know who you are.
                Keep it fun, simple, and engaging!
              </p>
              <textarea
                className="w-full border rounded p-3 text-sm mb-8 min-h-[100px]"
                rows={5}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write your bio here..."
                disabled={loading}
              />
              <button
                className="absolute bottom-6 right-8 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-60"
                onClick={handleBioSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* HOBBIES */}
      <div className="border border-purple-300 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="uppercase font-bold text-xs text-gray-600">Hobbies</h4>
          {isOwnProfile && (
            <button
              onClick={() => {
                setShowHobbiesModal(true);
              }}
            >
              <FiEdit2 className="text-gray-500 cursor-pointer" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {(userDetails?.interests
            ? userDetails.interests.match(/[A-Z][a-z]*/g)
            : []
          ).map((item, idx) => (
            <span
              key={idx}
              className={
                getHobbyColor(item) +
                " text-xs font-medium px-3 py-1 rounded-full flex items-center shadow-sm mr-2 mb-2"
              }
            >
              <FaBolt className="mr-1" /> {item}
            </span>
          ))}
        </div>
        {/* Hobbies Edit Modal */}
        {showHobbiesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
                onClick={() => setShowHobbiesModal(false)}
                disabled={loading}
                aria-label="Close"
              >
                <FiX />
              </button>
              <h2 className="text-lg font-bold mb-2 text-purple-700">
                What do you love to do?
              </h2>
              <p className="mb-4 text-gray-600 text-sm">
                Pick a few hobbies that define you! This helps us match you with
                people who share your interests.
              </p>
              <input
                className="w-full border rounded p-2 text-sm mb-4"
                placeholder="Search hobbies..."
                value={hobbySearch}
                onChange={(e) => setInterests(e.target.value)}
                disabled={loading}
              />
              <div className="flex flex-wrap gap-3 max-h-80 p-2 overflow-y-auto mb-12">
                {filteredHobbies.map((hobby) => {
                  const isSelected =
                    typeof interests === "string"
                      ? interests
                          .split(",")
                          .map((h) => h.trim())
                          .includes(hobby)
                      : Array.isArray(interests)
                      ? interests.includes(hobby)
                      : false;
                  return (
                    <button
                      key={hobby}
                      onClick={() => {
                        if (isSelected) {
                          // Remove hobby
                          if (typeof interests === "string") {
                            const updated = interests

                              .split(",")
                              .map((h) => h.trim())
                              .filter((h) => h !== hobby);
                            setInterests(updated.join(", "));
                          } else if (Array.isArray(interests)) {
                            setInterests(interests.filter((h) => h !== hobby));
                          }
                        } else {
                          // Add hobby
                          if (typeof interests === "string") {
                            const updated = interests
                              .split(",")
                              .map((h) => h.trim());
                            updated.push(hobby);
                            setInterests(updated.join(", "));
                          } else if (Array.isArray(interests)) {
                            setInterests([...interests, hobby]);
                          }
                        }
                      }}
                      className={`px-4 py-2 text-sm rounded-full border transition ${
                        isSelected
                          ? "bg-purple-100 text-purple-700 border-purple-300"
                          : "bg-white border-gray-300 hover:bg-gray-100"
                      }`}
                      type="button"
                    >
                      {hobby}
                    </button>
                  );
                })}
              </div>
              <button
                className="absolute bottom-6 right-8 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-60"
                onClick={handleHobbiesSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
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
              <p className="font-medium">
                {maritalStatus || userDetails?.["marital_status"]}
              </p>
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
              <p className="font-medium">
                {academicQualification ||
                  userDetails?.["academic_qualification"]}
              </p>
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
