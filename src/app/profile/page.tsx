'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiEdit2, FiSettings, FiActivity, FiUser, FiInstagram, FiTwitter, FiLinkedin, FiGithub, FiCamera } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
}

interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [stats] = useState<ProfileStats>({
    posts: 42,
    followers: 1234,
    following: 567
  });

  const [activities] = useState<Activity[]>([
    {
      id: 1,
      type: 'post',
      description: 'Created a new post about AI technology',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'comment',
      description: 'Commented on John\'s post',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      type: 'like',
      description: 'Liked Sarah\'s photo',
      timestamp: '1 day ago'
    }
  ]);

  const [socialLinks] = useState<SocialLink[]>([
    { platform: 'Instagram', url: 'https://instagram.com/johndoe', icon: <FiInstagram /> },
    { platform: 'Twitter', url: 'https://twitter.com/johndoe', icon: <FiTwitter /> },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: <FiLinkedin /> },
    { platform: 'GitHub', url: 'https://github.com/johndoe', icon: <FiGithub /> }
  ]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cover Photo */}
        <div className="relative h-48 md:h-64 rounded-t-lg overflow-hidden mb-6">
          <Image
            src="/images/profiles/story/cover.jpg"
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
          <button className="absolute bottom-4 right-4 bg-white/80 text-gray-800 p-2 rounded-full hover:bg-white transition-colors">
            <FiCamera size={18} />
          </button>
        </div>

        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative -mt-20 md:-mt-24">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
                {isImageLoading && (
                  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <span className="text-gray-400">Loading...</span>
                  </div>
                )}
                <Image
                  src="/images/profiles/story/profile.jpg"
                  alt="Profile"
                  width={128}
                  height={128}
                  className={`object-cover ${isImageLoading ? 'hidden' : 'block'}`}
                  onLoad={handleImageLoad}
                />
              </div>
              <button 
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                onClick={toggleEditMode}
              >
                <FiEdit2 size={16} />
              </button>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">John Doe</h1>
              <p className="text-gray-600">@johndoe</p>
              <p className="mt-2 text-gray-700">Software Developer | AI Enthusiast</p>
              
              {/* Social Links */}
              <div className="mt-3 flex flex-wrap gap-3 justify-center md:justify-start">
                {socialLinks.map((link) => (
                  <a 
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                    aria-label={`${link.platform} profile`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="#" className="text-center hover:opacity-80 transition-opacity">
                  <div className="text-xl font-bold text-gray-900">{stats.posts}</div>
                  <div className="text-sm text-gray-600">Posts</div>
                </a>
                <a href="#" className="text-center hover:opacity-80 transition-opacity">
                  <div className="text-xl font-bold text-gray-900">{stats.followers}</div>
                  <div className="text-sm text-gray-600">Followers</div>
                </a>
                <a href="#" className="text-center hover:opacity-80 transition-opacity">
                  <div className="text-xl font-bold text-gray-900">{stats.following}</div>
                  <div className="text-sm text-gray-600">Following</div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                <FiUser className="inline-block mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`${
                  activeTab === 'activity'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                <FiActivity className="inline-block mr-2" />
                Activity
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
              >
                <FiSettings className="inline-block mr-2" />
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
              <p className="text-gray-700">
                I'm a passionate software developer with expertise in web development and artificial intelligence.
                I love creating innovative solutions and sharing knowledge with the community.
              </p>
              
              <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AI/ML'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="text-gray-800">{activity.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Display Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={4}
                      defaultValue="Software Developer | AI Enthusiast"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Social Links</label>
                    <div className="mt-2 space-y-2">
                      {socialLinks.map((link) => (
                        <div key={link.platform} className="flex items-center">
                          <span className="w-24 text-sm text-gray-500">{link.platform}</span>
                          <input
                            type="text"
                            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            defaultValue={link.url}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
