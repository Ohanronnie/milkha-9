import React from "react";
import toast from "react-hot-toast";

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

const partnerOptions = ["Yes", "No", "Open to any"];

const InterestsHobbiesForm = ({ details, setDetails, prev, next }) => {
  const toggleHobby = (hobby) => {
    setDetails((prev) => {
      const exists = prev.hobbies?.includes(hobby);
      const updated = exists
        ? prev.hobbies.filter((h) => h !== hobby)
        : [...(prev.hobbies || []), hobby];

      return { ...prev, hobbies: updated };
    });
  };

  const handlePartnerPreferenceChange = (value) => {
    setDetails((prev) => ({ ...prev, partnerHobbies: value }));
  };
  const handleSubmit = () => {
    if (!Array.isArray(details.hobbies) || details.hobbies.length === 0) {
      toast.error("Please select at least one hobby");
      return false;
    }

    const partnerOptions = ["Yes", "No", "Open to any"];
    if (!partnerOptions.includes(details.partnerHobbies)) {
      toast.error("Please specify your preference for partner's hobbies");
      return false;
    }

    return true;
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-purple-700 mb-6">
        Tell us about your Interests & Hobbies
      </h2>

      {/* Hobbies Selection */}
      <div className="mb-8">
        <label className="block mb-3 font-medium text-sm">
          What are your hobbies
        </label>
        <div className="flex flex-wrap gap-3">
          {hobbiesList.map((hobby) => (
            <button
              key={hobby}
              onClick={() => toggleHobby(hobby)}
              className={`px-4 py-2 text-sm rounded-full border transition ${
                details.hobbies?.includes(hobby)
                  ? "bg-purple-100 text-purple-700 border-purple-300"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              }`}
              type="button"
            >
              {hobby}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-purple-200" />
      <h3 className="text-sm font-bold uppercase text-purple-600 mb-4">
        Your Partner Preferences
      </h3>

      {/* Partner Hobby Preference */}
      <div>
        <label className="block mb-2 text-sm font-medium">
          Do you want a partner with similar hobbies?
        </label>
        <div className="flex gap-6">
          {partnerOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="partnerHobbies"
                value={opt}
                checked={details.partnerHobbies === opt}
                onChange={() => handlePartnerPreferenceChange(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-8 sm:flex-row justify-between gap-4">
        <button
          disabled={false}
          onClick={prev}
          className={`px-6 py-2 rounded text-white w-full sm:w-auto ${
            false
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          Previous
        </button>

        {false ? (
          <button
            onClick={() => alert("Form submitted!")}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded w-full sm:w-auto"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={() => handleSubmit() && next()}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded w-full sm:w-auto"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default InterestsHobbiesForm;
