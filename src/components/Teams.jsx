import React from "react";
import Title from "./Title";
import { motion } from "framer-motion";

const Teams = () => {
  // Hardcoded team data based on your request
  const teamData = [
    { name: "Vivek", title: "Founder & Fullstack Dev", image: "https://www.sandbyte.site/assets/karan.svg" },
    { name: "Abhik", title: "Head of Development", image: "https://www.sandbyte.site/assets/marcel.svg" },
    { name: "Ankan", title: "Marketing & Lead Expert", image: "https://www.sandbyte.site/assets/vishesh.svg" },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-col items-center gap-8 px-4 sm:px-12 lg:px-24 xl:px-40 pt-16 md:pt-24 text-gray-800 dark:text-white"
    >
      <Title
        title="Meet the team"
        desc="A passionate team of digital experts dedicated to your brand’s success."
      />

      {/* Grid: 2 columns on mobile for a tighter, cleaner UI; scales up on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl">
        {teamData.map((team, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            key={index}
            className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-3 sm:gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md shadow-gray-100/50 dark:shadow-none hover:scale-105 transition-all duration-300"
          >
            <img 
              src={team.image} 
              className="w-14 h-14 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-800" 
              alt={team.name} 
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm sm:text-base truncate">{team.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{team.title}</p>
            </div>
          </motion.div>
        ))}

        {/* "Expanding Soon" Placeholder Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: teamData.length * 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-3 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 generic-card"
        >
          <div className="w-14 h-14 sm:w-12 sm:h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl text-gray-400">
            +
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-500 dark:text-gray-400">Expanding Soon</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">We are growing!</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Teams;