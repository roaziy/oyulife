"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Type definitions
interface Author {
  id: string;
  name: string;
  avatar: string;
  university: string;
  points: number;
}

interface Post {
  id: number;
  author: Author;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  createdAt: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  participants: number;
  deadline: string;
  reward: string;
  difficulty: string;
}

interface Topic {
  id: number;
  name: string;
  postsCount: number;
}

interface TopUser extends Author {
  rank: number;
}

// Mock data for community posts
const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: {
      id: "user1",
      name: "Bat Erdene",
      avatar: "/api/placeholder/50/50",
      university: "МУИС",
      points: 1250,
    },
    content:
      "Програмчлалын бие даалтаа хийж дуусгахад тусалж чадах хүн байна уу? Javascript, React сурч байгаа.",
    likes: 24,
    comments: 8,
    shares: 3,
    tags: ["Програмчлал", "Javascript", "React", "Тусламж"],
    createdAt: "2 цагийн өмнө",
  },
  {
    id: 2,
    author: {
      id: "user2",
      name: "Болор Эрдэнэ",
      avatar: "/api/placeholder/50/50",
      university: "ШУТИС",
      points: 3450,
    },
    content:
      "Маргааш Математик II хичээлээр семинар болно. Ирэх семинарт бэлтгэхдээ дараах дасгалуудыг хийх хэрэгтэй. Бие биедээ туслацгаая!",
    image: "/api/placeholder/400/300",
    likes: 45,
    comments: 12,
    shares: 8,
    tags: ["Математик", "Семинар", "ШУТИС"],
    createdAt: "4 цагийн өмнө",
  },
  {
    id: 3,
    author: {
      id: "user3",
      name: "Цэцэг Н.",
      avatar: "/api/placeholder/50/50",
      university: "МУИС",
      points: 5600,
    },
    content:
      "Маргааш Эрх зүйн хичээл дээр бэлтгэх хэрэгтэй судалгааны ажил байгаа. Хамтарч хийх хүн хэрэгтэй байна. Холбоо барина уу.",
    likes: 18,
    comments: 5,
    shares: 2,
    tags: ["Эрх зүй", "Судалгаа", "Хамтын ажиллагаа"],
    createdAt: "6 цагийн өмнө",
  },
  {
    id: 4,
    author: {
      id: "user4",
      name: "Тэмүүлэн Г.",
      avatar: "/api/placeholder/50/50",
      university: "МУИС-ХШУИС",
      points: 4200,
    },
    content:
      "Өнөөдөр CS350 Python хичээлийн хүрээнд хийсэн төслөө танилцуулж байна. Санал шүүмжээ үлдээгээрэй!",
    image: "/api/placeholder/400/300",
    likes: 67,
    comments: 23,
    shares: 15,
    tags: ["Python", "Програмчлал", "Төсөл", "МУИС"],
    createdAt: "8 цагийн өмнө",
  },
];

// Mock data for challenges
const CHALLENGES: Challenge[] = [
  {
    id: 1,
    title: "Долоо хоногийн код бичих сорил",
    description: "React ашиглан жижиг веб апп хийх",
    participants: 38,
    deadline: "3 өдрийн дараа",
    reward: "500 оноо + Ажлын санал",
    difficulty: "Дунд",
  },
  {
    id: 2,
    title: "UI/UX Дизайны уралдаан",
    description: "Оюутны аппликейшны UI дизайн",
    participants: 24,
    deadline: "5 өдрийн дараа",
    reward: "700 оноо + Дадлага хийх боломж",
    difficulty: "Хэцүү",
  },
  {
    id: 3,
    title: "Математикийн бодлого",
    description: "Магадлал, статистикийн бодлогууд",
    participants: 56,
    deadline: "2 өдрийн дараа",
    reward: "300 оноо",
    difficulty: "Хялбар",
  },
];

// Mock data for trending topics
const TRENDING_TOPICS: Topic[] = [
  { id: 1, name: "Програмчлал", postsCount: 324 },
  { id: 2, name: "Математик", postsCount: 218 },
  { id: 3, name: "Эдийн засаг", postsCount: 195 },
  { id: 4, name: "Англи хэл", postsCount: 182 },
  { id: 5, name: "Дадлага ажил", postsCount: 156 },
];

