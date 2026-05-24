import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useEffect } from 'react';

export default function StudentDashboard() {
  const { user, payments, isLoading, logout } = useApp();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user || user.role !== 'student') {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) return null;

  // Filter payments for current student
  const studentPayments = payments.filter((p) => p.studentId === user.studentId);

  // Calculate stats
  const totalPaid = studentPayments
    .filter((p) => p.status === 'Approved')
    .reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = studentPayments
    .filter((p) => p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);
  const rejectedAmount = studentPayments
    .filter((p) => p.status === 'Rejected')
    .reduce((sum, p) => sum + p.amount, 0);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const viewReceipt = (payment: typeof studentPayments[0]) => {
    if (payment.receiptFile) {
      // Navigate to receipt viewer page
      navigate(`/receipt/${payment.id}`);
    } else {
      alert('No receipt uploaded');
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-[#15202b] transition-colors duration-200 flex-shrink-0">
        <div className="flex h-full flex-col justify-between p-4">
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="flex items-center justify-center rounded-full h-10 w-10 border-2 border-primary/20 bg-white">
                <img src="/logo-rupp-1-1024x1024.png" alt="RUPP Logo" className="size-8 object-contain" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal">
                  {user.name}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                  ID: {user.studentId}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-2">
              <Link
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400"
                to="/student/dashboard"
              >
                <span className="material-symbols-outlined fill">dashboard</span>
                <span className="text-sm font-medium leading-normal">Dashboard</span>
              </Link>
              <Link
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                to="/student/payment"
              >
                <span className="material-symbols-outlined">credit_card</span>
                <span className="text-sm font-medium leading-normal">Make Payment</span>
              </Link>
              <a
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">person</span>
                <span className="text-sm font-medium leading-normal">Profile</span>
              </a>
              <a
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                href="#"
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="text-sm font-medium leading-normal">Settings</span>
              </a>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm font-medium leading-normal">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-light dark:bg-background-dark relative">
        <div className="h-full overflow-y-auto">
          <div className="container mx-auto max-w-[1200px] px-6 py-8 flex flex-col gap-8">
            {/* Page Heading */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">
                  Student Dashboard
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base font-normal">
                  Welcome back, {user.name}. Here is your payment overview.
                </p>
              </div>
              <Link to="/student/payment">
                <button className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg h-10 px-5 bg-primary hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors shadow-sm shadow-blue-500/30">
                  <span className="material-symbols-outlined text-[20px]">add_card</span>
                  <span className="truncate">Submit New Payment</span>
                </button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#15202b] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">payments</span>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                    Total Paid
                  </p>
                </div>
                <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  ${totalPaid}
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#15202b] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-yellow-500">pending</span>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                    Pending Approval
                  </p>
                </div>
                <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  ${pendingAmount}
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#15202b] border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-red-500">error</span>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wide">
                    Rejected
                  </p>
                </div>
                <p className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  ${rejectedAmount}
                </p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="w-full lg:w-96">
                <div className="flex w-full items-center rounded-lg h-10 bg-white dark:bg-[#15202b] border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <div className="text-slate-400 dark:text-slate-500 flex items-center justify-center pl-3">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="flex-1 w-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm h-full px-3"
                    placeholder="Search by course name..."
                  />
                </div>
              </div>
              {/* Filter Chips */}
              <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-hide">
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-200 dark:bg-slate-700 px-4 transition-colors hover:bg-slate-300 dark:hover:bg-slate-600">
                  <p className="text-slate-900 dark:text-white text-sm font-medium">All Years</p>
                  <span className="material-symbols-outlined text-[18px]">arrow_drop_down</span>
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border border-slate-200 dark:bg-[#15202b] dark:border-slate-700 px-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
                  <p className="text-slate-900 dark:text-white text-sm font-medium">2024</p>
                </button>
                <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white border border-slate-200 dark:bg-[#15202b] dark:border-slate-700 px-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
                  <p className="text-slate-900 dark:text-white text-sm font-medium">Pending</p>
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#15202b] shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Year
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Department
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Date Submitted
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Receipt
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {studentPayments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <span className="material-symbols-outlined text-slate-300 text-5xl">
                              receipt_long
                            </span>
                            <p className="text-slate-500 dark:text-slate-400">
                              No payments yet. Submit your first payment to get started.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      studentPayments.map((payment) => {
                        const getIconBg = (status: string) => {
                          if (status === 'Approved')
                            return 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400';
                          if (status === 'Pending')
                            return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
                          return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
                        };

                        return (
                          <tr
                            key={payment.id}
                            className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`h-8 w-8 rounded flex items-center justify-center ${getIconBg(
                                    payment.status
                                  )}`}
                                >
                                  <span className="material-symbols-outlined text-[18px]">
                                    school
                                  </span>
                                </div>
                                <div className="font-medium text-slate-900 dark:text-white">
                                  {payment.academicYear}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                              {payment.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                              {payment.dateSubmitted}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">
                              ${payment.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
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
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                  payment.status === 'Approved'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                    : payment.status === 'Pending'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
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
