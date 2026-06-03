import React from 'react'
import { company_logos } from '../assets/assets'
import { motion } from "framer-motion";

const TrustedBy = () => {
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
        We use mask-image to fade the edges. This works independently of the background color,
        completely resolving the white/dark block issue.
      */}
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)]">
        <motion.div 
          className="flex w-max"
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 16,
            repeat: Infinity,
          }}
        >
          {/* List 1 */}
          <div className="flex gap-16 sm:gap-24 items-center px-8 sm:px-12">
            {company_logos.map((logo, index) => {
              const isAirbnb = typeof logo === 'string' && logo.toLowerCase().includes('airbnb');
              
              return (
                <img
                  key={index} 
                  src={logo} 
                  alt="Partner Company Logo" 
                  className={`w-auto object-contain opacity-70 dark:opacity-60 hover:opacity-100 dark:hover:opacity-100 transition-opacity duration-300 shrink-0 ${
                    isAirbnb 
                      ? 'h-11 sm:h-14 mx-2'
                      : 'h-8 sm:h-10'
                  }`}
                />
              );
            })}
          </div>

          {/* List 2 */}
          <div className="flex gap-16 sm:gap-24 items-center px-8 sm:px-12">
            {company_logos.map((logo, index) => {
              const isAirbnb = typeof logo === 'string' && logo.toLowerCase().includes('airbnb');
              
              return (
                <img
                  key={index} 
                  src={logo} 
                  alt="Partner Company Logo" 
                  className={`w-auto object-contain opacity-70 dark:opacity-60 hover:opacity-100 dark:hover:opacity-100 transition-opacity duration-300 shrink-0 ${
                    isAirbnb 
                      ? 'h-11 sm:h-14 mx-2'
                      : 'h-8 sm:h-10'
                  }`}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default TrustedBy