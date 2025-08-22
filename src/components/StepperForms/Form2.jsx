import toast from "react-hot-toast";

const LifestyleForm = ({ details, setDetails, next, prev }) => {
  const yesNoOptions = ["Yes", "No"];
  const partnerOptions = ["Yes", "No", "No Preference"];

  const handleChange = (field, value) =>
    setDetails((prev) => ({ ...prev, [field]: value }));
const handleSubmit = () => {
  const validations = [
    {
      field: "smoker",
      label: "Smoking status",
      validate: (v) => v === true || v === false,
      message: "Please indicate if you're a smoker",
    },
    {
      field: "veiled",
      label: "Veil status",
      validate: (v) => v === true || v === false,
      message: "Please indicate if you're veiled",
    },
    {
      field: "alcohol",
      label: "Alcohol consumption",
      validate: (v) => v === true || v === false,
      message: "Please indicate if you drink alcohol",
    },
    {
      field: "has_pets",
      label: "Pets",
      validate: (v) => v === true || v === false,
      message: "Please indicate if you have pets at home",
    },
    {
      field: "has_allergies",
      label: "Allergies",
      validate: (v) => v === true || v === false,
      message: "Please indicate if you have allergies",
    },
    {
      field: "has_disabilities",
      label: "Disabilities",
      validate: (v) => v === true || v === false,
      message: "Please indicate if you have any disabilities",
    },
    {
      field: "partnerSmoker",
      label: "Partner Smoker",
      validate: (v) => ["Yes", "No", "No Preference"].includes(v),
      message: "Please select your partner smoking preference",
    },
    {
      field: "partnerVeiled",
      label: "Partner Veiled",
      validate: (v) => ["Yes", "No", "No Preference"].includes(v),
      message: "Please select your partner veiling preference",
    },
    {
      field: "partnerAlcohol",
      label: "Partner Alcohol",
      validate: (v) => ["Yes", "No", "No Preference"].includes(v),
      message: "Please select your partner alcohol preference",
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
      <h2 className="text-xl font-semibold text-purple-700 mb-6">
        Tell us about your Lifestyle
      </h2>

      {/* Self Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Smoker */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Are you a smoker?
          </label>
          <div className="flex gap-6">
            {yesNoOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="smoker"
                  value={opt === "Yes"}
                  checked={details.smoker === (opt === "Yes")}
                  onChange={() => handleChange("smoker", opt === "Yes")}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Veiled */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Are you veiled?
          </label>
          <div className="flex gap-6">
            {yesNoOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="veiled"
                  value={opt === "Yes"}
                  checked={details.veiled === (opt === "Yes")}
                  onChange={() => handleChange("veiled", opt === "Yes")}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Alcohol */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Do you drink alcohol?
          </label>
          <div className="flex gap-6">
            {yesNoOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="alcohol"
                  value={opt === "Yes"}
                  checked={details.alcohol === (opt === "Yes")}
                  onChange={() => handleChange("alcohol", opt === "Yes")}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pets */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Do you have pets at home?
          </label>
          <div className="flex gap-6">
            {yesNoOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="has_pets"
                  value={opt === "Yes"}
                  checked={details.has_pets === (opt === "Yes")}
                  onChange={() => handleChange("has_pets", opt === "Yes")}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Do you suffer from allergies?
          </label>
          <div className="flex gap-6">
            {yesNoOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="has_allergies"
                  value={opt === "Yes"}
                  checked={details.has_allergies === (opt === "Yes")}
                  onChange={() => handleChange("has_allergies", opt === "Yes")}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Disabilities */}
        <div>
          <label className="block mb-2 font-medium text-sm">
            Do you have any disabilities?
          </label>
          <div className="flex gap-6">
            {yesNoOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="has_disabilities"
                  value={opt === "Yes"}
                  checked={details.has_disabilities === (opt === "Yes")}
                  onChange={() => handleChange("has_disabilities", opt === "Yes")}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-purple-200 my-6" />
      <h3 className="text-sm font-bold uppercase text-purple-600 mb-4">
        Your Partner Preferences
      </h3>

      {/* Partner Preferences */}
      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-sm">
            Should your partner be a smoker?
          </label>
          <div className="flex gap-6">
            {partnerOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="partnerSmoker"
                  value={opt}
                  checked={details.partnerSmoker === opt}
                  onChange={() => handleChange("partnerSmoker", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-sm">
            Should your partner be veiled?
          </label>
          <div className="flex gap-6">
            {partnerOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="partnerVeiled"
                  value={opt}
                  checked={details.partnerVeiled === opt}
                  onChange={() => handleChange("partnerVeiled", opt)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-sm">
            Are you open to a partner who drinks alcohol?
          </label>
          <div className="flex gap-6">
            {partnerOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="partnerAlcohol"
                  value={opt}
                  checked={details.partnerAlcohol === opt}
                  onChange={() => handleChange("partnerAlcohol", opt)}
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
export default LifestyleForm