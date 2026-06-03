import React from "react";
import Title from "./Title";
import assets from "../assets/assets";
import { motion } from "framer-motion";

const OurWork = () => {
  const workData = [
    {
      title: "Paisa Track",
      description:
        "An intuitive and powerful expense tracking application designed to simplify personal asset and budget management.",
      image: assets.work_dashboard_management || "https://via.placeholder.com/600x400", 
    },
    {
      title: "EasyMyBook",
      description:
        "A comprehensive, real-time travel technology platform facilitating seamless flight, train, and cab bookings.",
      image: assets.work_mobile_app || "https://via.placeholder.com/400x800", // Tall vertical image
    },
    {
      title: "Sandbyte Studio",
      description:
        "A premium digital agency platform delivering professional web development, SEO optimization, and brand solutions.",
      image: assets.work_fitness_app || "https://via.placeholder.com/600x400",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="our-work"
      className="flex flex-col items-center gap-8 px-4 sm:px-12 lg:px-24 xl:px-40 pt-16 md:pt-24 text-gray-700 dark:text-white"
    >
      <Title
        title="Our latest work"
        desc="Browse our portfolio of innovative digital projects that showcase creativity, performance, and results."
      />

      {/* 
        FIX: Pinterest-style Masonry Layout
        Allows horizontal and vertical images to seamlessly sit together without clipping!
      */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full max-w-6xl mt-4 space-y-6 sm:space-y-0">
        {workData.map((work, index) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            key={index}
            className="break-inside-avoid mb-6 group cursor-pointer flex flex-col bg-white dark:bg-gray-950 p-3 rounded-2xl border border-gray-100 dark:border-gray-900 shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Image Wrapper - Keeps native height without any artificial cropping */}
            <div className="overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900">
              <img 
                src={work.image} 
                className="w-full h-auto object-contain group-hover:scale-103 duration-500 transition-all" 
                alt={work.title} 
              />
            </div>
            
            <div className="px-1">
              <h3 className="mt-4 mb-1 text-base md:text-lg font-bold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                {work.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {work.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-4"
      >
        <a
          href="https://play.google.com/store/apps/dev?id=7115211989220482623" // Replace with your actual portfolio domain link
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium tracking-wide text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-full shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 group"
        >
          View All Projects
          <svg
            className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
};

export default OurWork;