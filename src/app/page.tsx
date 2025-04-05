"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tinder from "../../public/images/homepage/tinder.jpg";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const images = [Tinder, Tinder, Tinder];
  const [count] = useState(16);
  const profiles = Array.from({ length: count }, (_, index) => ({
    id: index,
    name: "Lisa",
    imageUrl: "../../public/images/profiles/story/profile.jpg",
  }));

  const prevImage = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextImage = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="flex justify-between p-6 gap-8">
      {/* Left Sidebar */}
      <div className="w-[250px] flex flex-col gap-4 py-6 pl-8 ">
      </div>

      {/* Main Content */}
      <div className="p-0 mb-6">
        <div className="p-0 mb-6 flex justify-center bg-white  rounded-full shadow-md relative overflow-hidden flex-col items-center" >
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide max-w-xl">
            {profiles.map((profile) => (
              <div key={profile.id} className="w-20 flex-shrink-0 flex flex-col items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-teal-400">
                  <img
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-center">{profile.name}</span>
              </div>
            ))}
          </div>
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

          <div className="relative w-full ml-20 max-w-md h-[454px]">
            {images.map((img, index) => (
              <Image
                key={index}
                src={img}
                alt={`Oyu Friend ${index}`}
                width={349}
                height={454}
                className={`rounded-[20px] shadow-xl absolute inset-0 transition-transform duration-300 ease-in-out ${index === current
                    ? 'scale-100 opacity-100 z-20'
                    : index === (current - 1 + images.length) % images.length
                      ? '-translate-x-24 scale-90 opacity-50 z-10'
                      : 'translate-x-24 scale-90 opacity-50 z-10'
                  }`}
              />
            ))}
          </div>
        </div>
      <div className="flex-1 max-w-2xl flex flex-col items-center gap-8">


        {/* Posts */}
        <div className="space-y-6 mt-6">
          {[1, 2].map((post) => (
            <div key={post} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/profiles/story/profile.jpg"
                  alt="User Profile"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">Curie.Lisa000</p>
                  <p className="text-sm text-gray-500">12h</p>
                </div>
              </div>
              <div className="mt-4">
                <Image
                  src="/images/posts/sample-post.jpg"
                  alt="Post Image"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[280px] space-y-6">
      </div>
            {/* Right Sidebar */}
      <div className="fixed mr-7 right-0 w-[280px] space-y-6">
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
