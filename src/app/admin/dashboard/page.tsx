import AdminLayout from '@/components/AdminLayout';
import DashboardStats from '@/components/DashboardStats';
import RecentMessages from '@/components/RecentMessages';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                Here's what's happening with your portfolio today.
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-6 text-white">
                <div className="text-2xl mb-2">📊</div>
                <div className="text-sm opacity-90">Portfolio</div>
                <div className="text-lg font-semibold">Analytics</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Message Statistics
          </h2>
          <DashboardStats />
        </div>

        {/* Recent Messages */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            Recent Activity
          </h2>
          <RecentMessages />
        </div>

        {/* Quick Actions */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50 dark:border-slate-700/50">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center">
            <svg className="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/admin/messages"
              className="group bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-500 rounded-xl text-white group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">View All Messages</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Manage contact form submissions</p>
                </div>
              </div>
            </a>

            <a
              href="/"
              target="_blank"
              className="group bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200/50 dark:border-green-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-500 rounded-xl text-white group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Visit Portfolio</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">View your public website</p>
                </div>
              </div>
            </a>

            <div className="group bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500 rounded-xl text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">System Status</h3>
                  <p className="text-sm text-green-600 dark:text-green-400">✅ All systems operational</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}