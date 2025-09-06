import { useEffect, useState, useRef } from "react";
// import { FaApple, FaGoogle, FaEyeSlash } from "react-icons/fa";
import CoupleImage from "../../assets/Couple.png";
import Logo from "../../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState(null);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Auto-focus to next input if current input has a value
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedDigits = pastedData.replace(/\D/g, "").split("").slice(0, 6);

    if (pastedDigits.length === 6) {
      setOtp(pastedDigits);
      inputRefs.current[5]?.focus();
    }
  };

  useEffect(function () {
    let email = localStorage.getItem("email");
    if (!email)
      return navigate("/", {
        replace: true,
      });
    setEmail(atob(email));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      return toast.error("Please enter a complete 6-digit code");
    }

    try {
      const response = await axiosInstance.post("/auth/verify-email/", {
        email,
        code: otpValue,
      });
      toast.success("Successfully verified");
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      navigate("/RegistrationForms", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.detail || "Verification failed");
    }
  };

  async function resendVerification() {
    try {
      await axiosInstance.post("/auth/resend-verification/", {
        email,
      });
      toast.success("Verification code sent successfully");
    } catch (error) {
      toast.error(error.response?.data?.detail || "Failed to resend code");
    }
  }

  return (
    <div className="h-[100vh] grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="w-full flex flex-col items-center justify-center px-10 bg-white">
        {/* Logo */}
        <div className="mb-6">
          <img src={Logo} alt="Logo" className="h-10" />
        </div>

        <h2 className="text-2xl font-semibold mb-2">Verify your email</h2>
        <p className="text-sm text-gray-500 mb-1">
          We&apos;ve sent a verification email to <b>{email}</b>
        </p>
        <p className="text-sm text-gray-500 mb-6">Please enter the code</p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center"
        >
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={idx === 0 ? handlePaste : undefined}
                className="w-12 h-12 text-center text-xl border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus={idx === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full px-28 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl mb-4"
          >
            Next
          </button>
        </form>

        <p className="text-sm text-gray-500">
          Experiencing issues receiving your code?{" "}
          <span
            onClick={resendVerification}
            className="text-purple-600 underline cursor-pointer"
          >
            Resend code
          </span>
        </p>
      </div>

      {/* Right Section - Local Image */}
      <div className="hidden lg:block">
        <img
          src={CoupleImage}
          alt="Couple"
          className="h-[100vh] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
