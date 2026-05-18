import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, register } = useApp();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Registration form state
  const [regName, setRegName] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(loginEmail, loginPassword);
    if (success) {
      // Check if admin or student
      if (loginEmail.includes('admin')) {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      setError('Invalid email or password');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!regName || !regStudentId || !regEmail || !regPassword) {
      setError('Please fill in all fields');
      return;
    }

    const success = await register(regName, regEmail, regPassword, regStudentId);
    if (success) {
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/student/dashboard'), 1500);
    } else {
      setError('Email already exists');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 text-white overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img src="/logo-rupp-1-1024x1024.png" alt="RUPP Logo" className="h-[600px] object-contain" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-slate-900/50 to-slate-900/90"></div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full size-10 shrink-0 border-2 border-white/20 bg-white">
            <img src="/logo-rupp-1-1024x1024.png" alt="RUPP Logo" className="size-8 object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight">RUPP Payment</span>
        </div>

        <div className="relative z-10 max-w-lg mb-12">
          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
            Manage your tuition payments securely.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8 font-body">
            The official portal for Royal University of Phnom Penh students to handle course
            payments, track history, and manage financial registration.
          </p>
          <ul className="space-y-4 font-body">
            <li className="flex items-center gap-3 text-slate-200">
              <div className="flex items-center justify-center size-6 rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <span>Secure Payment Processing</span>
            </li>
            <li className="flex items-center gap-3 text-slate-200">
              <div className="flex items-center justify-center size-6 rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <span>Instant Receipt Verification</span>
            </li>
            <li className="flex items-center gap-3 text-slate-200">
              <div className="flex items-center justify-center size-6 rounded-full bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
              <span>Academic History Tracking</span>
            </li>
          </ul>
        </div>

        <div className="relative z-10 text-sm text-slate-500 font-body">
          © 2024 Royal University of Phnom Penh. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-background-dark overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8 gap-3">
            <img
              src="/logo-rupp-1-1024x1024.png"
              alt="RUPP Logo"
              className="size-16 object-contain"
            />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">RUPP Portal</h2>
          </div>

          <div className="bg-white dark:bg-slate-800 lg:bg-transparent lg:dark:bg-transparent rounded-2xl lg:rounded-none shadow-xl lg:shadow-none border border-slate-200 lg:border-0 dark:border-slate-700 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 pb-4 text-center font-bold border-b-2 transition-all ${
                  isLogin
                    ? 'text-primary border-primary'
                    : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 pb-4 text-center font-bold border-b-2 transition-all ${
                  !isLogin
                    ? 'text-primary border-primary'
                    : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                Register
              </button>
            </div>

            {/* Login Form */}
            {isLogin ? (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="mt-2 text-slate-500 dark:text-slate-400 font-body">
                    Enter your credentials to access your dashboard.
                  </p>
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                      Demo Accounts:
                    </p>
                    <div className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                      <p>
                        <strong>Student:</strong> student@rupp.edu.kh / student123
                      </p>
                      <p>
                        <strong>Admin:</strong> admin@rupp.edu.kh / admin123
                      </p>
                    </div>
                  </div>
                </div>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
                  </div>
                )}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                      htmlFor="identity"
                    >
                      Email
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="material-symbols-outlined text-slate-400 text-[20px]">
                          badge
                        </span>
                      </div>
                      <input
                        className="block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white pl-10 h-12 focus:ring-primary focus:border-primary sm:text-sm placeholder:text-slate-400 transition-colors"
                        id="identity"
                        name="identity"
                        placeholder="student@rupp.edu.kh"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="material-symbols-outlined text-slate-400 text-[20px]">
                          lock
                        </span>
                      </div>
                      <input
                        className="block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white pl-10 h-12 focus:ring-primary focus:border-primary sm:text-sm placeholder:text-slate-400 transition-colors"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <button
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none transition-colors"
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? 'visibility' : 'visibility_off'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                      />
                      <label
                        className="ml-2 block text-sm text-slate-600 dark:text-slate-400 font-body"
                        htmlFor="remember-me"
                      >
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a
                        className="font-bold text-primary hover:text-blue-600 transition-colors"
                        href="#"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform active:scale-[0.98]"
                      type="submit"
                    >
                      <span>Sign In to Portal</span>
                      <span className="material-symbols-outlined text-[18px]">login</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              // Registration Form
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Create Account
                  </h2>
                  <p className="mt-2 text-slate-500 dark:text-slate-400 font-body">
                    Register as a new RUPP student to get started.
                  </p>
                </div>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-400">{error}</p>
                  </div>
                )}
                {success && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-800 dark:text-green-400">{success}</p>
                  </div>
                )}
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                      htmlFor="student-id"
                    >
                      Student ID
                    </label>
                    <input
                      className="block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary sm:text-sm placeholder:text-slate-400 transition-colors"
                      id="student-id"
                      placeholder="e.g. 102938"
                      type="text"
                      value={regStudentId}
                      onChange={(e) => setRegStudentId(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                      htmlFor="full-name"
                    >
                      Full Name
                    </label>
                    <input
                      className="block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary sm:text-sm placeholder:text-slate-400 transition-colors"
                      id="full-name"
                      placeholder="Enter your full name"
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      className="block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary sm:text-sm placeholder:text-slate-400 transition-colors"
                      id="email"
                      placeholder="student@rupp.edu.kh"
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2"
                      htmlFor="reg-password"
                    >
                      Password
                    </label>
                    <input
                      className="block w-full rounded-xl border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-primary focus:border-primary sm:text-sm placeholder:text-slate-400 transition-colors"
                      id="reg-password"
                      placeholder="••••••••"
                      type="password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <button
                      className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform active:scale-[0.98]"
                      type="submit"
                    >
                      <span>Create Account</span>
                      <span className="material-symbols-outlined text-[18px]">person_add</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="mt-10 relative">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-background-dark lg:bg-white lg:dark:bg-background-dark text-slate-500 dark:text-slate-400 font-body">
                  Need help?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/">
                <button
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-slate-400 text-[20px]">
                    arrow_back
                  </span>
                  <span>Back to Home</span>
                </button>
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500 font-body max-w-xs mx-auto">
            Protected by reCAPTCHA and subject to the RUPP{' '}
            <a className="underline hover:text-slate-600 dark:hover:text-slate-300" href="#">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a className="underline hover:text-slate-600 dark:hover:text-slate-300" href="#">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
