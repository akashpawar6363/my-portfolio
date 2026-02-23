'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading Admin Portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/admin/login');
    return null;
  }

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/admin/dashboard', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0z" />
        </svg>
      ),
      current: pathname === '/admin/dashboard'
    },
    { 
      name: 'Messages', 
      href: '/admin/messages', 
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      current: pathname === '/admin/messages'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-600 bg-opacity-75 transition-opacity lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-all duration-300 ease-in-out lg:translate-x-0 border-r border-slate-200/50 dark:border-slate-700/50 shadow-2xl`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-center h-20 px-6 border-b border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
            <div className="text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Admin Portal</h1>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Portfolio Management</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  item.current
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span className={`mr-3 transition-transform duration-200 group-hover:scale-110 ${
                  item.current ? 'text-white' : ''
                }`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="p-6 border-t border-slate-200/50 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center ring-4 ring-blue-100 dark:ring-blue-900/30">
                <span className="text-white font-bold text-sm">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  {theme === 'light' ? (
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  ) : (
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  )}
                </svg>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
              
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Page title */}
              <div className="flex-1 lg:flex-none">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {pathname === '/admin/dashboard' ? 'Dashboard Overview' : 
                   pathname === '/admin/messages' ? 'Message Management' : 'Admin Portal'}
                </h1>
              </div>

              {/* Header actions */}
              <div className="flex items-center space-x-4">
                <a
                  href="/"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 shadow-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  View Portfolio
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}