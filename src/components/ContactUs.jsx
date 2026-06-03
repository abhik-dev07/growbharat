import React, { useState, useEffect, useRef } from "react";
import Title from "./Title";
import assets from "../assets/assets";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ContactUs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const dropdownRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const services = [
    { name: "App Development", icon: assets.ads_icon },
    { name: "Social Media Marketing", icon: assets.social_icon },
    { name: "SaaS Development", icon: assets.marketing_icon },
    { name: "Content Creation", icon: assets.content_icon }
  ];

  const selectedServiceObj = services.find(s => s.name === selectedService);
  const currentIcon = selectedServiceObj ? selectedServiceObj.icon : (assets.ads_icon || assets.person_icon);

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
        setSelectedService("");
        setName("");
        setEmail("");
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
          <div className="flex items-center pl-3 pr-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:bg-white dark:focus-within:bg-gray-950 transition-all duration-200 relative">
            <img src={assets.person_icon} alt="" className="w-4 h-4 opacity-60 dark:invert" />
            <input
              ref={nameRef}
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 text-sm bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
              required
            />
            {name && (
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
                onClick={() => {
                  setName("");
                  nameRef.current?.focus();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
              </button>
            )}
          </div>
        </div>

        {/* Email Input */}
        <div className="w-full">
          <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
            Email ID
          </label>
          <div className="flex items-center pl-3 pr-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 focus-within:border-indigo-500 dark:focus-within:border-indigo-400 focus-within:bg-white dark:focus-within:bg-gray-950 transition-all duration-200 relative">
            <img src={assets.email_icon} alt="" className="w-4 h-4 opacity-60 dark:invert" />
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 text-sm bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
              required
            />
            {email && (
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
                onClick={() => {
                  setEmail("");
                  emailRef.current?.focus();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
              </button>
            )}
          </div>
        </div>

        {/* Services Dropdown (Spans Full Width on Mobile, Grid Adaptive on Desktop) */}
        <div className="grid-cols-1 sm:col-span-2 w-full relative" ref={dropdownRef}>
          <label className="block mb-1.5 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
            Select Service
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full flex items-center justify-between p-3.5 pr-4 text-sm bg-gray-50/50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-950 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-950 transition-all duration-200 text-left cursor-pointer shadow-sm shadow-black/5 relative ${
                selectedService ? "pl-10" : "pl-4"
              }`}
            >
              {selectedService && (
                <img src={currentIcon} alt="" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-60 dark:invert" />
              )}
              <span className={selectedService ? "text-gray-900 dark:text-white" : "text-gray-400"}>
                {selectedService || "Choose a service"}
              </span>
              <svg 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <input type="hidden" name="service" value={selectedService} required />

            {/* Custom animated dropdown menu matching the premium design */}
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-[calc(100%+6px)] left-0 z-50 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-1 shadow-lg shadow-black/5 dark:shadow-black/30"
              >
                {services.map((service) => (
                  <button
                    key={service.name}
                    type="button"
                    onClick={() => {
                      setSelectedService(service.name);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <img src={service.icon} alt="" className="w-4 h-4 opacity-60 dark:invert" />
                      <span className="font-medium">{service.name}</span>
                    </div>
                    {selectedService === service.name && (
                      <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
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