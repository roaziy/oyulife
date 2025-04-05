'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Tinder from '../../public/images/homepage/tinder.jpg'; // Replace this with your actual image path

export default function Home() {
  const [current, setCurrent] = useState(0);
  const images = [Tinder, Tinder, Tinder];
  const [count] = useState(16);
  const profiles = Array.from({ length: count }, (_, index) => ({
    id: index,
    name: "Lisa",
    imageUrl: "/api/placeholder/100/100"
  }));
  const prevImage = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextImage = () => {
    setCurrent(current === images.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-1/4">
        <div className="sticky top-0">
        </div>
      </div>

      {/* Main Content */}
      <div className="p-0 mb-6">
        <div className="p-0 mb-6 flex justify-center bg-white  rounded-lg shadow-md relative  flex-col items-center" >
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

          <div className="relative w-full max-w-md h-[454px]">
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
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
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

      {/* Right Sidebar */}
      <div className="hidden lg:block w-1/4">
        <div className="sticky top-0 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Your current Rank</h2>
            <p className="text-sm text-gray-500">Rating: 2230</p>
            <p className="text-sm text-gray-500">Top 0.1% of 231844</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Top Rank</h2>
            <ul className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7].map((rank) => (
                <li key={rank} className="flex items-center gap-2">
                  <span className="font-bold">N{rank}</span>
                  <Image
                    src="/images/profiles/story/profile.jpg"
                    alt="User Profile"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span className="font-semibold">Stas Neprokin</span>
                  <span className="text-sm text-gray-500">@sneprokin</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
