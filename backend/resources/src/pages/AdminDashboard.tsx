import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { user, payments, isLoading, approvePayment, rejectPayment, logout } = useApp();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'Pending' | 'Approved' | 'Rejected'>('all');

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      navigate('/login');
    } else if (user.role !== 'admin') {
      navigate('/student/dashboard');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user || user.role !== 'admin') {
    return null;
  }

  const handleApprove = async (id: string) => {
    await approvePayment(id);
  };

  const handleReject = async (id: string) => {
    await rejectPayment(id);
  };

  const viewReceipt = (payment: typeof filteredPayments[0]) => {
    if (payment.receiptFile) {
      // Navigate to receipt viewer page
      navigate(`/receipt/${payment.id}`);
    } else {
      alert('No receipt uploaded');
    }
  };

  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(p => p.status === filter);

  const pendingCount = payments.filter((p) => p.status === 'Pending').length;
  const rejectedCount = payments.filter((p) => p.status === 'Rejected').length;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark flex flex-col hidden md:flex z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border-2 border-primary/20">
            <img src="/logo-rupp-1-1024x1024.png" alt="RUPP Logo" className="size-8 object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">RUPP Admin</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Administrator</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              dashboard
            </span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <Link
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white shadow-md shadow-primary/20"
            to="/admin/dashboard"
          >
            <span className="material-symbols-outlined icon-fill">payments</span>
            <span className="text-sm font-medium">Payments</span>
          </Link>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              school
            </span>
            <span className="text-sm font-medium">Students</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">
              menu_book
            </span>
            <span className="text-sm font-medium">Courses</span>
          </a>
          <div className="pt-4 mt-4 border-t border-border-light dark:border-border-dark">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              System
            </p>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                bar_chart
              </span>
              <span className="text-sm font-medium">Reports</span>
            </a>
            <a
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
              href="#"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">
                settings
              </span>
              <span className="text-sm font-medium">Settings</span>
            </a>
          </div>
        </nav>
        <div className="p-4 border-t border-border-light dark:border-border-dark">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">school</span>
            <span className="font-bold">RUPP Admin</span>
          </div>
          <button className="text-slate-600 dark:text-slate-400">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  Payment Approvals
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Review student submissions and manage financial records.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm">
                  <span className="material-symbols-outlined text-[20px]">file_download</span>
                  <span>Export</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium shadow-md shadow-primary/20 transition-colors text-sm">
                  <span className="material-symbols-outlined text-[20px]">add</span>
                  <span>New Record</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Pending Approvals
                    </p>
                    <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
                      {pendingCount}
                    </h3>
                  </div>
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                    <span className="material-symbols-outlined">hourglass_top</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
                    <span className="material-symbols-outlined text-[16px] mr-0.5">
                      trending_up
                    </span>
                    12%
                  </span>
                  <span className="text-slate-400 ml-2">vs last week</span>
                </div>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Total Revenue
                    </p>
                    <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
                      ${(payments.reduce((sum, p) => sum + p.amount, 0)).toFixed(0)}
                    </h3>
                  </div>
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                    <span className="material-symbols-outlined">attach_money</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
                    <span className="material-symbols-outlined text-[16px] mr-0.5">
                      trending_up
                    </span>
                    8%
                  </span>
                  <span className="text-slate-400 ml-2">vs last month</span>
                </div>
              </div>
              <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark shadow-sm flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Rejected Requests
                    </p>
                    <h3 className="text-3xl font-bold mt-1 text-slate-900 dark:text-white">
                      {rejectedCount}
                    </h3>
                  </div>
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                    <span className="material-symbols-outlined">block</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-red-600 dark:text-red-400 font-medium flex items-center">
                    <span className="material-symbols-outlined text-[16px] mr-0.5">
                      trending_up
                    </span>
                    3%
                  </span>
                  <span className="text-slate-400 ml-2">vs last week</span>
                </div>
              </div>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-border-light dark:border-border-dark shadow-sm flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                  placeholder="Search by Student ID, Name, or Transaction Ref..."
                  type="text"
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                <select 
                  className="flex items-center gap-2 px-3 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-primary transition-colors whitespace-nowrap"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as any)}
                >
                  <option value="all">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-2 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:border-primary transition-colors whitespace-nowrap">
                  <span>Date:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">Last 30 Days</span>
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                </button>
              </div>
            </div>

            {/* Payment Table */}
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800 border-b border-border-light dark:border-border-dark">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Receipt
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {filteredPayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {payment.studentName}
                            </span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              {payment.studentId}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                          {payment.academicYear}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                          {payment.department}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                          ${payment.amount}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                          {payment.paymentDate}
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            onClick={() => viewReceipt(payment)}
                            className="flex items-center gap-1 text-sm text-primary hover:text-blue-600 font-medium transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              description
                            </span>
                            <span>View</span>
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          {payment.status === 'Pending' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                              Pending
                            </span>
                          )}
                          {payment.status === 'Approved' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              Approved
                            </span>
                          )}
                          {payment.status === 'Rejected' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                              Rejected
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {payment.status === 'Pending' && (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleApprove(payment.id)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-semibold transition-colors"
                              >
                                <span className="material-symbols-outlined text-[16px]">check</span>
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleReject(payment.id)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors"
                              >
                                <span className="material-symbols-outlined text-[16px]">close</span>
                                <span>Reject</span>
                              </button>
                            </div>
                          )}
                          {payment.status !== 'Pending' && (
                            <span className="text-sm text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredPayments.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-5xl mb-2 block">
                            inbox
                          </span>
                          <p className="text-slate-500 dark:text-slate-400">
                            No payments found matching your filters.
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
