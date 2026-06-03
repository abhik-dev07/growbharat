import React from 'react'
import assets from '../assets/assets'
import Title from './Title'
import ServicesCard from './ServicesCard'
import { motion } from "framer-motion";

const Services = () => {

    const servicesData = [
        {
            title: 'App Development',
            description: 'High-performance iOS & Android apps built for native scalability.',
            icon: assets.ads_icon 
        },
        {
            title: 'Social Marketing',
            description: 'Tailored strategies to elevate engagement and brand growth.',
            icon: assets.social_icon
        },
        {
            title: 'SaaS Solutions',
            description: 'Cloud-based software-as-a-service platforms engineered with secure data layers.',
            icon: assets.marketing_icon 
        },
        {
            title: 'Content Creation',
            description: 'Compelling digital media narratives and high-converting brand copy.',
            icon: assets.content_icon
        }
    ]

  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{once: true}}
      transition={{staggerChildren: 0.05}} // Faster cascade on mobile screen loads
      id='services' 
      className='relative flex flex-col items-center gap-6 sm:gap-8 px-4 sm:px-12 lg:px-24 xl:px-40 pt-12 md:pt-24 text-gray-700 dark:text-white w-full'
    >
      {/* Background shape safety block */}
      <img src={assets.bgImage2} alt="" className='absolute -top-110 -left-70 z-1 dark:hidden hidden sm:block pointer-events-none' />

      <div className="z-10 text-center items-center justify-center w-full">
        <Title title='How can we help?' desc='From strategy to execution, we craft digital solutions that move your business forward.' />
      </div>

      {/* 
        FIXED GRID: 
        - Uses 2 columns on mobile (`grid-cols-2`) so cards stay compact side-by-side.
        - Scales to standard spacing on larger screens.
      */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6 w-full max-w-5xl z-10 px-1 sm:px-0">
        {servicesData.map((service, index)=>(
            <div key={index} className="flex flex-col items-center text-center p-3 sm:p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-sm">
                {/* Responsive Icon wrapper */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800/50 mb-3">
                    <img src={service.icon} alt="" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                </div>
                {/* Clean, auto-wrapped typography targets */}
                <h3 className="text-xs sm:text-base font-bold tracking-tight mb-1 line-clamp-1 w-full text-gray-900 dark:text-white">
                    {service.title}
                </h3>
                <p className="text-[10px] sm:text-sm text-gray-400 dark:text-gray-400 leading-normal line-clamp-3 sm:line-clamp-none">
                    {service.description}
                </p>
            </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Services