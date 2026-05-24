import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useEffect } from 'react';

export default function ReceiptViewer() {
  const { id } = useParams<{ id: string }>();
  const { payments, user, isLoading, approvePayment, rejectPayment } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return null;

  const payment = payments.find((p) => p.id === id);

  if (!payment) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <span className="material-symbols-outlined text-slate-600 text-6xl mb-4 block">
            receipt_long
          </span>
          <h1 className="text-white text-2xl font-bold mb-2">Receipt Not Found</h1>
          <p className="text-slate-400 mb-6">The receipt you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-medium">Back</span>
          </button>
          <div className="border-l border-slate-700 pl-4">
            <h1 className="text-white font-semibold">Receipt Details</h1>
            <p className="text-slate-400 text-sm">{payment.courseName}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
              payment.status === 'Approved'
                ? 'bg-green-900/30 text-green-400 border border-green-800'
                : payment.status === 'Pending'
                ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'
                : 'bg-red-900/30 text-red-400 border border-red-800'
            }`}
          >
            {payment.status}
          </span>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Receipt Image */}
        <div className="flex-1 flex items-center justify-center p-8 bg-slate-900">
          {payment.receiptFile && payment.receiptFile.startsWith('data:') ? (
            <img
              src={payment.receiptFile}
              alt="Receipt"
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          ) : (
            <div className="text-center">
              <span className="material-symbols-outlined text-slate-600 text-6xl mb-4 block">
                description
              </span>
              <p className="text-slate-400">No receipt image available</p>
            </div>
          )}
        </div>

        {/* Payment Details Sidebar */}
        <aside className="w-full lg:w-96 bg-slate-800 border-t lg:border-t-0 lg:border-l border-slate-700 p-6 overflow-y-auto">
          <h2 className="text-white text-lg font-bold mb-6">Payment Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider">Student Name</label>
              <p className="text-white font-semibold mt-1">{payment.studentName}</p>
            </div>

            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider">Student ID</label>
              <p className="text-white font-semibold mt-1">{payment.studentId}</p>
            </div>

            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider">Contact</label>
              <p className="text-white font-semibold mt-1">{payment.contactNumber}</p>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <label className="text-slate-400 text-xs uppercase tracking-wider">Course</label>
              <p className="text-white font-semibold mt-1">{payment.courseName}</p>
            </div>

            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider">Department</label>
              <p className="text-white font-semibold mt-1">{payment.department}</p>
            </div>

            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider">Academic Year</label>
              <p className="text-white font-semibold mt-1">{payment.academicYear}</p>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <label className="text-slate-400 text-xs uppercase tracking-wider">Amount</label>
              <p className="text-white text-2xl font-bold mt-1">${payment.amount.toFixed(2)}</p>
            </div>

            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider">Transaction ID</label>
              <p className="text-white font-mono text-sm mt-1">{payment.transactionId}</p>
            </div>

            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider">Payment Date</label>
              <p className="text-white font-semibold mt-1">{payment.paymentDate}</p>
            </div>

            <div>
              <label className="text-slate-400 text-xs uppercase tracking-wider">Date Submitted</label>
              <p className="text-white font-semibold mt-1">{payment.dateSubmitted}</p>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <label className="text-slate-400 text-xs uppercase tracking-wider">Status</label>
              <p className={`font-bold text-lg mt-1 ${
                payment.status === 'Approved' ? 'text-green-400' :
                payment.status === 'Pending' ? 'text-yellow-400' :
                'text-red-400'
              }`}>
                {payment.status}
              </p>
            </div>
          </div>

          {/* Action Buttons for Admin */}
          {user?.role === 'admin' && payment.status === 'Pending' && (
            <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
              <button
                onClick={async () => approvePayment(payment.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Approve Payment</span>
              </button>
              <button
                onClick={async () => rejectPayment(payment.id)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">cancel</span>
                <span>Reject Payment</span>
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
