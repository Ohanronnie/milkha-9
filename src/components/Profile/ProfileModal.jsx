import { useEffect, useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaChevronDown,
  FaHeart,
  FaStar,
  FaUser,
  FaInfoCircle,
  FaUserFriends,
  FaRegSmile,
} from "react-icons/fa";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

// Reusable Section
const Section = ({ title, icon, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-purple-50 rounded-xl px-4 py-3 mb-4 shadow-sm">
      <button
        className="flex justify-between items-center w-full text-purple-800 font-semibold focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="mt-2 text-sm text-gray-700 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

// Skeleton Loader
const Skeleton = () => (
  <div className="p-8 animate-pulse">
    <div className="flex flex-col items-center">
      <div className="bg-gray-200 rounded-2xl w-40 h-48 mb-4" />
      <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-24 mb-4" />
      <div className="flex gap-3 mb-4">
        <div className="h-8 w-20 bg-gray-200 rounded-full" />
        <div className="h-8 w-28 bg-gray-200 rounded-full" />
      </div>
    </div>
    <div className="space-y-4 mt-6">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  </div>
);

// Image Modal for full-size preview
const ImageModal = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-70">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl font-bold"
      >
        ✕
      </button>
      <img
        src={src}
        alt="Preview"
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
      />
    </div>
  );
};

const FullProfileModal = ({ profile: profileData, onClose }) => {
  const [show, setShow] = useState(false);
  const [profile, setProfileData] = useState(null);
  const [userId, setUserId] = useState(null);
  const hasRun = useRef(false);
  const [liked, setLiked] = useState(false);
  const [shortlisted, setShortlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // 👈 for image modal

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    setTimeout(() => setShow(true), 20);

    if (!profileData) return;
    axiosInstance
      .get("/profile/" + profileData?.user)
      .then(({ data }) => {
        setUserId(data.user);
        setProfileData(data);
      })
      .catch(() => {
        toast.error("Error occurred when getting user profile");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likeOrShortlist = (type) => {
    return async () => {
      if (type === "like") {
        try {
          await axiosInstance.post("/matchmaking/like/" + userId);
          toast.success(
            !liked ? `User liked successfully!` : "User unliked successfully"
          );
          setLiked(!liked);
        } catch {
          toast.error("Error liking user, retry later!");
        }
      } else {
        try {
          setShortlisted(!shortlisted);
          await axiosInstance.post("/matchmaking/shortlist/" + userId);
          toast.success(
            !shortlisted
              ? "User shortlisted successfully!"
              : "User removed from shortlist"
          );
        } catch {
          toast.error("Error shortlisting user, retry later!");
        }
      }
    };
  };

  const mainPhoto = profile?.photos?.find((a) => a.is_primary)?.photo;
  const otherPhotos = profile?.photos?.filter((a) => !a.is_primary) || [];

  return (
    <div className="fixed inset-0 z-50 flex ">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Sliding Panel */}
      <div
        className={`relative bg-white w-full max-w-2xl md:max-w-xl h-full shadow-2xl transform transition-transform duration-300 ease-in-out ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ marginLeft: "auto" }}
      >
        <div className="overflow-y-auto h-full pb-16 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-2xl text-purple-700 hover:text-purple-900 bg-white rounded-full shadow-lg p-2 z-10 border border-purple-100 transition"
          >
            ✕
          </button>

          {/* Header */}
          {!profile ? (
            <Skeleton />
          ) : (
            <div className="flex flex-col items-center p-8 pt-12">
              {/* Main Photo */}
              <div className="relative mb-4">
                <img
                  src={mainPhoto}
                  alt={profile?.first_name + " " + profile?.last_name}
                  className="rounded-2xl w-40 h-48 object-cover shadow-md border-4 border-purple-100"
                />
              </div>

              {/* Thumbnails */}
             

              {/* Name + Info */}
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {profile?.first_name + " " + profile?.last_name}
              </h2>
              <p className="text-base text-gray-500 mb-2">
                {new Date().getFullYear() -
                  new Date(profile.date_of_birth).getFullYear()}{" "}
                YRS | <FaMapMarkerAlt className="inline mr-1 text-purple-500" />
                {profile.emirate}
              </p>

              {/* Action buttons */}
              <div className="flex gap-4 mb-4">
                <button
                  onClick={likeOrShortlist("like")}
                  className="bg-pink-100 text-pink-600 px-5 py-2 rounded-full flex items-center gap-2 text-base font-semibold hover:bg-pink-200 active:scale-95 shadow transition"
                >
                  <FaHeart /> {liked ? "Unlike" : "Like"}
                </button>

                <button
                  onClick={likeOrShortlist("shortlist")}
                  className="bg-blue-100 text-blue-600 px-5 py-2 rounded-full flex items-center gap-2 text-base font-semibold hover:bg-blue-200 active:scale-95 shadow transition"
                >
                  <FaStar /> {shortlisted ? "Unshortlist" : "Shortlist"}
                </button>
              </div>
            </div>
          )}
          {/* Content Sections */}
          {profile && (
            <div className="px-8 pb-10">
              <Section
                title={`About ${profile.first_name}`}
                icon={<FaInfoCircle className="text-purple-400" />}
                defaultOpen
              >
                {profile?.bio}
              </Section>

              <Section
                title="Interests"
                icon={<FaRegSmile className="text-purple-400" />}
              >
                <div className="flex flex-wrap gap-2">
                  {(profile.interests
                    ? profile.interests.match(/[A-Z][a-z]*/g)
                    : []
                  ).map((item, idx) => (
                    <span
                      key={idx}
                      className="bg-white text-purple-700 border border-purple-300 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-sm"
                    >
                      <FaStar className="text-purple-300" /> {item}
                    </span>
                  ))}
                </div>
              </Section>

              {/* 👇 New Photos Section */}
              {otherPhotos.length > 0 && (
                <Section
                  title="More Photos"
                  icon={<FaUser className="text-purple-400" />}
                >
                  <div className="flex flex-wrap gap-2">
                    {otherPhotos.map((p, idx) => (
                      <img
                        key={idx}
                        src={p.photo}
                        alt={`Photo ${idx}`}
                        onClick={() => setSelectedImage(p.photo)}
                        className="w-20 h-20 rounded-md object-cover cursor-pointer border border-gray-200 hover:opacity-80 transition"
                      />
                    ))}
                  </div>
                </Section>
              )}

              <Section
                title="Personal Information"
                icon={<FaUser className="text-purple-400" />}
              >
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <strong>Marital Status:</strong> {profile.marital_status}
                  </p>
                  <p>
                    <strong>Occupation:</strong> {profile.occupation}
                  </p>
                </div>
              </Section>

              <Section
                title="Looking For ..."
                icon={<FaUserFriends className="text-purple-400" />}
              >
                <p>
                  Someone with similar values and lifestyle who is ready for a
                  long-term relationship.
                </p>
              </Section>

              <div className="h-12"></div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />

      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.5s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default FullProfileModal;