// Mock data for top users
const TOP_USERS: TopUser[] = [
  {
    id: "user5",
    name: "Ганболд Д.",
    avatar: "/api/placeholder/50/50",
    university: "МУИС",
    points: 12500,
    rank: 1,
  },
  {
    id: "user6",
    name: "Дэлгэрмаа С.",
    avatar: "/api/placeholder/50/50",
    university: "ШУТИС",
    points: 10850,
    rank: 2,
  },
  {
    id: "user7",
    name: "Баярсайхан Т.",
    avatar: "/api/placeholder/50/50",
    university: "МУИС",
    points: 9240,
    rank: 3,
  },
];

// Component for individual post
const Post: React.FC<{ post: Post }> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      {/* Author info */}
      <div className="flex items-center mb-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="font-medium text-gray-900">{post.author.name}</h3>
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {post.author.university}
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <span>{post.createdAt}</span>
            <span className="mx-1">•</span>
            <span>{post.author.points} оноо</span>
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="mb-3">
        <p className="text-gray-800">{post.content}</p>
        {post.image && (
          <div className="mt-3 relative w-full h-48 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Interactions */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <button
          className={`flex items-center gap-1 ${
            liked ? "text-blue-600" : "text-gray-500"
          } hover:text-blue-600`}
          onClick={handleLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H5.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
          </svg>
          <span>{likes}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
              clipRule="evenodd"
            />
          </svg>
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
              clipRule="evenodd"
            />
          </svg>
          <span>{post.shares}</span>
        </button>
      </div>
    </div>
  );
};

// Challenge card component
const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-3">
      <h3 className="font-medium text-gray-900 mb-1">{challenge.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{challenge.description}</p>
      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
        <div>
          <span className="text-gray-500">Оролцогчид:</span>{" "}
          <span className="font-medium">{challenge.participants}</span>
        </div>
        <div>
          <span className="text-gray-500">Хугацаа:</span>{" "}
          <span className="font-medium">{challenge.deadline}</span>
        </div>
        <div>
          <span className="text-gray-500">Шагнал:</span>{" "}
          <span className="font-medium">{challenge.reward}</span>
        </div>
        <div>
          <span className="text-gray-500">Түвшин:</span>{" "}
          <span className="font-medium">{challenge.difficulty}</span>
        </div>
      </div>
      <button className="w-full bg-blue-600 text-white rounded-md py-1.5 text-sm font-medium hover:bg-blue-700 transition">
        Оролцох
      </button>
    </div>
  );
};

