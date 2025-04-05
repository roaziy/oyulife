"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tinder from "../../public/images/homepage/tinder.png";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const images = [Tinder, Tinder, Tinder];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [profiles] = useState(
    Array.from({ length: 16 }, (_, index) => ({
      id: index,
      name: "Lisa",
      imageUrl: "/images/story/lisa.png",
    }))
  );


  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const prevImage = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextImage = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8 p-6">
      {/* Main Content */}
      <div className="flex-1 p-0 mb-6 z-[2]">
        <div className="p-0 mb-6 flex justify-center bg-white rounded-lg shadow-md relative flex-row items-center">
          <button
            onClick={scrollLeft}
            className="p-2 hover:bg-gray-100 rounded-full z-10"
          >
            <ChevronLeft />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex space-x-2 overflow-x-auto py-4 px-2 max-w-xl"
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="w-20 flex-shrink-0 flex flex-col items-center"
              >
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-teal-400">
                  <img
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-center">
                  {profile.name}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="p-2 hover:bg-gray-100 rounded-full z-10"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md relative flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-4">
            Find your <span className="text-teal-500">Oyu</span>-Friend
          </h1>

          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            onClick={prevImage}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            onClick={nextImage}
          >
            <ChevronRight />
          </button>

          <div className="relative w-full max-w-md h-[454px]">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Oyu Friend ${index}`}
                width={349}
                height={454}
                className={`rounded-[20px] shadow-xl absolute inset-0 transition-transform duration-300 ease-in-out ${
                  index === current
                    ? "scale-100 opacity-100 z-20"
                    : index === (current - 1 + images.length) % images.length
                    ? "-translate-x-24 scale-90 opacity-50 z-10"
                    : "translate-x-24 scale-90 opacity-50 z-10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Posts */}
        {[1, 2].map((post) => (
          <div key={post} className="bg-white rounded-lg shadow-md p-4 w-full">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/images/profiles/story/profile.jpg"
                alt="Profile"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold">Curie.Lisa000</p>
                <p className="text-gray-500 text-sm">12h</p>
              </div>
            </div>
            <Image
              src="/images/post/post1.png"
              alt="Post"
              width={600}
              height={300}
              className="rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-[280px] space-y-6 sticky top-[20px] h-[calc(100vh-100px)] overflow-y-auto">
        <div className="bg-[#EFEFEF] p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-2">Your current Rank</h2>
          <p className="text-gray-500 text-sm">Rating: 2230</p>
          <p className="text-gray-500 text-sm">Top 0.1% of 237844</p>
        </div>
        <div className="bg-[#EFEFEF] p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-4">Top Rank</h2>
          <ul className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7].map((rank) => (
              <li key={rank} className="flex items-center gap-2">
                <span className="font-bold">NÂ°{rank}</span>
                <Image
                  src="/images/profiles/story/profile.jpg"
                  alt="Profile"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">Stas Neprokin</p>
                  <p className="text-sm text-gray-500">@sneprokin</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
