import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <div className="w-full bg-white dark:bg-[#1a2632]">
          <div className="max-w-7xl mx-auto px-4 md:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                  Simplify your university{' '}
                  <span className="text-primary">payments today</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                  The official platform for managing RUPP student payments. Easily track tuition,
                  upload receipts, and get administrative approval all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Link to="/student/dashboard">
                    <button className="flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-primary/30 transition-colors text-lg">
                      <span>Student Portal</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </Link>
                  <Link to="/admin/dashboard">
                    <button className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-bold rounded-xl transition-colors text-lg">
                      <span>Admin Dashboard</span>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="/photo_2025-12-26 18.24.22.jpeg"
                  alt="RUPP Campus"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full bg-background-light dark:bg-background-dark py-16 md:py-24 px-4 md:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Why Choose RUPP PayTrack?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Designed to make university payments simple and secure
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-[#1a2632] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="size-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    credit_card
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Easy Payments
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Submit your tuition payments with just a few clicks. Upload receipts and track
                  your payment history in real-time.
                </p>
              </div>
              <div className="bg-white dark:bg-[#1a2632] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="size-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    verified_user
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Secure & Safe
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your data is protected with enterprise-grade security. All transactions are
                  encrypted and verified by university staff.
                </p>
              </div>
              <div className="bg-white dark:bg-[#1a2632] rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="size-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">speed</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  Fast Approval
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Get notified instantly when your payment is approved. No more waiting in long
                  queues or unclear statuses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full bg-gradient-to-br from-primary to-blue-600 py-16 md:py-20 px-4 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Join thousands of RUPP students managing their payments efficiently
            </p>
            <Link to="/login">
              <button className="px-8 py-4 bg-white hover:bg-slate-50 text-primary font-bold rounded-xl shadow-lg transition-colors text-lg">
                Access Your Portal
              </button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
