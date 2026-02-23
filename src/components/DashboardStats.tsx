'use client';

import { useState, useEffect } from 'react';
import { getMessageStats } from '@/lib/database';

interface MessageStats {
  total: number;
  unread: number;
  today: number;
  thisWeek: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<MessageStats>({ total: 0, unread: 0, today: 0, thisWeek: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getMessageStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Messages',
      value: stats.total,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      iconBg: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Unread Messages',
      value: stats.unread,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5M4 19h10a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
      iconBg: 'bg-red-500',
      change: stats.unread > 0 ? 'Needs attention' : 'All caught up!',
      changeType: stats.unread > 0 ? 'warning' : 'success'
    },
    {
      title: "Today's Messages",
      value: stats.today,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20',
      iconBg: 'bg-emerald-500',
      change: stats.today > stats.total * 0.1 ? 'High activity' : 'Normal activity',
      changeType: stats.today > stats.total * 0.1 ? 'increase' : 'neutral'
    },
    {
      title: 'This Week',
      value: stats.thisWeek,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      iconBg: 'bg-purple-500',
      change: `${Math.round((stats.thisWeek / stats.total) * 100)}% of total`,
      changeType: 'neutral'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
            <div className="animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              </div>
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`relative overflow-hidden bg-gradient-to-br ${card.bgGradient} rounded-2xl p-6 shadow-xl border border-white/20 dark:border-slate-700/30 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 group`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          
          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {card.icon}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${ 
                  card.changeType === 'increase' ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30' :
                  card.changeType === 'warning' ? 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30' :
                  card.changeType === 'success' ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30' :
                  'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-700'
                }`}>
                  {card.change}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {card.value.toLocaleString()}
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {card.title}
              </div>
            </div>

            {/* Progress bar (for visual appeal) */}
            <div className="mt-4 bg-white/20 dark:bg-slate-800/30 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000 delay-300`}
                style={{
                  width: card.title === 'Total Messages' ? '100%' :
                         card.title === 'Unread Messages' ? `${stats.total > 0 ? (stats.unread / stats.total) * 100 : 0}%` :
                         card.title === "Today's Messages" ? `${stats.total > 0 ? (stats.today / stats.total) * 100 : 0}%` :
                         `${stats.total > 0 ? (stats.thisWeek / stats.total) * 100 : 0}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}