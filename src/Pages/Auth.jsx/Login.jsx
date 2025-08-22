import { FaApple, FaGoogle, FaEyeSlash } from "react-icons/fa";
import CoupleImage from "../../assets/Couple.png"; // 👈 Your local image

import Logo from "../../assets/Logo.png"; // 👈 Your local image
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";

const Login = () => {
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(function () {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErrors(null);
      setIsSubmitting(true)
      const response = await axiosInstance.post("/auth/login/", details);
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      navigate('/')
    } catch (err) {
      setIsSubmitting(false)
      const res = err.response;
      setErrors(res?.data?.non_field_errors);
    } 
  };
  return (
    <div className="h-[100vh] grid lg:grid-cols-2  ">
      {/* Left Section */}
      <div className="w-full  flex flex-col items-center justify-center px-10  bg-white">
        {/* Logo */}
        <div className="mb-6">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-2 text-center">
          A meaningful connection is just a click away
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          By signing up, I agree to Mitha's{" "}
          <span className="text-purple-600 underline">Terms</span> and{" "}
          <span className="text-purple-600 underline">Privacy Policy</span>
        </p>

        {/* OAuth Buttons 
        <div className="space-y-3">
          <div className="w-full px-20 flex items-center justify-center border rounded py-2 text-sm font-medium">
            <FaApple className="mr-2" /> Sign up with Apple
          </div>
          <div className="w-full flex items-center justify-center border rounded py-2 text-sm font-medium">
            <FaGoogle className="mr-2" /> Sign up with Google
          </div>
        </div>*/}

        {/* Divider */}
        <div className="my-4 text-center text-gray-400 text-sm">
          SIGN UP WITH YOUR EMAIL
        </div>

        {/* Email Signup Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Email Address*</label>
            <input
              type="email"
              placeholder="hello@gmail.com"
              name="email"
              value={details.email}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password*</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                name="password"
                value={details.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full border rounded px-3 py-2 mt-1 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {/*<FaEyeSlash className="absolute right-3 top-3 text-gray-400" />*/}
            </div>
          </div>
          {errors && (
            <p className="text-red-600 text-sm text-center">{errors}</p>
          )}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Dont have an account?{" "}
          <Link to="/Signup" className="text-purple-600 font-medium">
            Sign up
          </Link>
        </p>

        <p className="text-sm text-center text-gray-600 mt-4">
          <Link to="/ForgotPassword" className="text-purple-600 font-medium">
            Forget Password
          </Link>
        </p>
      </div>

      {/* Right Section - Local Image */}
      <div className="hidden lg:block">
        <img src={CoupleImage} className="h-[100vh] w-full " />
      </div>
    </div>
  );
};

export default Login;
