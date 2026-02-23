'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { getContactMessages, updateMessageReadStatus, deleteContactMessage } from '@/lib/database';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    loadMessages();
    
    // Check if there's an ID in the URL to show a specific message
    const messageId = searchParams.get('id');
    if (messageId) {
      // We'll find and show this message once messages are loaded
    }
  }, []);

  useEffect(() => {
    const messageId = searchParams.get('id');
    if (messageId && messages.length > 0) {
      const message = messages.find(m => m.id === messageId);
      if (message) {
        setSelectedMessage(message);
        setShowModal(true);
        // Mark as read if not already
        if (!message.is_read) {
          toggleReadStatus(message.id, false);
        }
      }
    }
  }, [messages, searchParams]);

  const loadMessages = async () => {
    try {
      const data = await getContactMessages();
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
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: !currentStatus });
      }
    } catch (error) {
      console.error('Error updating message status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteContactMessage(id);
      setMessages(messages.filter(msg => msg.id !== id));
      setDeleteConfirm(null);
      if (selectedMessage && selectedMessage.id === id) {
        setShowModal(false);
        setSelectedMessage(null);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const filteredMessages = messages
    .filter(message => {
      if (filter === 'read') return message.is_read;
      if (filter === 'unread') return !message.is_read;
      return true;
    })
    .filter(message => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        message.name.toLowerCase().includes(search) ||
        message.email.toLowerCase().includes(search) ||
        message.message.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  if (loading) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-48 mb-4"></div>
            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded mb-4"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-slate-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white lg:block hidden">
              Messages
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and respond to contact form messages
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filter buttons */}
            <div className="flex space-x-2">
              {(['all', 'unread', 'read'] as const).map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === filterOption
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  {filterOption === 'all' && ` (${messages.length})`}
                  {filterOption === 'unread' && ` (${messages.filter(m => !m.is_read).length})`}
                  {filterOption === 'read' && ` (${messages.filter(m => m.is_read).length})`}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-slate-700">
          {filteredMessages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-4xl mb-4">
                {searchTerm ? '🔍' : '📭'}
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? 'No messages match your search' : 'No messages found'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-slate-700">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-6 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer ${
                    !message.is_read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                  onClick={() => {
                    setSelectedMessage(message);
                    setShowModal(true);
                    if (!message.is_read) {
                      toggleReadStatus(message.id, false);
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`font-medium ${
                          !message.is_read 
                            ? 'text-blue-900 dark:text-blue-100' 
                            : 'text-gray-900 dark:text-gray-200'
                        }`}>
                          {message.name}
                        </h3>
                        {!message.is_read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className={`text-sm mb-2 ${
                        !message.is_read 
                          ? 'text-blue-700 dark:text-blue-300' 
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {message.email}
                      </p>
                      <p className={`text-sm line-clamp-2 ${
                        !message.is_read 
                          ? 'text-gray-800 dark:text-gray-200' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {message.message}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span className={`text-xs whitespace-nowrap ${
                        !message.is_read 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Modal */}
        {showModal && selectedMessage && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-xl bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Message Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedMessage.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-white">{selectedMessage.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <p className="text-gray-900 dark:text-white">{formatDate(selectedMessage.created_at)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 whitespace-pre-wrap">
                    <p className="text-gray-900 dark:text-white">{selectedMessage.message}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
                <div className="flex space-x-3">
                  <button
                    onClick={() => toggleReadStatus(selectedMessage.id, selectedMessage.is_read)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedMessage.is_read
                        ? 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                    }`}
                  >
                    {selectedMessage.is_read ? 'Mark as Unread' : 'Mark as Read'}
                  </button>

                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: Contact Form Message`}
                    className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    Reply via Email
                  </a>
                </div>

                <button
                  onClick={() => setDeleteConfirm(selectedMessage.id)}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-60">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-xl bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700">
              <div className="mt-3 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
                  <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
                  Delete Message
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Are you sure you want to delete this message? This action cannot be undone.
                </p>
                <div className="flex justify-center space-x-3 mt-6">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="px-4 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}