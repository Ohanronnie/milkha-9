import React from "react";
import toast from "react-hot-toast";

const CareerEducationForm = ({ details, setDetails, next, prev }) => {
  const qualifications = ["High School", "Bachelor's", "Master's", "PhD"];
  const fieldsOfWork = ["Healthcare", "Education", "Engineering", "IT"];
  const occupations = ["Government", "Private", "Freelance", "Business"];
  const locations = ["Abu Dhabi", "Dubai", "Sharjah"];
  const financialStatus = ["Excellent", "Good", "Average", "Below Average"];
  const incomeRanges = ["< $1000", "$1000 - $3000", "$3000 - $6000", "$6000+"];
  const partnerOptions = ["Yes", "No", "No Preference"];
  const languages = [
    "Arabic",
    "English",
    "French",
    "Turkish",
    "Persian",
    "Other",
  ];

  const handleChange = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    const validations = [
      {
        field: "academic_qualification",
        label: "Academic Qualification",
        options: ["High School", "Bachelor's", "Master's", "PhD"],
        message: "Please select your academic qualification",
      },
      {
        field: "field_of_work",
        label: "Field of Work",
        options: ["Healthcare", "Education", "Engineering", "IT"],
        message: "Please select your field of work",
      },
      {
        field: "work_location",
        label: "Work Location",
        options: ["Abu Dhabi", "Dubai", "Sharjah"],
        message: "Please select your work location",
      },
      {
        field: "occupation",
        label: "Occupation",
        options: ["Government", "Private", "Freelance", "Business"],
        message: "Please select your occupation",
      },
      {
        field: "financial_status",
        label: "Financial Status",
        options: ["Excellent", "Good", "Average", "Below Average"],
        message: "Please select your financial status",
      },
      {
        field: "monthly_income_range",
        label: "Monthly Income",
        options: ["< $1000", "$1000 - $3000", "$3000 - $6000", "$6000+"],
        message: "Please select your monthly income",
      },
      {
        field: "languages",
        label: "Languages Known",
        validate: (langs) => Array.isArray(langs) && langs.length > 0,
        message: "Please select at least one language you know",
      },
      {
        field: "partnerQualification",
        label: "Preferred Partner Qualification",
        options: ["High School", "Bachelor's", "Master's", "PhD"],
        message: "Please select preferred partner's qualification",
      },
      {
        field: "partnerFieldOfWork",
        label: "Preferred Partner Field of Work",
        options: ["Healthcare", "Education", "Engineering", "IT"],
        message: "Please select preferred partner's field of work",
      },
      {
        field: "partnerWorkLocation",
        label: "Preferred Partner Work Location",
        options: ["Abu Dhabi", "Dubai", "Sharjah"],
        message: "Please select preferred partner's work location",
      },
      {
        field: "partnerOccupation",
        label: "Preferred Partner Occupation",
        options: ["Government", "Private", "Freelance", "Business"],
        message: "Please select preferred partner's occupation",
      },
      {
        field: "partnerFinancialStatus",
        label: "Partner Financial Status Preference",
        options: ["Yes", "No", "No Preference"],
        message:
          "Please specify if partner should have similar financial status",
      },
    ];

    for (let v of validations) {
      const value = details[v.field];

      if (v.validate) {
        if (!v.validate(value)) {
          toast.error(v.message);
          return false;
        }
      } else if (!v.options.includes(value)) {
        toast.error(v.message);
        return false;
      }
    }

    return true;
  };

  const handleLanguageToggle = (lang) => {
    setDetails((prev) => {
      const newLangs = prev.languages
        ? prev.languages?.includes(lang)
          ? prev.languages.filter((l) => l !== lang)
          : [...prev?.languages, lang]
        : [];
      return { ...prev, languages: newLangs };
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-purple-700 mb-6">
        Tell us about your Career & Education
      </h2>

      {/* Self Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Academic Qualification */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Academic Qualification
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.academic_qualification || ""}
            onChange={(e) =>
              handleChange("academic_qualification", e.target.value)
            }
          >
            <option value="">Select qualification</option>
            {qualifications.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </div>

        {/* Field of Work */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Field of Work
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.field_of_work || ""}
            onChange={(e) => handleChange("field_of_work", e.target.value)}
          >
            <option value="">Select field</option>
            {fieldsOfWork.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Work Location */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Work Location (Emirate)
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.work_location || ""}
            onChange={(e) => handleChange("work_location", e.target.value)}
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Occupation */}
        <div>
          <label className="block mb-1 text-sm font-medium">Occupation</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.occupation || ""}
            onChange={(e) => handleChange("occupation", e.target.value)}
          >
            <option value="">Select occupation</option>
            {occupations.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>

        {/* Financial Status */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Financial Status
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.financial_status || ""}
            onChange={(e) => handleChange("financial_status", e.target.value)}
          >
            <option value="">Select status</option>
            {financialStatus.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Monthly Income */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Monthly Income
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.monthly_income_range || ""}
            onChange={(e) =>
              handleChange("monthly_income_range", e.target.value)
            }
          >
            <option value="">Select income range</option>
            {incomeRanges.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Languages */}
      <div className="mb-10">
        <label className="block mb-2 text-sm font-medium">
          Languages you Know
        </label>
        <div className="flex flex-wrap gap-4">
          {languages.map((lang) => (
            <label key={lang} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={details.languages?.includes(lang)}
                onChange={() => handleLanguageToggle(lang)}
              />
              {lang}
            </label>
          ))}
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-purple-200" />
      <h3 className="text-sm font-bold uppercase text-purple-600 mb-4">
        Your Partner Preferences
      </h3>

      {/* Partner Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Partner Qualification */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Preferred Academic Qualification
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.partnerQualification || ""}
            onChange={(e) =>
              handleChange("partnerQualification", e.target.value)
            }
          >
            <option value="">Select qualification</option>
            {qualifications.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </div>

        {/* Partner Field of Work */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Preferred Field of Work
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.partnerFieldOfWork || ""}
            onChange={(e) => handleChange("partnerFieldOfWork", e.target.value)}
          >
            <option value="">Select field</option>
            {fieldsOfWork.map((f) => (
              <option key={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Partner Work Location */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Preferred Work Location (Emirate)
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.partnerWorkLocation || ""}
            onChange={(e) =>
              handleChange("partnerWorkLocation", e.target.value)
            }
          >
            <option value="">Select location</option>
            {locations.map((loc) => (
              <option key={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Partner Occupation */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Preferred Occupation
          </label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.partnerOccupation || ""}
            onChange={(e) => handleChange("partnerOccupation", e.target.value)}
          >
            <option value="">Select occupation</option>
            {occupations.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Similar Financial Status */}
      <div className="mt-8">
        <label className="block mb-2 text-sm font-medium">
          Should your partner have a similar financial status?
        </label>
        <div className="flex gap-6">
          {partnerOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-2">
              <input
                type="radio"
                name="partnerFinancialStatus"
                value={opt}
                checked={details.partnerFinancialStatus === opt}
                onChange={() => handleChange("partnerFinancialStatus", opt)}
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

export default CareerEducationForm;
