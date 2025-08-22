import React from "react";
import toast from "react-hot-toast";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

const PersonalInfoForm = ({ details, setDetails, next, prev }) => {
  const handleChange = (field, value) =>
    setDetails((prev) => ({ ...prev, [field]: value }));
  const handleSubmit = () => {
    const validations = [
      {
        field: "first_name",
        label: "First Name",
        validate: (v) => v && v.length >= 2,
        message: "First name must be at least 2 characters long",
      },
      {
        field: "last_name",
        label: "Last Name",
        validate: (v) => v && v.length >= 2,
        message: "Last name must be at least 2 characters long",
      },
      {
        field: "date_of_birth",
        label: "Date of Birth",
        validate: (v) => Boolean(v),
        message: "Date of birth is required",
      },
      {
        field: "gender",
        label: "Gender",
        validate: (v) => Boolean(v),
        message: "Gender selection is required",
      },
     
      {
        field: "marital_status",
        label: "Marital Status",
        validate: (v) => Boolean(v),
        message: "Please select your marital status",
      },
      {
        field: "has_children",
        label: "Children",
        validate: (v) => v === true || v === false,
        message: "Please indicate if you have children",
      },
      {
        field: "country_of_residence",
        label: "Country of Residence",
        validate: (v) => Boolean(v),
        message: "Country of residence is required",
      },
      {
        field: "emirate",
        label: "Emirate",
        validate: (v) => Boolean(v),
        message: "Please select your Emirate",
      },
      {
        field: "nationality",
        label: "Nationality",
        validate: (v) => v && v !== "Select Nationality",
        message: "Please select your nationality",
      },
      {
        field: "partner_marital_status",
        label: "Partner Marital Status",
        validate: (v) => Boolean(v),
        message: "Preferred partner's marital status is required",
      },
      {
        field: "accepts_children",
        label: "Partner Has Children",
        validate: (v) => Boolean(v),
        message: "Please indicate your preference for partner's children",
      },
      {
        field: "partner_location",
        label: "Partner Country of Residence",
        validate: (v) => Boolean(v),
        message: "Please select partner's country of residence",
      },
    ];

    for (let v of validations) {
      if (!v.validate(details[v.field])) {
        toast.error(v.message);
        return false;
      }
    }

    return true;
  };
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      {/* 1. Basic Info */}
      <h2 className="text-xl font-semibold text-purple-700 mb-6">
        Tell us a bit about yourself
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block mb-1 font-medium text-sm">
            What is your First Name? <span className="text-purple-600">*</span>
          </label>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              value={details.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              placeholder="Your first name"
              className="pl-10 w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1 font-medium text-sm">
            How about your Last Name? <span className="text-purple-600">*</span>
          </label>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              value={details.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
              placeholder="Your last name"
              className="pl-10 w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1 font-medium text-sm">
            How old are you? <span className="text-purple-600">*</span>
          </label>
          <div className="relative">
            <FaCalendarAlt className="absolute top-3 left-3 text-gray-400" />
            <input
              type="date"
              value={details.date_of_birth}
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
              className="pl-10 w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            What's your gender?
          </label>
          <div className="flex gap-4">
            {["Male", "Female"].map((gender) => (
              <label
                key={gender}
                className="flex items-center gap-2 border rounded px-4 py-2 cursor-pointer w-full justify-center hover:border-purple-400"
              >
                <FaUser />
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={details.gender === gender}
                  onChange={() => handleChange("gender", gender)}
                  className="hidden peer"
                />
                <span className="peer-checked:text-purple-700">{gender}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="pt-8">
        <label className="block mb-2 font-medium text-sm">
          Bio Information{" "}
          <span className="text-[10px]">
            (This will appear on your Profile page)
          </span>
        </label>
        <textarea
          value={details.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          className="w-full border-gray-700 border rounded p-2"
          rows={6}
        />
      </div>

      {/* Divider */}
      <hr className="my-10" />

      {/* 2. Detailed Info */}
      <h2 className="text-xl font-semibold text-purple-700 mb-6">
        Personal & Partner Preferences
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Marital Status */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Marital Status
          </label>
          <div className="flex gap-4">
            {["Divorced", "Widowed", "Single"].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="marital_status"
                  value={status}
                  checked={details.marital_status === status}
                  onChange={(e) =>
                    handleChange("marital_status", e.target.value)
                  }
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Children */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Do you have children?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((val) => (
              <label key={val} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="has_children"
                  value={val}
                  checked={details.has_children === (val === "Yes")}
                  onChange={(e) => handleChange("has_children", val === "Yes")}
                />
                <span>{val}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Country & Emirate */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Country of Residence
          </label>
          <input
            value={details.country_of_residence}
            onChange={(e) =>
              handleChange("country_of_residence", e.target.value)
            }
            className="w-full border rounded px-3 py-2"
          />
           
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            I reside in the Emirate of
          </label>
          <input
            value={details.emirate}
            onChange={(e) => handleChange("emirate", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Nationality */}
        <div>
          <label className="block mb-1 text-sm font-medium">Nationality</label>
          <input
            value={details.nationality}
            onChange={(e) => handleChange("nationality", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Partner Preferences */}
      <h3 className="text-sm mt-8 font-bold uppercase text-purple-600 border-b pb-1 mb-4">
        Your Partner Preferences
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Partner Marital Status */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Preferred Partner's Marital Status
          </label>
          <div className="flex gap-4">
            {["Divorced", "Widowed", "Single"].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="partner_marital_status"
                  value={status}
                  checked={details.partner_marital_status === status}
                  onChange={(e) =>
                    handleChange("partner_marital_status", e.target.value)
                  }
                />
                <span>{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Partner Children */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Do you prefer a partner with children?
          </label>
          <div className="flex gap-4">
            {["Yes", "No"].map((val) => (
              <label key={val} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accepts_children"
                  value={val}
                  checked={details.accepts_children === val}
                  onChange={(e) => handleChange("accepts_children", val)}
                />
                <span>{val}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Partner Country & Emirate */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Partner's Country of Residence
          </label>
          <input
            value={details.partner_location}
            onChange={(e) =>
              handleChange("partner_location", e.target.value)
            }
            className="w-full border rounded px-3 py-2"
          />
            
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

export default PersonalInfoForm;
