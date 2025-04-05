"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tinder from "../../public/images/homepage/tinder.jpg";

export default function Home() {
  const [current, setCurrent] = useState(0);
  const images = [Tinder, Tinder, Tinder];

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
      <div className="flex-1 max-w-2xl flex flex-col items-center gap-8">
        <div className="relative bg-white rounded-lg shadow-xl w-full flex flex-col items-center p-6">
          <h1 className="text-3xl font-bold mb-6">
            Find your <span className="text-teal-500">Oyu</span>-Friend
          </h1>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            onClick={prevImage}
          >
            <ChevronLeft />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow"
            onClick={nextImage}
          >
            <ChevronRight />
          </button>
          <div className="relative h-[454px] w-[349px]">
            {images.map((img, idx) => (
              <Image
                key={idx}
                src={img}
                alt={`Friend ${idx}`}
                fill
                className={`rounded-[20px] transition-transform duration-300 ease-in-out shadow-xl absolute inset-0 m-auto $ {
                  idx === current
                    ? "scale-100 opacity-100 z-20"
                    : idx === (current - 1 + images.length) % images.length
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
              src="/images/posts/sample-post.jpg"
              alt="Post"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        ))}
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
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="font-bold mb-4">Top Rank</h2>
          <ul className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7].map((rank) => (
              <li key={rank} className="flex items-center gap-2">
                <span className="font-bold">N°{rank}</span>
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
