import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ContactUs = () => {
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://formspree.io/f/meedyyqa", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast.success("Thank you for your submission!");
        event.target.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          toast.error(data.errors.map(err => err.message).join(", "));
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1 }}
      id="contact-us"
      className="flex flex-col items-center gap-6 sm:gap-8 px-4 sm:px-12 lg:px-24 xl:px-40 pt-20 md:pt-30 text-gray-700 dark:text-white w-full"
    >
      <Title
        title="Reach out to us"
        desc="Ready to grow your brand? Let’s connect and build something exceptional together."
      />

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        onSubmit={onSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 max-w-2xl w-full mt-2"
      >
        {/* Name Input */}
        <div className="w-full">
          <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
            Your Name
          </label>
          <div className="flex items-center pl-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:bg-white dark:focus-within:bg-gray-950 transition-all duration-200">
            <img src={assets.person_icon} alt="" className="w-4 h-4 opacity-60 dark:invert" />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full p-3 text-sm bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
              required
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="w-full">
          <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
            Email ID
          </label>
          <div className="flex items-center pl-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:bg-white dark:focus-within:bg-gray-950 transition-all duration-200">
            <img src={assets.email_icon} alt="" className="w-4 h-4 opacity-60 dark:invert" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 text-sm bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
              required
            />
          </div>
        </div>

        {/* Services Dropdown (Spans Full Width on Mobile, Grid Adaptive on Desktop) */}
        <div className="grid-cols-1 sm:col-span-2 w-full">
          <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
            Select Service
          </label>
          <div className="flex items-center pl-3 pr-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:bg-white dark:focus-within:bg-gray-950 transition-all duration-200">
            {/* Using standard menu/ads icon fallback dynamically */}
            <img src={assets.ads_icon || assets.person_icon} alt="" className="w-4 h-4 opacity-60 dark:invert" />
            <select
              name="service"
              className="w-full p-3 text-sm bg-transparent outline-none text-gray-900 dark:text-white cursor-pointer appearance-none"
              required
              defaultValue=""
            >
              <option value="" disabled hidden>Choose a service</option>
              <option value="App Development" className="dark:bg-gray-950 text-gray-900 dark:text-white">App Development</option>
              <option value="Social Media Marketing" className="dark:bg-gray-950 text-gray-900 dark:text-white">Social Media Marketing</option>
              <option value="SaaS Development" className="dark:bg-gray-950 text-gray-900 dark:text-white">SaaS Development</option>
              <option value="Content Creation" className="dark:bg-gray-950 text-gray-900 dark:text-white">Content Creation</option>
            </select>
            {/* Premium custom arrow indicator drop icon */}
            <div className="pointer-events-none pr-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="grid-cols-1 sm:col-span-2 w-full">
          <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
            Message
          </label>
          <textarea
            rows={5}
            name="message"
            placeholder="Enter your message..."
            className="w-full p-3 text-sm bg-gray-50/50 dark:bg-gray-900/50 outline-none rounded-xl border border-gray-200 dark:border-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-950 text-gray-900 dark:text-white placeholder-gray-400 transition-all duration-200 resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="grid-cols-1 sm:col-span-2 flex justify-start sm:justify-start mt-2">
          <button
            type="submit"
            className="w-full sm:w-max flex items-center justify-center gap-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-sm font-semibold px-8 py-3.5 rounded-3xl cursor-pointer hover:scale-102 active:scale-98 transition-all duration-200 shadow-md"
          >
            Send Message
            <img src={assets.arrow_icon} alt="" className="w-3.5 dark:invert-100 sm:dark:invert-100" />
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ContactUs;