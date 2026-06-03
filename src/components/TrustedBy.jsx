import React from 'react'
import { company_logos } from '../assets/assets'
import { motion } from "framer-motion";

const TrustedBy = () => {
  {/* 
    FIX: If you only have 3 logos, duplicating once isn't enough to fill the track.
    Multiplying by 4 ensures a seamless, infinite ribbon loop with zero visual snapping gaps.
  */}
  const marqueeLogos = [...company_logos, ...company_logos, ...company_logos, ...company_logos];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }} 
      className='flex flex-col items-center py-12 md:py-16 w-full text-gray-700 dark:text-white/80 overflow-hidden'
    >
      <motion.h3 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className='font-bold text-xs sm:text-sm tracking-widest text-gray-400 dark:text-gray-500 mb-8 text-center px-4 uppercase'
      >
        Trusted by Leading Companies
      </motion.h3>

      {/* 
        FIX: Marquee width is now constrained to be VERY SMALL.
        `max-w-xs` on mobile, `max-w-md` on tablet, and `max-w-xl` on desktop. 
      */}
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-12 before:bg-gradient-to-r before:from-white before:to-transparent dark:before:from-gray-950 after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent dark:after:from-gray-950">
        
        <motion.div 
          className="flex gap-16 sm:gap-24 items-center whitespace-nowrap w-max px-4"
          animate={{ x: [0, "-25%"] }} // Adjusted to -25% matching our 4x array multiplier loop
          transition={{
            ease: "linear",
            duration: 12, // Faster speed baseline since the physical track length is now very narrow
            repeat: Infinity,
          }}
        >
          {marqueeLogos.map((logo, index) => {
            const isAirbnb = typeof logo === 'string' && logo.toLowerCase().includes('airbnb');
            
            return (
              <img
                key={index} 
                src={logo} 
                alt="Partner Company Logo" 
                className={`w-auto object-contain opacity-70 dark:opacity-60 hover:opacity-100 dark:hover:opacity-100 transition-opacity duration-300 shrink-0 ${
                  isAirbnb 
                    ? 'h-11 sm:h-14 mx-2' // Premium standout sizing for Airbnb
                    : 'h-8 sm:h-10'        // Big scaling for your other two assets
                }`}
              />
            );
          })}
        </motion.div>

      </div>
    </motion.div>
  )
}

export default TrustedBy