import Image from "next/image";
import StorySection from "@/components/homepage/StorySection";
// import NavBar from "@/components/NavBar/Desktop/NavBar";

import Tinder from "../../public/images/homepage/tinder.jpg"

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-1/4">
        <div className="sticky top-0">
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="top-0 mb-6">
          <StorySection />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-[36px] font-bold text-center mb-4">Find your <span className="text-teal-500 text-[36px] font-bold">Oyu</span>-Friend</h1>
          <div className="absolute left-1/2 justify-center items-center">
            <Image
              src={Tinder}
              alt="Oyu Friend"
              width={349}
              height={454}
              className="rounded-[20px] shadow-xl"
            />
          </div>
          <div className="absolute mt-100 ml-20">
            <Image
              src={Tinder}
              alt="Oyu Friend"
              width={349}
              height={454}
              className="rounded-[20px] shadow-xl"
            />
          </div>
          <div className=" justify-center items-center">
            <Image
              src={Tinder}
              alt="Oyu Friend"
              width={349}
              height={454}
              className="rounded-[20px] shadow-xl"
            />
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
