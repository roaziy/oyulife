"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Initialize the router

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication logic here (e.g., API call)
    // After successful login or signup, navigate to the main page
    router.push("/main"); // Replace "/main" with your main page route
  };

  return (
    <div className="flex min-h-screen bg-blue-50">
      {/* Left side with illustration */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-12">
        <div className="relative w-full max-w-md">
          <Image
            src="/images/auth/LoginPic.svg"
            alt="Person working at desk"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>

      {/* Right side with auth form */}
      <div className="w-full md:w-1/2 flex flex-col">
        {/* Top navigation */}
        <div className="flex justify-end p-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-md transition mr-4 ${
              isLogin
                ? "bg-blue-400 text-white hover:bg-blue-500"
                : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-md transition ${
              !isLogin
                ? "bg-blue-400 text-white hover:bg-blue-500"
                : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form container */}
        <div className="flex-grow flex items-center justify-center px-6 pb-6">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-10">
              {isLogin ? "Log in" : "Sign up"}
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {!isLogin && (
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-600 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end mb-6">
                  <a href="#" className="text-sm text-gray-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-navy-800 text-white py-3 rounded-md font-medium hover:bg-navy-900 transition mb-6"
              >
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}