// Community Page Component
export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("posts");
  const [postContent, setPostContent] = useState("");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content area */}
          <div className="lg:w-8/12">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center mb-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src="/api/placeholder/50/50"
                    alt="Your avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <textarea
                    className="w-full border border-gray-200 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Сэтгэгдлээ хуваалцах..."
                    rows={3}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="flex items-center gap-1 text-gray-500 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Зураг
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Видео
                  </button>
                  <button className="flex items-center gap-1 text-gray-500 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.097 1.515a.75.75 0 0 1 .589.882L10.666 7.5h4.47l1.079-5.397a.75.75 0 0 1 1.47.294L16.665 7.5h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.2 6h3.585a.75.75 0 0 1 0 1.5h-3.885l-1.08 5.397a.75.75 0 0 1-1.47-.294l1.02-5.103h-4.47l-1.08 5.397a.75.75 0 0 1-1.47-.294l1.02-5.103H3.75a.75.75 0 0 1 0-1.5h3.885l1.2-6H5.25a.75.75 0 0 1 0-1.5h3.885l1.08-5.397a.75.75 0 0 1 .882-.588ZM10.365 9l-1.2 6h4.47l1.2-6h-4.47Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Шошго
                  </button>
                </div>
                <button
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    postContent.trim()
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-300 cursor-not-allowed"
                  }`}
                  disabled={!postContent.trim()}
                >
                  Нийтлэх
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="flex border-b">
                <button
                  className={`flex-1 py-3 font-medium text-center ${
                    activeTab === "posts"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("posts")}
                >
                  Нийтлэлүүд
                </button>
                <button
                  className={`flex-1 py-3 font-medium text-center ${
                    activeTab === "challenges"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("challenges")}
                >
                  Сорилтууд
                </button>
                <button
                  className={`flex-1 py-3 font-medium text-center ${
                    activeTab === "knowledge"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("knowledge")}
                >
                  Мэдлэгийн сан
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div>
              {activeTab === "posts" && (
                <div>
                  {MOCK_POSTS.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                  <div className="flex justify-center my-6">
                    <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Цааш үзэх
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "challenges" && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      Нээлттэй сорилтууд
                    </h2>
                    <div className="flex gap-2">
                      <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                        <option>Бүгд</option>
                        <option>Програмчлал</option>
                        <option>Дизайн</option>
                        <option>Бизнес</option>
                        <option>Математик</option>
                      </select>
                      <select className="text-sm border border-gray-300 rounded-md px-2 py-1">
                        <option>Хугацаагаар</option>
                        <option>Шагналаар</option>
                        <option>Түвшингээр</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CHALLENGES.map((challenge) => (
                      <ChallengeCard key={challenge.id} challenge={challenge} />
                    ))}
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Бүх сорилтуудыг харах
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "knowledge" && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      Мэдлэгийн сан
                    </h2>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Хайх..."
                        className="border border-gray-300 rounded-md pl-8 pr-4 py-1.5 text-sm"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-gray-400 absolute left-2.5 top-2"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2">
                        Програмчлалын үндэс - React эхлэх гарын авлага
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        React нь Facebook-ээс гаргасан нээлттэй эхийн JavaScript сан бөгөөд интерактив UI бүтээхэд зориулагдсан байдаг. Энэ гарын авлагаар React-ийн үндсэн ойлголтуудтай танилцаж...
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="relative w-6 h-6 rounded-full overflow-hidden">
                            <Image
                              src="/api/placeholder/50/50"
                              alt="Author"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs text-gray-500">
                            Нарангэрэл Б. • 3 долоо хоногийн өмнө
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="flex items-center gap-1 text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                            >
                              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                              <path
                                fillRule="evenodd"
                                d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                clipRule="evenodd"
                              />
                            </svg>
                            1,234
                          </span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              45
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-2">
                          Эдийн засгийн үндсэн ойлголтууд - Оюутнуудад зориулсан
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          Энэхүү гарын авлагаар эдийн засгийн үндсэн ойлголтуудтай танилцаж, өдөр тутмын амьдралд хэрхэн ашиглаж болох талаар суралцана...
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden">
                              <Image
                                src="/api/placeholder/50/50"
                                alt="Author"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <span className="text-xs text-gray-500">
                              Золжаргал М. • 2 долоо хоногийн өмнө
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="flex items-center gap-1 text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                <path
                                  fillRule="evenodd"
                                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              987
                            </span>
                            <span className="flex items-center gap-1 text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.804 21.644A6.707 6.707 0 0 0 6 21.75a6.721 6.721 0 0 0 3.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 0 1-.814 1.686.75.75 0 0 0 .44 1.223ZM8.25 10.875a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25ZM10.875 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              32
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Бүх материалыг харах
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
  
            {/* Sidebar */}
            <div className="lg:w-4/12">
              {/* Trending Topics */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  Трэнд сэдвүүд
                </h2>
                <div className="space-y-2">
                  {TRENDING_TOPICS.map((topic) => (
                    <Link
                      key={topic.id}
                      href="#"
                      className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md"
                    >
                      <span className="text-gray-800">#{topic.name}</span>
                      <span className="text-xs text-gray-500">{topic.postsCount} пост</span>
                    </Link>
                  ))}
                </div>
              </div>
  
              {/* Top Users */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-3">
                  Шилдэг оюутнууд
                </h2>
                <div className="space-y-3">
                  {TOP_USERS.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>{user.university}</span>
                            <span className="mx-1">•</span>
                            <span>{user.points} оноо</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-100 text-blue-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                        {user.rank}
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="#"
                  className="text-blue-600 text-sm font-medium mt-3 block text-center"
                >
                  Бүх оюутныг харах
                </Link>
              </div>
  
              {/* Call to Action */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">
                  Өөрийн мэдлэгээ хуваалцаарай!
                </h3>
                <p className="text-blue-700 text-sm mb-3">
                  Бусад оюутнуудад туслах, оноо цуглуулах, ажлын байрны санал авах боломжтой.
                </p>
                <button className="w-full bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 transition">
                  Мэдлэгийн сан руу нэмэх
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }