import React, { useState } from "react";
import { FiMessageSquare, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaCheckCircle, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import Profile from "../../assets/Profile.png";
import Loading from "../layout/LoadingOrNull";
import ProfileModal from "../../components/Profile/ProfileModal";
import getAge from "../../utils/getAge";
import ProfileCard from "../ProfileCard";


const ShortlistedProfile = ({ name, last_name }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <div className="flex items-center gap-3">
      <img src={Profile} alt={name} className="w-8 h-8 rounded-full object-cover border" />
      <span className="font-medium text-gray-700 uppercase">
        {name} {last_name}
      </span>
    </div>
    <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1 transition">
      <FiMessageSquare /> Message
    </button>
  </div>
);

const TodaysMatches = ({ matches, shortlisted }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerSlide = 3;

  const totalSlides = matches ? Math.ceil(matches.length / cardsPerSlide) : 0;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (slideIndex) => setCurrentSlide(slideIndex);

  return (
    <div className="min-h-full bg-gray-100 p-6 grid lg:grid-cols-3 gap-6 lg:px-12 px-2">
      {/* Today's Matches with Slider */}
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-2xl font-bold text-purple-700">TODAY'S MATCHES</p>
            <p className="pb-6 text-gray-500">Based on your preferences</p>
          </div>
          {matches && matches.length > cardsPerSlide && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-white shadow hover:bg-purple-50 transition"
                disabled={totalSlides <= 1}
                aria-label="Previous"
              >
                <FiChevronLeft className="text-purple-600" size={22} />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-white shadow hover:bg-purple-50 transition"
                disabled={totalSlides <= 1}
                aria-label="Next"
              >
                <FiChevronRight className="text-purple-600" size={22} />
              </button>
            </div>
          )}
        </div>

        {!matches || matches.length === 0 ? (
          <Loading />
        ) : (
          <div className="relative w-full overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div
                  key={slideIndex}
                  className="w-full flex-shrink-0 px-1"
                  style={{ minWidth: "100%" }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {matches
                      .slice(
                        slideIndex * cardsPerSlide,
                        (slideIndex + 1) * cardsPerSlide
                      )
                      .map((profile, profileIndex) => (
                        <ProfileCard
                          key={slideIndex * cardsPerSlide + profileIndex}
                          profile={profile.profile}
                          optionalPhoto={profile.photo}
                        />
                        // <div
                        //   key={slideIndex * cardsPerSlide + profileIndex}
                        //   className="bg-white rounded-2xl overflow-hidden shadow-lg relative hover:shadow-xl transition"
                        // >
                        //   {/* Profile Image */}
                        //   <div className="relative">
                        //     <img
                        //       src={profile.photo || Profile}
                        //       alt={profile.fullname}
                        //       className="w-full h-56 object-cover"
                        //     />
                        //     <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                        //       {profile.completion}% COMPLETED
                        //     </span>
                        //   </div>

                        //   {/* Profile Details */}
                        //   <div className="p-4">
                        //     <div className="flex justify-between items-center mb-1">
                        //       <h3 className="text-lg font-bold text-gray-800 uppercase truncate">
                        //         {(profile.profile.first_name + " " + profile.profile.last_name).toUpperCase() || "NO NAME"}
                        //       </h3>
                        //       <p className="text-sm text-gray-500 font-semibold">
                        //         {getAge(profile.profile.date_of_birth)} YRS
                        //       </p>
                        //     </div>
                        //     <div className="flex items-center text-xs text-gray-600 mb-2 uppercase">
                        //       <FaMapMarkerAlt className="mr-1 text-green-500" />
                        //       {(profile.profile.emirate + ", " + profile.profile.country_of_residence).toUpperCase()}
                        //     </div>

                        //     <div className="flex items-center justify-between text-xs mb-4">
                        //       <span className="text-green-600 font-semibold flex items-center gap-1 uppercase">
                        //         <FaCheckCircle className="text-base" />
                        //         {profile.profile.marital_status?.toUpperCase()}
                        //       </span>
                        //       <FaHeart className="text-gray-300" />
                        //     </div>

                        //     {/* View Profile Button */}
                        //     <button
                        //       onClick={() => setSelectedProfile(profile.profile)}
                        //       className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white text-sm font-bold py-2 rounded-lg shadow transition"
                        //     >
                        //       VIEW PROFILE
                        //     </button>
                        //   </div>
                        // </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      currentSlide === index
                        ? "bg-purple-600 scale-110"
                        : "bg-gray-300 hover:bg-purple-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Slide Counter */}
            {totalSlides > 1 && (
              <div className="text-center mt-2 text-xs text-gray-500">
                {currentSlide + 1} of {totalSlides}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Shortlisted Profiles */}
      <div className="w-full bg-white p-4 shadow rounded-2xl">
        <h2 className="text-lg font-bold mb-4 text-purple-700">SHORTLISTED PROFILES</h2>
        {!shortlisted || shortlisted.length === 0 ? (
          <Loading />
        ) : (
          shortlisted.map((data) => (
            <ShortlistedProfile
              key={data?.matched_user}
              name={data?.matched_profile.first_name?.toUpperCase()}
              last_name={data?.matched_profile.last_name?.toUpperCase()}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodaysMatches;