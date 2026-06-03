import React, { useState, useEffect } from "react";
import assets from "../assets/assets";
import ThemeToggleBtn from "./ThemeToggleBtn";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent background content scrolling when menu is active
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [sidebarOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-between items-center px-6 sm:px-12 lg:px-24 xl:px-40 py-2 sticky top-0 z-40 backdrop-blur-xl font-medium bg-white/70 dark:bg-gray-900/70 border-b border-gray-100 dark:border-gray-800/50"
      >
        {/* Logo */}
        <img
          src={theme === "dark" ? assets.logo_dark : assets.logo}
          alt="logo"
          className="h-8 sm:h-16 relative z-50"
        />

        {/* Desktop-Only Navigation Links */}
        <div className="hidden sm:flex items-center gap-8 text-gray-700 dark:text-gray-200 text-sm">
          <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a>
          <a href="#services" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Services</a>
          <a href="#our-work" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Our Work</a>
          <a href="#contact-us" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Us</a>
        </div>

        {/* Action Controls Side */}
        <div className="flex items-center gap-3 sm:gap-4 relative z-50">
          <ThemeToggleBtn theme={theme} setTheme={setTheme} />

          {/* Contact Button (Desktop) */}
          <a
            href="#contact-us"
            className="text-sm hidden sm:flex items-center gap-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-6 py-2 rounded-full font-medium hover:scale-105 transition-all duration-300 shadow-sm"
          >
            Contact <img src={assets.arrow_icon} className="w-3.5 dark:invert-100" alt="arrow" />
          </a>

          {/* Premium Hamburger Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 sm:hidden focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className={`h-0.5 w-6 bg-gray-800 dark:bg-white rounded transition-all duration-300 ease-out transform ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-6 bg-gray-800 dark:bg-white rounded transition-all duration-300 ease-out ${sidebarOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`h-0.5 w-6 bg-gray-800 dark:bg-white rounded transition-all duration-300 ease-out transform ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </motion.div>

      {/* 
        PREMIUM FULL SCREEN MOBILE OVERLAY NAVIGATION
        Uses Framer Motion AnimatePresence for flawless fade/slide transitions
      */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-2xl z-30 sm:hidden flex flex-col justify-center items-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex flex-col items-center gap-8 text-center"
            >
              <a 
                onClick={() => setSidebarOpen(false)} 
                href="#" 
                className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Home
              </a>
              <a 
                onClick={() => setSidebarOpen(false)} 
                href="#services" 
                className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Services
              </a>
              <a 
                onClick={() => setSidebarOpen(false)} 
                href="#our-work" 
                className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Our Work
              </a>
              <a 
                onClick={() => setSidebarOpen(false)} 
                href="#contact-us" 
                className="text-2xl font-bold tracking-wide text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Contact Us
              </a>

              <a
                onClick={() => setSidebarOpen(false)}
                href="#contact-us"
                className="mt-4 flex items-center gap-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-8 py-3 rounded-full font-semibold text-base shadow-lg"
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;