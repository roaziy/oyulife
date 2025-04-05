'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [markingAll, setMarkingAll] = useState<boolean>(false);

  useEffect(() => {
    // Mock fetching notifications data
    const fetchNotifications = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'New message received',
          message: 'You have a new message from the Community forum',
          timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
          isRead: false,
          type: 'info'
        },
        {
          id: '2',
          title: 'Knowledge Forum update',
          message: 'Your post received 5 new upvotes',
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          isRead: false,
          type: 'success'
        },
        {
          id: '3',
          title: 'AI Assistant recommendation',
          message: 'Based on your interests, check out the new AI tools section',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
          isRead: true,
          type: 'info'
        },
        {
          id: '4',
          title: 'Account reminder',
          message: 'Please verify your email address to unlock all features',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          isRead: true,
          type: 'warning'
        },
        {
          id: '5',
          title: 'System maintenance',
          message: 'OyuLife will be undergoing maintenance this weekend',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
          isRead: true,
          type: 'error'
        }
      ];
      
      setNotifications(mockNotifications);
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = async () => {
    try {
      // Set loading state for the button
      setMarkingAll(true);

      // In a real implementation, you would call your API here
      // Simulate API call delay for better UX feedback
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({ ...notification, isRead: true }))
      );
      
      console.log('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    } finally {
      setMarkingAll(false);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const getNotificationTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return 'border-l-4 border-blue-500 bg-blue-50';
      case 'success':
        return 'border-l-4 border-green-500 bg-green-50';
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'error':
        return 'border-l-4 border-red-500 bg-red-50';
      default:
        return 'border-l-4 border-gray-300 bg-gray-50';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <select 
              className="pl-3 pr-8 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'read')}
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>
          <button 
            onClick={markAllAsRead}
            className={`cursor-pointer px-4 py-2 rounded-md transition flex items-center justify-center min-w-[140px] ${
              unreadCount > 0 && !markingAll
                ? "bg-teal-500 text-white hover:bg-teal-600" 
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={unreadCount === 0 || markingAll}
          >
            {markingAll ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Mark all as read'
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No notifications</h3>
          <p className="text-gray-500">
            {filter === 'all' 
              ? "You don't have any notifications yet." 
              : filter === 'unread' 
                ? "You don't have any unread notifications." 
                : "You don't have any read notifications."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {unreadCount > 0 && filter === 'all' && (
            <div className="bg-gray-50 px-6 py-3 border-b">
              <p className="text-sm font-medium text-gray-700">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
          )}
          <ul className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <li 
                key={notification.id} 
                className={`px-6 py-4 hover:bg-gray-50 transition ${!notification.isRead ? 'bg-gray-50' : ''}`}
              >
                <div className={`flex items-start p-4 rounded-md ${getNotificationTypeStyles(notification.type)}`}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                        {!notification.isRead && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                            New
                          </span>
                        )}
                      </h3>
                      <span className="text-sm text-gray-500">{formatTime(notification.timestamp)}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{notification.message}</p>
                    <div className="mt-2 flex">
                      {!notification.isRead && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-teal-600 hover:text-teal-800 transition"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notification;