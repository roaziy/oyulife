"use client";

import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  MessageSquare, 
  BookOpen, 
  Bell,
  ArrowUpRight,
  Calendar,
  Clock,
  TrendingUp,
  Activity,
  Globe,
  Settings,
  Search,
  Filter,
  Download,
  MoreVertical
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');

  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-500",
      trend: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    },
    {
      title: "Active Conversations",
      value: "156",
      change: "+8.2%",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-green-500",
      trend: [20, 30, 25, 40, 39, 50, 60, 81, 95]
    },
    {
      title: "Knowledge Articles",
      value: "892",
      change: "+5.7%",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-purple-500",
      trend: [40, 50, 45, 60, 59, 70, 80, 101, 115]
    },
    {
      title: "Notifications",
      value: "24",
      change: "+3.1%",
      icon: <Bell className="w-6 h-6" />,
      color: "bg-yellow-500",
      trend: [10, 20, 15, 30, 29, 40, 50, 61, 75]
    }
  ];

  const recentActivity = [
    {
      title: "New user registration",
      time: "2 minutes ago",
      icon: <Users className="w-4 h-4" />,
      user: "John Doe",
      type: "user"
    },
    {
      title: "Knowledge article updated",
      time: "15 minutes ago",
      icon: <BookOpen className="w-4 h-4" />,
      user: "Sarah Smith",
      type: "content"
    },
    {
      title: "New message in community",
      time: "1 hour ago",
      icon: <MessageSquare className="w-4 h-4" />,
      user: "Mike Johnson",
      type: "message"
    },
    {
      title: "System update completed",
      time: "2 hours ago",
      icon: <Bell className="w-4 h-4" />,
      user: "System",
      type: "system"
    }
  ];

  const topUsers = [
    { name: "John Doe", role: "Admin", activity: "98%", avatar: "JD" },
    { name: "Sarah Smith", role: "Moderator", activity: "95%", avatar: "SS" },
    { name: "Mike Johnson", role: "User", activity: "92%", avatar: "MJ" },
    { name: "Emily Brown", role: "User", activity: "89%", avatar: "EB" },
  ];

  const performanceMetrics = [
    { label: "Response Time", value: "1.2s", target: "1.5s", status: "good" },
    { label: "Uptime", value: "99.9%", target: "99.5%", status: "excellent" },
    { label: "Error Rate", value: "0.1%", target: "0.5%", status: "good" },
    { label: "User Satisfaction", value: "4.8/5", target: "4.5/5", status: "excellent" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search and Filters */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-5 h-5 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="mb-8 flex justify-end">
          <div className="inline-flex rounded-lg border border-gray-200">
            {['day', 'week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-500 hover:bg-gray-50'
                } ${range === 'day' ? 'rounded-l-lg' : ''} ${
                  range === 'year' ? 'rounded-r-lg' : ''
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <div className="flex items-center text-green-500 text-sm">
                  {stat.change}
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{stat.title}</h3>
              <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
              <div className="mt-4 h-16 flex items-end">
                {stat.trend.map((value, i) => (
                  <div
                    key={i}
                    className="flex-1 mx-1 bg-blue-100 rounded-t"
                    style={{ height: `${(value / 125) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-blue-500 hover:text-blue-600">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{activity.title}</h3>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-500">By {activity.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{metric.label}</span>
                      <span className={`text-sm font-medium ${
                        metric.status === 'excellent' ? 'text-green-500' : 'text-blue-500'
                      }`}>
                        {metric.value}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            metric.status === 'excellent' ? 'bg-green-500' : 'bg-blue-500'
                          }`}
                          style={{ width: `${(parseFloat(metric.value) / parseFloat(metric.target)) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Target: {metric.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>New Message</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  <BookOpen className="w-5 h-5" />
                  <span>Create Article</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                  <Users className="w-5 h-5" />
                  <span>Invite Users</span>
                </button>
              </div>
            </div>

            {/* Top Users */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Top Users</h2>
                <button className="text-blue-500 hover:text-blue-600">View All</button>
              </div>
              <div className="space-y-4">
                {topUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">{user.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                      <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                    <div className="text-sm font-medium text-green-500">{user.activity}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">System Status</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-900">All Systems Operational</span>
                  </div>
                  <span className="text-sm text-gray-500">Updated 5m ago</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">API</span>
                    <span className="text-sm font-medium text-green-500">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Database</span>
                    <span className="text-sm font-medium text-green-500">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Storage</span>
                    <span className="text-sm font-medium text-green-500">98%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
