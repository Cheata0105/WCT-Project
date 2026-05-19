import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent successfully! We will get back to you soon.');
    setFormData({ fullName: '', email: '', department: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="bg-white dark:bg-card-dark w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] transition-colors duration-300 border border-gray-100 dark:border-gray-700">
          {/* Form Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="sr-only">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="department" className="sr-only">
                  Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Department"
                  required
                  className="block w-full px-4 py-3 rounded-md border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  required
                  rows={5}
                  className="block w-full px-4 py-3 rounded-md border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm resize-none"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
            <img
              src="/RUPP-Cambodia-AIR.jpg.webp"
              alt="RUPP Campus Aerial View"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-6 left-6 z-20 hidden md:block">
              <p className="text-white text-sm font-medium opacity-90 drop-shadow-md">
                Royal University of Phnom Penh
              </p>
              <p className="text-white text-xs opacity-75 drop-shadow-md">
                Aerial Campus View
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
