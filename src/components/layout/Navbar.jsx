import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom"; // ✅ Import useLocation
import {
  FiSearch,
  FiMessageSquare,
  FiBell,
  FiUser,
  FiHeart,
} from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import Logo from "../../assets/Logo.png";
import Profile from "../../assets/Profile.png";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const location = useLocation(); // ✅ Get current path
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    axiosInstance.get("/profile").then(({ data }) => {
      setUserDetails(data)
    }).catch(e => toast.error("error occurred somewhere"))
  }, []);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-purple-400 text-white">
      <div className="lg:px-12 mx-auto px-4 sm:px-6 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img src={Logo} alt="Logo" className="h-8 w-auto" />
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className={`flex items-center space-x-1 text-sm px-3 py-1.5 rounded-md ${
                isActive("/dashboard") ? "bg-purple-600" : "hover:opacity-90"
              }`}
            >
              <HiOutlineViewGrid />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/search"
              className={`flex items-center space-x-1 text-sm px-3 py-1.5 rounded-md ${
                isActive("/search") ? "bg-purple-600" : "hover:opacity-90"
              }`}
            >
              <FiSearch />
              <span>Search</span>
            </Link>
            <Link
              to="/matches"
              className={`flex items-center space-x-1 text-sm px-3 py-1.5 rounded-md ${
                isActive("/matches") ? "bg-purple-600" : "hover:opacity-90"
              }`}
            >
              <FiHeart />
              <span>Matches</span>
            </Link>
            <Link
              to="/messages"
              className={`flex items-center space-x-1 text-sm px-3 py-1.5 rounded-md ${
                isActive("/messages") ? "bg-purple-600" : "hover:opacity-90"
              }`}
            >
              <FiMessageSquare />
              <span>Messages</span>
            </Link>
            <Link
              to="/profile"
              className={`flex items-center space-x-1 text-sm px-3 py-1.5 rounded-md ${
                isActive("/profile") ? "bg-purple-600" : "hover:opacity-90"
              }`}
            >
              <FiUser />
              <span>Profile</span>
            </Link>
          </div>

          {/* Right Side (Dropdown Trigger) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/Notifications">
              <FiBell className="text-xl cursor-pointer" />
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={
                    userDetails?.photos.find((e) => e.is_primary)?.photo ||
                    Profile
                  }
                  alt="Avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm">{userDetails?.first_name} ▾</span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                  <Link
                    to="/ShortlistedProfiles"
                    className={`block px-4 py-2 text-sm ${
                      isActive("/shortlisted")
                        ? "bg-purple-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Shortlisted Profiles
                  </Link>
                  <Link
                    to="/settings"
                    className={`block px-4 py-2 text-sm ${
                      isActive("/settings")
                        ? "bg-purple-100"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    Settings
                  </Link>

                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth={2} />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeWidth={2} />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-300 px-4 pb-4 space-y-3">
          <Link to="/" className="block text-sm py-1">
            Dashboard
          </Link>
          <Link to="/search" className="block text-sm py-1">
            Search
          </Link>
          <Link to="/matches" className="block text-sm py-1">
            Matches
          </Link>
          <Link to="/messages" className="block text-sm py-1">
            Messages
          </Link>
          <Link to="/profile" className="block text-sm py-1">
            Profile
          </Link>
          <Link to="/ShortlistedProfiles" className="block text-sm py-1">
            Shortlisted Profiles
          </Link>{" "}
          <Link to="/Settings" className="block text-sm py-1">
            Settings
          </Link>{" "}
          <Link to="/login" className="block text-sm py-1">
            Log out
          </Link>
          <div className="flex items-center justify-between pt-2 border-t border-purple-200">
            <div
              className="flex items-center space-x-2"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={ userDetails?.photos.find((e) => e.is_primary)?.photo  || Profile}
                alt="User"
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-sm">{userDetails?.first_name}</span>
            </div>
            <Link to="/Notifications">
              <FiBell className="text-xl cursor-pointer" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
