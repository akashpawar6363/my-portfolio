'use client';

import { useState, useEffect } from 'react';
import { getContactMessages, updateMessageReadStatus } from '@/lib/database';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function RecentMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getContactMessages(5); // Get 5 most recent messages
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReadStatus = async (id: string, currentStatus: boolean) => {
    try {
      await updateMessageReadStatus(id, !currentStatus);
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, is_read: !currentStatus } : msg
      ));
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const truncateMessage = (message: string, maxLength: number = 120) => {
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  if (loading) {
    return (
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50">
        <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Messages</h3>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16 animate-pulse"></div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
                      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
                    </div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-40"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50">
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            Recent Messages
          </h3>
          <a 
            href="/admin/messages"
            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all duration-200"
          >
            View All
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
      
      <div className="p-6">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
              <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-medium">No messages yet</p>
            <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">New contact form submissions will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`group relative p-4 rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer ${
                  message.is_read
                    ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-2 ring-blue-100 dark:ring-blue-900/30'
                }`}
                onClick={() => window.location.href = `/admin/messages?id=${message.id}`}
              >
                {/* Unread indicator */}
                {!message.is_read && (
                  <div className="absolute top-2 left-2">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                )}

                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white ${
                    message.is_read
                      ? 'bg-slate-400'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                  }`}>
                    {message.name.charAt(0).toUpperCase()}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-semibold truncate ${
                          message.is_read 
                            ? 'text-slate-900 dark:text-slate-200' 
                            : 'text-blue-900 dark:text-blue-100'
                        }`}>
                          {message.name}
                        </h4>
                        {!message.is_read && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            New
                          </span>
                        )}
                      </div>
                      <span className={`text-xs whitespace-nowrap ml-2 ${
                        message.is_read 
                          ? 'text-slate-500 dark:text-slate-400' 
                          : 'text-blue-600 dark:text-blue-400'
                      }`}>
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                    
                    <p className={`text-sm mb-2 truncate ${
                      message.is_read 
                        ? 'text-slate-600 dark:text-slate-400' 
                        : 'text-blue-700 dark:text-blue-300'
                    }`}>
                      {message.email}
                    </p>
                    
                    <p className={`text-sm leading-relaxed ${
                      message.is_read 
                        ? 'text-slate-700 dark:text-slate-300' 
                        : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {truncateMessage(message.message)}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleReadStatus(message.id, message.is_read);
                        }}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 ${
                          message.is_read
                            ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                        }`}
                      >
                        {message.is_read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `mailto:${message.email}`;
                        }}
                        className="text-xs font-medium px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-200"
                      >
                        Quick Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}