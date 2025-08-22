import React from "react";
import toast from "react-hot-toast";

const MarriagePlansForm = ({ details, setDetails, prev, next }) => {
  const yesNoOptions = ["Yes", "No"];
  const partnerOptions = ["Yes", "No", "No Preference"];

  const handleChange = (field, value) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    const validations = [
      {
        field: "marriage_type",
        label: "Type of Marriage",
        validate: (v) => ["Traditional", "External"].includes(v),
        message: "Please select the type of marriage",
      },
      {
        field: "scholarship",
        label: "Scholarship Intention",
        validate: (v) => typeof v === "boolean",
        message:
          "Please select if you have a scholarship plan to take your spouse abroad",
      },
      {
        field: "open_to_polygamy",
        label: "Polygamy Preference",
        validate: (v) => typeof v === "boolean",
        message: "Please indicate if you're open to polygamy",
      },
      {
        field: "wants_children",
        label: "Children Intention",
        validate: (v) => typeof v === "boolean",
        message: "Please indicate if you want children",
      },
      {
        field: "partnerRelocate",
        label: "Partner Relocation Preference",
        validate: (v) => ["Yes", "No", "No Preference"].includes(v),
        message: "Please specify if your partner should be willing to relocate",
      },
      {
        field: "partnerPolygamy",
        label: "Partner Polygamy Openness",
        validate: (v) => ["Yes", "No", "No Preference"].includes(v),
        message: "Please specify if your partner should be open to polygamy",
      },
      {
        field: "partnerChildren",
        label: "Partner Children Preference",
        validate: (v) => ["Yes", "No", "No Preference"].includes(v),
        message: "Please indicate if your partner should want children",
      },
    ];

    for (let item of validations) {
      const value = details[item.field];
      if (!item.validate(value)) {
        toast.error(item.message);
        return false;
      }
    }

    return true;
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-purple-700 mb-6">
        Tell us about your Marriage Plans
      </h2>

      {/* User Marriage Preferences */}
      <div className="space-y-6 mb-8">
        {/* Type of Marriage */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Type of Marriage
          </label>
          <div className="flex gap-6">
            {["Traditional", "External"].map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="marriage_type"
                  value={opt}
                  checked={details.marriage_type === opt}
                  onChange={() => handleChange("marriage_type", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Scholarship abroad */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Do you have a scholarship and wish to marry and take your spouse
            abroad?
          </label>
          <div className="flex gap-6">
            {yesNoOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="scholarship"
                  value={opt === "Yes"}
                  checked={details.scholarship === (opt === "Yes")}
                  onChange={() => handleChange("scholarship", opt === "Yes")}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Polygamy */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Do you wish for polygamy?
          </label>
          <div className="flex gap-6">
            {yesNoOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="open_to_polygamy"
                  value={opt === "Yes"}
                  checked={details.open_to_polygamy === (opt === "Yes")}
                  onChange={() => handleChange("open_to_polygamy", opt === "Yes")}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Children */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Do you wish to have children?
          </label>
          <div className="flex gap-6">
            {yesNoOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="haveChildren"
                  value={opt === "Yes"}
                  checked={details.wants_children === (opt === "Yes")}
                  onChange={() => handleChange("wants_children", opt === "Yes")}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-purple-200" />
      <h3 className="text-sm font-bold uppercase text-purple-600 mb-4">
        Your Partner Preferences
      </h3>

      {/* Partner Expectations */}
      <div className="space-y-6">
        {/* Relocation */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Should your partner be willing to relocate with you?
          </label>
          <div className="flex gap-6">
            {partnerOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="partnerRelocate"
                  value={opt}
                  checked={details.partnerRelocate === opt}
                  onChange={() => handleChange("partnerRelocate", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Partner open to Polygamy */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Should your partner be open to polygamy?
          </label>
          <div className="flex gap-6">
            {partnerOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="partnerPolygamy"
                  value={opt}
                  checked={details.partnerPolygamy === opt}
                  onChange={() => handleChange("partnerPolygamy", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Partner wants Children */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Do you want a partner who wants children?
          </label>
          <div className="flex gap-6">
            {partnerOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="partnerChildren"
                  value={opt}
                  checked={details.partnerChildren === opt}
                  onChange={() => handleChange("partnerChildren", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
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

export default MarriagePlansForm;
