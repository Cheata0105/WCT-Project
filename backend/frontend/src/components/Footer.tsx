export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e7edf3] dark:border-gray-700 bg-background-light dark:bg-background-dark py-12 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-4 max-w-[300px]">
          <div className="flex items-center gap-2 text-[#0d141b] dark:text-white">
            <img src="/logo-rupp-1-1024x1024.png" alt="RUPP Logo" className="size-6 object-contain" />
            <span className="font-bold text-lg">RUPP Payment</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Russian Federation Blvd (110), Toul Kork, Phnom Penh, Cambodia.
          </p>
          <div className="flex gap-4">
            <a className="text-gray-400 hover:text-primary" href="#">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a className="text-gray-400 hover:text-primary" href="#">
              <span className="material-symbols-outlined">mail</span>
            </a>
            <a className="text-gray-400 hover:text-primary" href="#">
              <span className="material-symbols-outlined">call</span>
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 md:gap-24">
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#0d141b] dark:text-white">Navigation</h4>
            <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">
              Home
            </a>
            <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">
              About Us
            </a>
            <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">
              Courses
            </a>
            <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">
              Contact
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#0d141b] dark:text-white">Resources</h4>
            <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">
              Payment Guide
            </a>
            <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">
              FAQ
            </a>
            <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">
              Student Portal
            </a>
            <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">
              Support
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[#0d141b] dark:text-white">Legal</h4>
            <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">
              Privacy Policy
            </a>
            <a className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2024 Royal University of Phnom Penh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
