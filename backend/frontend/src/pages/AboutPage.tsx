import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark">
      <Header />
      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full max-w-[1200px] px-4 md:px-10 py-8">
          {/* Hero Banner */}
          <div
            className="relative flex min-h-[360px] flex-col gap-6 overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat p-8 items-center justify-center text-center shadow-lg"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url("/RUPP-Cambodia-AIR.jpg.webp")',
            }}
          >
            <div className="flex flex-col gap-4 max-w-[800px]">
              <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                About RUPP Payment
              </h1>
              <h2 className="text-white text-lg md:text-xl font-normal leading-relaxed opacity-90">
                Streamlining tuition payments and record-keeping for the Royal University of Phnom
                Penh.
              </h2>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="w-full bg-background-light dark:bg-background-dark py-12 px-4 md:px-10">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0d141b] dark:text-white">
                Our Mission & Vision
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <div className="flex-1 bg-white dark:bg-[#1a2632] rounded-xl p-8 flex flex-col items-center text-center shadow-sm border border-[#e7edf3] dark:border-gray-700 min-h-[320px]">
                <div className="size-24 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-5xl">
                    rocket_launch
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  To provide a simple, secure, and efficient payment tracking system for students,
                  faculty, and administration at RUPP. We aim to modernize administrative workflows
                  and enhance the overall educational experience.
                </p>
              </div>
              <div className="flex-1 bg-white dark:bg-[#1a2632] rounded-xl p-8 flex flex-col items-center text-center shadow-sm border border-[#e7edf3] dark:border-gray-700 min-h-[320px]">
                <div className="size-24 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-5xl">
                    visibility
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                  To become the most reliable digital platform for managing payments at
                  universities, ensuring transparency, user convenience, and a paperless environment
                  for higher education institutions in Cambodia.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="w-full bg-background-light dark:bg-background-dark py-12 px-4 md:px-10 mb-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#0d141b] dark:text-white">Meet the Team</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <div className="flex-1 bg-white dark:bg-[#1a2632] rounded-xl p-8 flex flex-col items-center text-center shadow-sm border border-[#e7edf3] dark:border-gray-700 max-w-sm">
                <div
                  className="size-28 rounded-full bg-gray-200 overflow-hidden mb-4 border-4 border-white dark:border-gray-600 shadow-md"
                  style={{
                    backgroundImage:
                      'url("/298a16c6b6503d7e5591bfce1924c9d2.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <h4 className="text-lg font-bold text-[#0d141b] dark:text-white">
                  Nam Kimhorng
                </h4>
                <p className="text-primary font-medium text-sm mt-1">
                  Project Lead & Developer
                </p>
              </div>
              <div className="flex-1 bg-white dark:bg-[#1a2632] rounded-xl p-8 flex flex-col items-center text-center shadow-sm border border-[#e7edf3] dark:border-gray-700 max-w-sm">
                <div
                  className="size-28 rounded-full bg-gray-200 overflow-hidden mb-4 border-4 border-white dark:border-gray-600 shadow-md"
                  style={{
                    backgroundImage:
                      'url("/3ed36e2197d625d16790add7e6a56472.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <h4 className="text-lg font-bold text-[#0d141b] dark:text-white">
                  Chin Socheata
                </h4>
                <p className="text-primary font-medium text-sm mt-1">UI/UX Designer & Developer</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
