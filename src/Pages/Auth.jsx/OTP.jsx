import React, { useEffect, useState } from "react";
import { FaApple, FaGoogle, FaEyeSlash } from "react-icons/fa";
import CoupleImage from "../../assets/Couple.png";
import Logo from "../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const OTP = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };
  useEffect(function () {
    let email = localStorage.getItem("email");
    if (!email)
      return navigate("/", {
        replace: true,
      });
    setEmail(atob(email));
  }, []);
  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    const otps = Number(otp.join(""));
    if(isNaN(otps)){
      return toast.error("OTP contains invalid characters")
    }
    try {
      const response = await axiosInstance.post("/auth/verify-email/", {
        email,
        code: otps
      });
      toast.success("Successfully verified");
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      navigate("/RegistrationForms", {
        replace: true
      })
    } catch(error){
      toast.error(error.response?.data?.detail)
    }
   };
   async function resendVerification(){
     try {
      const response = await axiosInstance.post("/auth/verify-email/", {
        email,
      });
      toast.success("Sent successfully")
     
    } catch(error){
      toast.error(error.response?.data?.detail)
    }
   }
  return (
    <div className="h-[100vh] grid lg:grid-cols-2  ">
      {/* Left Section */}
      <div className="w-full  flex flex-col items-center justify-center px-10  bg-white">
        {/* Logo */}
        <div className="mb-6">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>

        <h2 className="text-2xl font-semibold mb-2">Verify your email</h2>
        <p className="text-sm text-gray-500 mb-1">
          We’ve sent a verification email to <b>{email}</b>
        </p>
        <p className="text-sm text-gray-500 mb-6">Please enter the code</p>

        <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="number"
              maxLength="1"
              max={9}
              value={digit}
              onChange={(e) => handleOtpChange(idx, e.target.valueAsNumber)}
              className="w-12 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}
        </div>

       
          <button  onClick={handleSubmit} className="w-full px-28 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded mb-4">
            Next
          </button>
       
        <p className="text-sm text-gray-500">
          Experiencing issues receiving your code?{" "}
          <span onClick={() => resendVerification()} className="text-purple-600 underline cursor-pointer">
            Resend code
          </span>
        </p>
      </div>

      {/* Right Section - Local Image */}
      <div className="hidden lg:block">
        <img src={CoupleImage} className="h-[100vh] w-full " />
      </div>
    </div>
  );
};

export default OTP;
