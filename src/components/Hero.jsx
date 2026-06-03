import React, { useEffect, useRef } from 'react'
import assets from '../assets/assets'
import { motion, useScroll, useTransform } from "framer-motion";

// Custom Ambient 3D Particle Canvas for deep background layer
const Ambient3DBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 2 + 0.5; // Depth factor
        this.radius = Math.random() * 3 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx * this.z;
        this.y += this.vy * this.z;

        // Screen wrapping loops
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * this.z, 0, Math.PI * 2);
        // Uses native CSS variable mapping for text theme synchronization
        const isDark = document.documentElement.classList.contains('dark');
        ctx.fillStyle = isDark 
          ? `rgba(141, 140, 234, ${this.alpha * 0.6})` 
          : `rgba(80, 68, 229, ${this.alpha * 0.3})`;
        ctx.shadowBlur = this.z * 4;
        ctx.shadowColor = isDark ? '#5044E5' : '#4d8cea';
        ctx.fill();
      }
    }

    const init = () => {
      resizeCanvas();
      particles = Array.from({ length: 45 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full z-0" />;
};

const Hero = () => {
  const containerRef = useRef(null);
  
  // Real 3D Parallax tracking logic on screen scroll bounds
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);

  return (
    <div 
      ref={containerRef}
      id='hero' 
      className='relative flex flex-col items-center gap-6 pt-28 pb-20 md:pt-40 md:pb-32 px-4 sm:px-12 lg:px-24 xl:px-40 text-center w-full overflow-hidden bg-white dark:bg-gray-950 text-gray-800 dark:text-white transition-colors duration-500'
    >
      {/* 3D Kinetic Mesh Canvas Component Injection */}
      <Ambient3DBackground />

      {/* Cybernetic Geometric Grid Background Effect Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Hero Core Content Stack Container */}
      <motion.div style={{ y: textY }} className="flex flex-col items-center gap-6 z-10 max-w-5xl">
        
        {/* Dynamic Glowing Trust Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="inline-flex items-center gap-2 border border-gray-200/80 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-1.5 pr-5 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
        >
          <div className="relative flex items-center">
            <img className='w-16 sm:w-20 object-contain rounded-full' src={assets.group_profile} alt="Trusted Users Profiles" />
            <span className="absolute -right-1 top-0 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <p className='text-[11px] sm:text-xs font-semibold tracking-wider text-gray-600 dark:text-gray-300 uppercase'>Trusted by 10k+ users</p>
        </motion.div>

        {/* Cinematic Staggered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.2 }}
          className='text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-extrabold tracking-tight leading-[1.1] xl:leading-[92px]'
        >
          Turning imagination into{" "}
          <span className='relative bg-gradient-to-r from-[#5044E5] via-[#7c72f1] to-[#4d8cea] bg-clip-text text-transparent inline-block font-black'>
            digital
            <span className="absolute bottom-1 left-0 w-full h-[4px] bg-gradient-to-r from-[#5044E5] to-[#4d8cea] opacity-30 rounded-full blur-[1px]" />
          </span>{" "}
          impact.
        </motion.h1>

        {/* Fluid Subtext Descriptor */}
        <motion.p 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.35 }}
          className='text-sm sm:text-base md:text-xl font-medium text-gray-500 dark:text-gray-400 max-w-[90%] sm:max-w-2xl leading-relaxed'
        >
          Creating meaningful connections and turning big ideas into interactive digital experiences.
        </motion.p>
      </motion.div>

      {/* 3D Perspective Graphic Showcase Stage */}
      <motion.div 
        style={{ y: imageY, rotateX: imageRotate }}
        initial={{ opacity: 0, y: 60, scale: 0.95, perspective: 1200 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 14, delay: 0.5 }}
        className="relative w-full max-w-5xl mt-8 z-10 pointer-events-auto group perspective-1200"
      >
        {/* Ambient Outer Under-Glow Neon aura */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#5044E5] to-[#4d8cea] rounded-xl md:rounded-2xl opacity-15 dark:opacity-25 blur-xl group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

        {/* Showcase Core Mockup Window Frame */}
        <div className="relative overflow-hidden rounded-xl md:rounded-2xl border border-gray-200/60 dark:border-gray-800/80 bg-white dark:bg-gray-950 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.6)] backdrop-blur-sm transform transition-transform duration-500 ease-out group-hover:scale-[1.005]">
          {/* Subtle Glass Highlight Overlay Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />
          
          <img 
            src={assets.hero_img} 
            alt="Product Platform Showcase Dashboard" 
            className='w-full h-auto object-cover block'
          />
        </div>

        {/* Auxiliary Vector Asset - Clean Fallback integration */}
        <img 
          src={assets.bgImage1} 
          alt="" 
          className='absolute -top-32 -right-32 sm:-top-80 sm:-right-60 z-[-2] dark:hidden hidden sm:block pointer-events-none opacity-50' 
        />
      </motion.div>
    </div>
  )
}

export default Hero