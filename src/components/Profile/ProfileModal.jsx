import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaChevronDown, FaHeart, FaStar } from "react-icons/fa";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const Section = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-purple-100 rounded-xl px-4 py-3 mb-3">
      <button
        className="flex justify-between items-center w-full text-purple-800 font-semibold"
        onClick={() => setOpen(!open)}
      >
        {title}
        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && <div className="mt-2 text-sm text-gray-700">{children}</div>}
    </div>
  );
};

const FullProfileModal = ({ profile: profileData, onClose }) => {
  const [show, setShow] = useState(false);
  const [profile, setProfileData] = useState(null);
  const [userId, setUserId] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    setTimeout(() => setShow(true), 20);

    if (!profileData) return;

    axiosInstance
      .get(`/profile/${profileData?.id}`)
      .then(({ data }) => {
        console.log("Full profile data:", data);
        setUserId(data.user);
        setProfileData(data);
      })
      .catch(() => {
        toast.error("Error occurred when getting user profile");
      });
  }, []);

  const likeOrShortlist = (type) => {
    return async () => {
      if (type === "like") {
        try {
          await axiosInstance.post("/matchmaking/like/" + userId);
          console.log("the like of",profileData);
        } catch (error) {
          toast.error("Error liking user, retry later!");
        }
      } else {
        try {
          await axiosInstance.post("/matchmaking/shortlist/" + userId);
        } catch (error) {
          toast.error("Error shortlisting user, retry later!");
        }
      }
    };
  };
  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Sliding Panel */}
      <div
        className={`relative bg-white w-full max-w-md h-full shadow-xl transform transition-transform duration-300 ease-in-out ${
          show ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Scrollable Container */}
        <div className="overflow-y-auto h-full pb-16">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-xl text-gray-500 hover:text-black z-10"
          >
            ✕
          </button>

          {/* Header */}
          <div className="flex flex-col items-center p-6 pt-10">
            <div className="relative mb-4">
              <img
                src={profile?.photos?.find((a) => a.is_primary)?.photo}
                alt={profile?.first_name + " " + profile?.last_name}
                className="rounded-2xl w-40 h-48 object-cover shadow-md"
              />
              <span className="absolute top-2 right-[-10px] bg-purple-500 text-white text-xs px-3 py-1 rounded-full shadow">
                75% COMPATIBLE
              </span>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {profile?.first_name + " " + profile?.last_name}
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              {new Date().getFullYear() -
                new Date(profile.date_of_birth).getFullYear()}{" "}
              YRS | <FaMapMarkerAlt className="inline mr-1 text-purple-500" />
              {profile.emirate}
            </p>

            <div className="flex gap-3 mb-4">
              <button
                onClick={likeOrShortlist("like")}
                className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full flex items-center gap-2 text-sm font-semibold hover:bg-pink-200 active:scale-90 transition-transform duration-150 ease-out"
              >
                <FaHeart /> Like
              </button>

              <button
                onClick={likeOrShortlist("shortlist")}
                className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full flex items-center gap-2 text-sm font-semibold hover:bg-blue-200 active:scale-90 transition-transform duration-150 ease-out"
              >
                <FaStar /> Shortlisted
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-10">
            <Section title={`About ${profile.first_name}`} defaultOpen>
              {profile?.bio}
            </Section>

            <Section title="Interests">
              <div className="flex flex-wrap gap-2">
                {profile.interests.split(",").map((item) => (
                  <span
                    key={item}
                    className="bg-white text-purple-700 border border-purple-300 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Personal Information">
              <div className="text-sm text-gray-700 space-y-1">
                {/*<p>
                  <strong>Religion:</strong> Islam
                </p>*/}
                <p>
                  <strong>Marital Status:</strong> {profile.marital_status}
                </p>
                <p>
                  <strong>Occupation:</strong> {profile.occupation}
                </p>
              </div>
            </Section>

            <Section title="Looking For ...">
              <p>
                Someone with similar values and lifestyle who is ready for a
                long-term relationship.
              </p>
            </Section>

            {/* Spacer for scroll */}
            <div className="h-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProfileModal;
