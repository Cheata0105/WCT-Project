import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function PaymentSubmission() {
  const { user, isLoading, submitPayment } = useApp();
  const navigate = useNavigate();
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [studentId, setStudentId] = useState('');
  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [academicYear, setAcademicYear] = useState('Year 1 - Semester 1');
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentDate, setPaymentDate] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user || user.role !== 'student') {
      navigate('/login');
    } else {
      // Pre-fill form with user data
      setStudentId(user.studentId || '');
      setFullName(user.name);
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!studentId || !fullName || !contactNumber || !amount || !paymentDate) {
      alert('Please fill in all required fields');
      return;
    }

    if (!receiptFile) {
      alert('Please upload a receipt');
      return;
    }

    // Convert file to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      
      // Submit payment with base64 file
      try {
        await submitPayment({
          studentId,
          studentName: fullName,
          contactNumber,
          department,
          academicYear,
          amount: parseFloat(amount),
          transactionId: transactionId || `TXN-${Date.now()}`,
          paymentDate,
          courseName: `${department} - ${academicYear}`,
          receiptFile: base64String,
          status: 'Pending',
        });

        setSuccess(true);
        setTimeout(() => {
          navigate('/student/dashboard');
        }, 2000);
      } catch {
        alert('Payment submission failed. Please try again.');
      }
    };
    
    reader.readAsDataURL(receiptFile);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-full hidden md:flex shrink-0">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full size-12 shrink-0 border-2 border-slate-100 dark:border-slate-600 shadow-sm bg-white">
              <img src="/logo-rupp-1-1024x1024.png" alt="RUPP Logo" className="size-10 object-contain" />
            </div>
            <div className="flex flex-col overflow-hidden">
              <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight truncate">
                {user.name}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal truncate">
                ID: {user.studentId}
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <Link
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
            to="/student/dashboard"
          >
            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">
              dashboard
            </span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link
            className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/10 text-primary dark:text-primary-400"
            to="/student/payment"
          >
            <span className="material-symbols-outlined fill-1">credit_card</span>
            <span className="text-sm font-medium">Make Payment</span>
          </Link>
          <a
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">
              history
            </span>
            <span className="text-sm font-medium">Payment History</span>
          </a>
          <a
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">
              description
            </span>
            <span className="text-sm font-medium">Course Registration</span>
          </a>
        </nav>
        <div className="p-4 border-t border-slate-100 dark:border-slate-700/50">
          <a
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
            href="#"
          >
            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-hover:text-primary transition-colors">
              person
            </span>
            <span className="text-sm font-medium">Profile</span>
          </a>
          <Link
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
            to="/login"
          >
            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 group-hover:text-red-500 transition-colors">
              logout
            </span>
            <span className="text-sm font-medium">Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-8"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&h=100&fit=crop")',
              }}
            ></div>
            <span className="font-bold text-slate-900 dark:text-white">RUPP</span>
          </div>
          <button className="text-slate-500 dark:text-slate-400 p-1">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 scroll-smooth">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            {/* Page Header */}
            <div className="flex flex-col gap-2">
              <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black tracking-tight">
                Tuition Payment Submission
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                Fill in the details below and upload your receipt for verification.
              </p>
              {success && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-400 font-semibold">
                    ✓ Payment submitted successfully! Redirecting...
                  </p>
                </div>
              )}
            </div>

            {/* Main Form Card */}
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Side: Data Entry */}
                <div className="lg:col-span-8 p-6 md:p-8 flex flex-col gap-8 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700">
                  {/* Section 1: Student Identity */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <h3 className="text-slate-900 dark:text-white text-xl font-bold">
                        Student Identity
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <label className="flex flex-col gap-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          Student ID
                        </span>
                        <input
                          className="form-input w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                          placeholder="e.g., 102938"
                          type="text"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          Full Name
                        </span>
                        <input
                          className="form-input w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                          placeholder="Enter your full name"
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </label>
                      <label className="flex flex-col gap-2 md:col-span-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          Contact Number
                        </span>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            call
                          </span>
                          <input
                            className="form-input w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 pl-10 pr-4 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                            placeholder="012 345 678"
                            type="tel"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                          />
                        </div>
                      </label>
                    </div>
                  </section>

                  {/* Section 2: Payment Context */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined text-[20px]">school</span>
                      </div>
                      <h3 className="text-slate-900 dark:text-white text-xl font-bold">
                        Payment Context
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <label className="flex flex-col gap-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          Department
                        </span>
                        <select 
                          className="form-select w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          required
                        >
                          <option>Computer Science</option>
                          <option>Information Technology</option>
                          <option>International Relations</option>
                          <option>English Literature</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          Academic Year
                        </span>
                        <select 
                          className="form-select w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                          value={academicYear}
                          onChange={(e) => setAcademicYear(e.target.value)}
                          required
                        >
                          <option>Year 1 - Semester 1</option>
                          <option>Year 1 - Semester 2</option>
                          <option>Year 2 - Semester 1</option>
                          <option>Year 2 - Semester 2</option>
                          <option>Year 3 - Semester 1</option>
                          <option>Year 3 - Semester 2</option>
                          <option>Year 4 - Semester 1</option>
                          <option>Year 4 - Semester 2</option>
                        </select>
                      </label>
                    </div>
                  </section>

                  {/* Section 3: Transaction Details */}
                  <section>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined text-[20px]">
                          receipt_long
                        </span>
                      </div>
                      <h3 className="text-slate-900 dark:text-white text-xl font-bold">
                        Transaction Details
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <label className="flex flex-col gap-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          Amount Paid
                        </span>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">
                            $
                          </span>
                          <input
                            className="form-input w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 pl-8 pr-4 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                            placeholder="0.00"
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                          />
                        </div>
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          Transaction ID{' '}
                          <span className="text-slate-400 font-normal">(Optional)</span>
                        </span>
                        <input
                          className="form-input w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary placeholder:text-slate-400"
                          placeholder="TXN-123456"
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                      </label>
                      <label className="flex flex-col gap-2 md:col-span-2">
                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          Payment Date
                        </span>
                        <input
                          className="form-input w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary"
                          type="date"
                          value={paymentDate}
                          onChange={(e) => setPaymentDate(e.target.value)}
                          required
                        />
                      </label>
                    </div>
                  </section>
                </div>

                {/* Right Side: Receipt Upload */}
                <div className="lg:col-span-4 p-6 md:p-8 flex flex-col gap-6 bg-slate-50 dark:bg-slate-900">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="bg-primary/10 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined text-[20px]">upload_file</span>
                      </div>
                      <h3 className="text-slate-900 dark:text-white text-xl font-bold">
                        Upload Receipt
                      </h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Upload a clear image or PDF of your payment receipt
                    </p>
                  </div>

                  {/* Upload Area */}
                  <div className="flex flex-col gap-4">
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 cursor-pointer hover:border-primary transition-colors bg-white dark:bg-slate-800 min-h-[300px]">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                      />
                      <div className="flex flex-col items-center gap-4 text-center">
                        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-3xl">
                            cloud_upload
                          </span>
                        </div>
                        {receiptFile ? (
                          <>
                            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                              <span className="material-symbols-outlined text-green-600">
                                check_circle
                              </span>
                              <span className="font-medium">{receiptFile.name}</span>
                            </div>
                            <p className="text-sm text-slate-500">Click to change file</p>
                          </>
                        ) : (
                          <>
                            <div className="text-slate-700 dark:text-slate-300">
                              <span className="font-semibold text-primary">Click to upload</span> or
                              drag and drop
                            </div>
                            <p className="text-sm text-slate-500">PNG, JPG or PDF (max. 10MB)</p>
                          </>
                        )}
                      </div>
                    </label>

                    {/* Notes */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex gap-3">
                        <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-[20px]">
                          info
                        </span>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                            Receipt Guidelines
                          </p>
                          <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                            <li>• Ensure all text is clearly visible</li>
                            <li>• Include transaction date and amount</li>
                            <li>• File size should not exceed 10MB</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="border-t border-slate-200 dark:border-slate-700 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-900">
                <Link to="/student/dashboard">
                  <button type="button" className="flex items-center gap-2 px-6 py-3 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    <span className="font-medium">Back to Dashboard</span>
                  </button>
                </Link>
                <div className="flex gap-3">
                  <button type="button" className="px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    Save Draft
                  </button>
                  <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-md shadow-primary/30 transition-colors">
                    <span>Submit Payment</span>
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
