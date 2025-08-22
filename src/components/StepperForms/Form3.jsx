import toast from "react-hot-toast";

const PhysicalAppearanceForm = ({ details, setDetails, next, prev }) => {
  const handleChange = (field, value) => {
    // Ensure value is an integer by parsing and flooring
    const intValue = value ? parseInt(value, 10) : "";
    setDetails((prev) => ({ ...prev, [field]: intValue }));
  };

  const handleSubmit = () => {
    const validations = [
      {
        field: "height",
        label: "Height (cm)",
        validate: (v) => {
          const num = parseInt(v, 10);
          return !isNaN(num) && num >= 100 && num <= 250 && Number.isInteger(num);
        },
        message: "Please enter a valid height in cm (100–250) as an integer",
      },
      {
        field: "weight",
        label: "Weight (kg)",
        validate: (v) => {
          const num = parseInt(v, 10);
          return !isNaN(num) && num >= 30 && num <= 200 && Number.isInteger(num);
        },
        message: "Please enter a valid weight in kg (30–200) as an integer",
      },
      {
        field: "skin_color",
        label: "Skin Color",
        validate: (v) => ["Fair", "Medium", "Dark"].includes(v),
        message: "Please select your skin color",
      },
      {
        field: "eye_color",
        label: "Eye Color",
        validate: (v) => ["Blue", "Green", "Brown", "Black"].includes(v),
        message: "Please select your eye color",
      },
      {
        field: "hair_color",
        label: "Hair Color",
        validate: (v) => ["Black", "Brown", "Blonde", "Red", "Grey"].includes(v),
        message: "Please select your hair color",
      },
      {
        field: "partner_height",
        label: "Partner Height (cm)",
        validate: (v) => {
          const num = parseInt(v, 10);
          return !isNaN(num) && num >= 100 && num <= 250 && Number.isInteger(num);
        },
        message: "Please enter a valid partner height in cm (100–250) as an integer",
      },
      {
        field: "partner_weight",
        label: "Partner Weight (kg)",
        validate: (v) => {
          const num = parseInt(v, 10);
          return !isNaN(num) && num >= 30 && num <= 200 && Number.isInteger(num);
        },
        message: "Please enter a valid partner weight in kg (30–200) as an integer",
      },
      {
        field: "partnerSkinColor",
        label: "Partner Skin Color",
        validate: (v) => ["Fair", "Medium", "Dark"].includes(v),
        message: "Please select partner's skin color",
      },
      {
        field: "partnerEyeColor",
        label: "Partner Eye Color",
        validate: (v) => ["Blue", "Green", "Brown", "Black"].includes(v),
        message: "Please select partner's eye color",
      },
      {
        field: "partnerHairColor",
        label: "Partner Hair Color",
        validate: (v) => ["Black", "Brown", "Blonde", "Red", "Grey"].includes(v),
        message: "Please select partner's hair color",
      },
    ];

    for (let v of validations) {
      const value = details[v.field];
      if (!v.validate(value)) {
        toast.error(v.message);
        return false;
      }
    }

    return true;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold text-purple-700 mb-6">
        Tell us about your Physical Appearance
      </h2>

      {/* Your Physical Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Height */}
        <div>
          <label className="block mb-1 font-medium text-sm">Height (cm)</label>
          <input
            type="number"
            placeholder="Input your height"
            className="w-full border px-3 py-2 rounded"
            value={details.height || ""}
            onChange={(e) => handleChange("height", e.target.value)}
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-1 font-medium text-sm">Weight (kg)</label>
          <input
            type="number"
            placeholder="Input your weight"
            className="w-full border px-3 py-2 rounded"
            value={details.weight || ""}
            onChange={(e) => handleChange("weight", e.target.value)}
          />
        </div>

        {/* Skin Color */}
        <div>
          <label className="block mb-1 font-medium text-sm">Skin Color</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.skin_color || ""}
            onChange={(e) => handleChange("skin_color", e.target.value)}
          >
            <option value="">Select your skin color</option>
            <option>Fair</option>
            <option>Medium</option>
            <option>Dark</option>
          </select>
        </div>

        {/* Eye Color */}
        <div>
          <label className="block mb-1 font-medium text-sm">Eye Color</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.eye_color || ""}
            onChange={(e) => handleChange("eye_color", e.target.value)}
          >
            <option value="">Select eye color</option>
            <option>Blue</option>
            <option>Green</option>
            <option>Brown</option>
            <option>Black</option>
          </select>
        </div>

        {/* Hair Color */}
        <div>
          <label className="block mb-1 font-medium text-sm">Hair Color</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.hair_color || ""}
            onChange={(e) => handleChange("hair_color", e.target.value)}
          >
            <option value="">Select hair color</option>
            <option>Black</option>
            <option>Brown</option>
            <option>Blonde</option>
            <option>Red</option>
            <option>Grey</option>
          </select>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-purple-200" />
      <h3 className="text-sm font-bold uppercase text-purple-600 mb-4">
        Your Partner Preferences
      </h3>

      {/* Partner Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Preferred Height */}
        <div>
          <label className="block mb-1 font-medium text-sm">Partner Height (cm)</label>
          <input
            type="number"
            placeholder="Input preferred height"
            className="w-full border px-3 py-2 rounded"
            value={details.partner_height || ""}
            onChange={(e) => handleChange("partner_height", e.target.value)}
          />
        </div>

        {/* Preferred Weight */}
        <div>
          <label className="block mb-1 font-medium text-sm">Partner Weight (kg)</label>
          <input
            type="number"
            placeholder="Input preferred weight"
            className="w-full border px-3 py-2 rounded"
            value={details.partner_weight || ""}
            onChange={(e) => handleChange("partner_weight", e.target.value)}
          />
        </div>

        {/* Partner Skin Color */}
        <div>
          <label className="block mb-1 font-medium text-sm">Partner Skin Color</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.partnerSkinColor || ""}
            onChange={(e) => handleChange("partnerSkinColor", e.target.value)}
          >
            <option value="">Select skin color</option>
            <option>Fair</option>
            <option>Medium</option>
            <option>Dark</option>
          </select>
        </div>

        {/* Partner Eye Color */}
        <div>
          <label className="block mb-1 font-medium text-sm">Partner Eye Color</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.partnerEyeColor || ""}
            onChange={(e) => handleChange("partnerEyeColor", e.target.value)}
          >
            <option value="">Select eye color</option>
            <option>Blue</option>
            <option>Green</option>
            <option>Brown</option>
            <option>Black</option>
          </select>
        </div>

        {/* Partner Hair Color */}
        <div>
          <label className="block mb-1 font-medium text-sm">Partner Hair Color</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={details.partnerHairColor || ""}
            onChange={(e) => handleChange("partnerHairColor", e.target.value)}
          >
            <option value="">Select hair color</option>
            <option>Black</option>
            <option>Brown</option>
            <option>Blonde</option>
            <option>Red</option>
            <option>Grey</option>
          </select>
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

export default PhysicalAppearanceForm;