import React, { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const PhotoUploadStep = ({ details, setDetails, prev, next }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(URL.createObjectURL(selected));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(URL.createObjectURL(droppedFile));
    }
  };
  const returnTrueOrNull = (value) => {
    const val = value.toLowerCase();
    if (val === "yes") {
      return true;
    } else if (val === "no") {
      return false;
    } else {
      return null;
    }
  };
  const handleSubmit = async (e) => {
    try {
      console.log(567);
      let partnerDetails = {
        preferred_gender: details.gender == "male" ? "f" : "m",
        preferred_marital_status: details.partner_marital_status,
        accepts_children: returnTrueOrNull(details.accepts_children),
        //   preferred_nationality: null,
        accepts_smoker: returnTrueOrNull(details.partnerSmoker),
        prefers_veiled: returnTrueOrNull(details.partnerVeiled),
        accepts_alcohol: returnTrueOrNull(details.partnerAlcohol),
        accepts_pets: null,
        preferred_skin_color: details.partnerSkinColor,
        preferred_eye_color: details.partnerEyeColor,
        preferred_hair_color: details.partnerHairColor,
        willing_to_go_abroad: returnTrueOrNull(details.partnerRelocate),
        accepts_polygamy: returnTrueOrNull(details.partnerPolygamy),
        wants_children: returnTrueOrNull(details.partnerChildren),
        min_education_level: details.partnerQualification,
        preferred_occupation: details.partnerOccupation,
        min_income_range: null,

        has_similar_interests: returnTrueOrNull(details.partnerHobbies),
        preferred_location: details.partner_location,
      };
      let partnerKeys = Object.keys(partnerDetails).filter(
        (val) => partnerDetails[val]
      );
      let filteredPartners = {};

      console.log(101);
      const filteredDetails = {
        ...details,
        languages: details.languages.join(", "),
        interests: details.hobbies.join(""),
        gender: details.gender.trim().at(0),
        willing_to_go_abroad: true,
      };

      console.log(101);
      partnerKeys.forEach((val) => {
        filteredPartners[val] = partnerDetails[val];
      });
      const formData = new FormData();
      formData.append("photo", fileInputRef.current.files[0]);
      formData.append("is_primary", true);
      setLoading(true);
      await axiosInstance.post("/profile/create/", filteredDetails);
      await axiosInstance.post("/profile/photos/upload/", formData);

      await axiosInstance.put("/match-preferences/", filteredPartners);
      toast.success("Success");
      navigate("/");
    } catch (error) {
      setLoading(false)
      toast.error("Error occurred when submitting, retry after some time");
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 flex flex-col items-center text-center">
      <h2 className="text-2xl font-semibold mb-8">Show off your best smile</h2>

      {/* Upload box */}
      <div
        className="w-60 h-60 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer mb-4 bg-gray-50 hover:border-purple-500 transition"
        onClick={() => fileInputRef.current.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {file ? (
          <img
            src={file}
            alt="Preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <div className="flex flex-col items-center text-gray-400">
            <FiUploadCloud size={32} />
            <p className="text-sm mt-2">
              Choose a file or drag & drop it here.
            </p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          required
        />
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 max-w-sm mb-8">
        Upload a clear, recent photo of yourself. This increases your chances of
        making great connections.
      </p>
      <div className="flex flex-col mt-8 sm:flex-row justify-between gap-4">
        <button
          disabled={true}
          onClick={prev}
          className={`px-6 py-2 rounded text-white w-full sm:w-auto ${
            false
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          Previous
        </button>

        {true ? (
          <button
            onClick={() => handleSubmit()}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded w-full sm:w-auto"
            disabled={loading}
            
          >
           {loading ? "Loading..." : "Finish"}
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

export default PhotoUploadStep;
