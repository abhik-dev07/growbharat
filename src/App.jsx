import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustedBy from './components/TrustedBy'
import Services from './components/Services'
import OurWork from './components/OurWork'
import Teams from './components/Teams'
import ContactUs from './components/ContactUs'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import { ReactLenis } from "lenis/react";

const getInitialTheme = () => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme)
  const [showCustomCursor, setShowCustomCursor] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const lenisRef = useRef();

  useEffect(() => {
    let rafId;

    function update(time) {
      lenisRef.current?.lenis?.raf(time);
      rafId = requestAnimationFrame(update);
    }

    rafId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkDesktop = () => {
      return window.innerWidth >= 1024 && window.matchMedia("(pointer: fine)").matches;
    };

    const handleResize = () => {
      if (!checkDesktop()) {
        setShowCustomCursor(false);
      }
    };

    window.addEventListener('resize', handleResize);

    const handleFirstMove = () => {
      if (checkDesktop()) {
        setShowCustomCursor(true);
      }
      window.removeEventListener('mousemove', handleFirstMove);
    };

    window.addEventListener('mousemove', handleFirstMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleFirstMove);
    };
  }, []);

  useEffect(() => {
    if (showCustomCursor) {
      document.body.classList.add('custom-cursor-active');
    } else {
      document.body.classList.remove('custom-cursor-active');
    }
    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, [showCustomCursor]);

  const dotRef = useRef(null)
  const outlineRef = useRef(null)

  // Refs for custom cursor position tracking 
  const mouse = useRef({x: 0, y: 0})
  const position = useRef({x: 0, y: 0})

  useEffect(() => {
    const handelMouseMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer');
      setIsHovering(!!isInteractive);
    }

    document.addEventListener('mousemove', handelMouseMove)
    document.addEventListener('mouseover', handleMouseOver)

    let animationFrameId;
    const animate = () => {
      position.current.x += (mouse.current.x - position.current.x) * 0.15
      position.current.y += (mouse.current.y - position.current.y) * 0.15

      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`
        outlineRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      document.removeEventListener('mousemove', handelMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  useEffect(() => {
    if (!showCustomCursor) return;

    // Snaps the position immediately on mount to prevent sliding from top-left (0,0)
    if (dotRef.current && outlineRef.current) {
      dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`
      outlineRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`
      position.current.x = mouse.current.x;
      position.current.y = mouse.current.y;
    }

    const timer = setTimeout(() => {
      if (dotRef.current && outlineRef.current) {
        dotRef.current.style.opacity = "1";
        outlineRef.current.style.opacity = "1";
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [showCustomCursor]);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
      }}
    >
      <div className="relative bg-white dark:bg-black transition-colors">
        <Toaster />
        <Navbar theme={theme} setTheme={setTheme} />
        <Hero />
        <TrustedBy />
        <Services />
        <OurWork />
        <Teams />
        <ContactUs />
        <Footer theme={theme} />
      </div>

      {showCustomCursor && createPortal(
        <>
          {/* Custom Cursor Ring Wrapper */}
          <div 
            ref={outlineRef} 
            style={{ opacity: 0 }}
            className="fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-300"
          >
            <div className={`h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary transition-all duration-300 ${
              isHovering ? "scale-150 bg-primary/10 border-primary" : "scale-100"
            }`} />
          </div>
          
          {/* Custom Cursor Dot Wrapper */}
          <div 
            ref={dotRef}  
            style={{ opacity: 0 }}
            className="fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-300"
          >
            <div className={`h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 ${
              isHovering ? "scale-75 opacity-50" : "scale-100"
            }`} />
          </div>
        </>,
        document.body
      )}
    </ReactLenis>
  )
}

export default App
