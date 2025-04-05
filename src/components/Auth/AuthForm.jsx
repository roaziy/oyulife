"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate authentication logic here (e.g., API call)
    localStorage.setItem("authToken", "fake-auth-token");

    // Notify parent component that login was successful
    onLoginSuccess();

    // Navigate to the main page
    router.push("/");
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
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6">
        {/* Toggle buttons */}
        <div className="flex mb-8 space-x-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-md font-medium transition ${
              isLogin
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-md font-medium transition ${
              !isLogin
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form container */}
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {isLogin ? "Log In" : "Sign Up"}
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

            <div className="mb-6">
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
              className="w-full bg-blue-500 text-white py-3 rounded-md font-medium hover:bg-blue-600 transition"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}