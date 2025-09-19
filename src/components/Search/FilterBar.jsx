import React, { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaStar,
  FaHeart,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import { useCountries } from "../../utils/countries";

export default function FilterBar({ filters, setFilters }) {
  const [selectedFilters, setSelectedFilters] = useState({
    location: false,
    hobbies: false,
    interests: false,
    age: false,
    religion: false,
    marital_status: false,
    emirate: false,
  });

  const [sortBy, setSortBy] = useState("Top matches");
  const [searchInput, setSearchInput] = useState(filters?.name_search || ""); // track input

  // country modal state
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [countryQuery, setCountryQuery] = useState("");

  // keep local input in sync with external filters.fullname
  useEffect(() => {
    setSearchInput(filters?.name_search || "");
  }, [filters?.name_search]);

  const toggleFilter = (filterName) => {
    setSelectedFilters((prev) => {
      const newFilters = Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === filterName ? !prev[key] : false;
        return acc;
      }, {});
      return newFilters;
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    setFilters((prev) => ({
      ...prev,
      // remove fullname key if empty so parent won't send an empty param
      name_search: trimmed !== "" ? trimmed : undefined,
    }));
  };

  // load countries for modal
  const { countries: allCountries, loading: countriesLoading } = useCountries({
    autoFetch: true,
  });

  return (
    <div className="relative">
      <div className="bg-white border-b border-gray-200 px-4 py-4 md:px-12">
        {/* Search + Filters container */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search input */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full md:w-1/3 bg-gray-50 border border-gray-200 rounded-full px-3 py-2"
          >
            <FaSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name..."
              className="w-full bg-transparent focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="ml-2 text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full"
            >
              Search
            </button>
          </form>

          {/* Filter buttons */}
          <div className="flex overflow-x-auto md:overflow-visible space-x-3 pb-2">
            <FilterButton
              active={selectedFilters.location}
              onClick={() => toggleFilter("location")}
              icon={<FaMapMarkerAlt className="w-4 h-4" />}
              label="Location"
            />

            {/* <FilterButton
              active={selectedFilters.hobbies}
              onClick={() => toggleFilter("hobbies")}
              icon={<FaStar className="w-4 h-4" />}
              label="Hobbies"
              color="purple"
            /> */}

            <FilterButton
              active={selectedFilters.age}
              onClick={() => toggleFilter("age")}
              label="Age Range"
              color="purple"
            />

            {/* <FilterButton
              active={selectedFilters.religion}
              onClick={() => toggleFilter("religion")}
              label="Religion"
            /> */}

            <FilterButton
              active={selectedFilters.marital_status}
              onClick={() => toggleFilter("marital_status")}
              icon={<FaHeart className="w-4 h-4" />}
              label="Marital Status"
            />
          </div>

          {/* Sort select */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              Sort By:
            </span>
            <div className="relative w-full md:w-auto">
              <select
                value={filters?.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                }
                className="appearance-none w-full bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Top matches</option>
                <option>Newest First</option>
                <option>Distance</option>
              </select>
              <FaChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Popups below filter bar */}
      <div className="px-4 md:px-12 mt-2 space-y-4">
        {selectedFilters.location && (
          <PopupCard title="Location">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm">
                Selected:{" "}
                <span className="font-medium">
                  {filters?.emirate || "None"}
                </span>
              </p>
              <button
                onClick={() => setShowCountryModal(true)}
                className="text-xs bg-purple-600 text-white px-3 py-1 rounded"
              >
                Choose Country
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Or open the picker to select a different country.
            </p>
          </PopupCard>
        )}

        {showCountryModal && (
          <CountrySelectModal
            isOpen={showCountryModal}
            onClose={() => setShowCountryModal(false)}
            countries={allCountries || []}
            loading={countriesLoading}
            query={countryQuery}
            setQuery={setCountryQuery}
            onSelect={(countryName) => {
              setFilters((prev) => ({ ...prev, emirate: countryName }));
              setShowCountryModal(false);
            }}
          />
        )}

        {selectedFilters.age && (
          <PopupCard title="Select Age Range">
            {["18-20", "20-25", "25-35", "50-60"].map((age) => (
              <label key={age} className="block text-sm">
                <input
                  type="radio"
                  onChange={() => setFilters((prev) => ({ ...prev, age }))}
                  checked={filters.age === age}
                  name="age"
                  className="mr-2"
                />{" "}
                {age} years
              </label>
            ))}
          </PopupCard>
        )}

        {/* {selectedFilters.religion && (
          <PopupCard title="Religion">
            {["Islam", "Christianity", "Hinduism", "Open to all Faiths"].map(
              (r) => (
                <label key={r} className="block text-sm">
                  <input
                    type="radio"
                    onChange={() => setFilters((prev) => ({ ...prev, religion: r }))}
                    checked={filters.religion === r}
                    name="religion"
                    className="mr-2"
                  />{" "}
                  {r}
                </label>
              )
            )}
          </PopupCard>
        )} */}

        {selectedFilters.marital_status && (
          <PopupCard title="Marital Status">
            {["Single", "Divorced", "Widowed"].map((status) => (
              <label key={status} className="block text-sm">
                <input
                  type="radio"
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, marital_status: status }))
                  }
                  checked={filters.marital_status === status}
                  name="marital_status"
                  className="mr-2"
                />{" "}
                {status}
              </label>
            ))}
          </PopupCard>
        )}
      </div>
    </div>
  );
}

// Reusable button component
const FilterButton = ({ icon, label, onClick, active, color = "gray" }) => {
  const baseColor =
    color === "purple"
      ? active
        ? "bg-purple-50 border-purple-200 text-purple-700"
        : "bg-purple-100 border-purple-200 text-purple-700"
      : active
      ? "bg-blue-50 border-blue-200 text-blue-700"
      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100";

  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-colors ${baseColor} whitespace-nowrap`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

// Reusable popup card component
const PopupCard = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-md p-4 w-full sm:max-w-md md:max-w-lg">
    <p className="font-medium text-sm mb-2">{title}</p>
    {children}
  </div>
);

// Country selection modal (inline component)
const CountrySelectModal = ({
  isOpen,
  onClose,
  countries,
  loading,
  query,
  setQuery,
  onSelect,
}) => {
  if (!isOpen) return null;
  const filtered = (countries || []).filter((c) =>
    c.name.toLowerCase().includes((query || "").toLowerCase())
  );
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="bg-white rounded-md shadow-lg z-10 w-full max-w-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Select Country</h3>
          <button onClick={onClose} className="text-sm text-gray-600">
            Close
          </button>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search country..."
          className="w-full border rounded px-3 py-2 mb-3"
        />
        <div className="max-h-60 overflow-auto">
          {loading && (
            <p className="text-sm text-gray-500">Loading countries...</p>
          )}
          {!loading && filtered.length === 0 && (
            <p className="text-sm text-gray-500">No countries found.</p>
          )}
          {!loading &&
            filtered.map((c) => (
              <button
                key={c.code || c.name}
                onClick={() => onSelect(c.name)}
                className="w-full text-left px-2 py-2 hover:bg-gray-100 flex items-center gap-2"
              >
                {c.flag ? (
                  <img
                    src={c.flag}
                    alt="flag"
                    className="w-5 h-4 object-cover"
                  />
                ) : null}
                <span className="text-sm">{c.name}</span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
