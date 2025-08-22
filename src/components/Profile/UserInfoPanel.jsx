import { FiEdit2 } from "react-icons/fi";

import { Link } from "react-router-dom";

const tags = ["Fitness", "Travel", "Reading", "Photography", "Cooking"];

export default function UserInfoPanel({ userDetails }) {
  return (
    <div className="space-y-4 text-sm text-gray-700 lg:px-12">
      {/* BIO */}
      <div className="border border-purple-300 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="uppercase font-bold text-xs text-gray-600">Bio</h4>
          <Link to="/ProfileForms">
            <FiEdit2 className="text-gray-500 cursor-pointer" />
          </Link>
        </div>
        <p className="text-sm leading-relaxed">{userDetails?.bio}</p>
      </div>

      {/* HOBBIES */}
      <div className="border border-purple-300 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="uppercase font-bold text-xs text-gray-600">Hobbies</h4>
          <FiEdit2 className="text-gray-500 cursor-pointer" />
        </div>
        <div className="flex flex-wrap gap-2">
          {userDetails?.interests?.split(",").map((tag) => (
            <span
              key={tag}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium"
            >
              ⚡ {tag}
            </span>
          ))}
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="border border-purple-300 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h4 className="uppercase font-bold text-xs text-gray-600">
            Personal Info
          </h4>
          <FiEdit2 className="text-gray-500 cursor-pointer" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          {/* <div>
            <p className="uppercase text-xs text-gray-400">Religion</p>
            <p className="font-medium">Hinduism</p>
          </div>*/}
          <div>
            <p className="uppercase text-xs text-gray-400">Marital Status</p>
            <p className="font-medium">{userDetails?.marital_status}</p>
          </div>
          <div>
            <p className="uppercase text-xs text-gray-400">Academic Qualification</p>
            <p className="font-medium">{userDetails?.academic_qualification}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
