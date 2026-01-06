"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Add Ayer Poster font
    const style = document.createElement('style');
    style.textContent = `
      .font-ayer-poster {
        font-family: 'Ayer Poster', serif;
        // word-spacing: 0.25em;
        letter-spacing: 0.2em !important;
        // line-height: 1.2;
      }
    `;
    document.head.appendChild(style);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["hero", "about", "projects", "services", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      document.head.removeChild(style);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { href: "#about", label: "ABOUT" },
    { href: "#projects", label: "PROJECTS" },
    { href: "#services", label: "SERVICES" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={`fixed top-0 right-0 z-50 transition-all duration-500 px-4 sm:px-6 md:px-8 pt-6 md:pt-8 ${isScrolled ? "py-2" : "py-4"
          }`}
      > 
        <nav
          className={`flex justify-end items-center ${isScrolled
            ? "bg-white/5 backdrop-blur-xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            : "bg-transparent"
            } rounded-full transition-all duration-500`}
        >
          {/* Desktop Navigation Links - Right aligned */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 px-6 py-3">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => handleClick(link.href)}
                className={`relative px-4 py-2 transition-all duration-300 group font-ayer-poster tracking-[0.1em] uppercase text-lg wor ${activeLink === link.href.replace("#", "")
                  ? "text-accent"
                  : "text-white/80 hover:text-white"
                  }`}
              >
                {/* Hover background effect */}
                <span className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-all duration-300" />

                {/* Text with minimal effect */}
                <span className="relative z-10">
                  {link.label}
                </span>

                {/* Active indicator - simple dot */}
                {activeLink === link.href.replace("#", "") && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                  />
                )}
              </motion.button>
            ))}

            {/* Contact Button - Desktop */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => handleClick("#contact")}
              className="font-ayer-poster tracking-[0.1em] uppercase text-sm cursor-pointer bg-transparent border border-white/30 hover:border-accent px-6 py-3 rounded-full text-white hover:text-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,163,82,0.2)] ml-2"
            >
              WORK WITH ME
            </motion.button>
          </div>

          {/* Mobile Menu Button - Minimal design */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group hover:bg-white/15 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X size={20} className="text-white" />
              ) : (
                <Menu size={20} className="text-white" />
              )}
            </motion.div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay - Slides from left */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop with gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Container - Slides from left */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ 
                duration: 0.5, 
                ease: [0.22, 1, 0.36, 1] // Custom easing for smooth slide
              }}
              className="relative h-full w-full md:w-96 flex flex-col items-start justify-center pl-8 sm:pl-12 md:pl-16"
            >
              {/* Navigation Links - Stacked vertically with staggered animation */}
              <div className="space-y-8 mb-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ 
                      delay: 0.1 + index * 0.1, 
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                  >
                    <button
                      onClick={() => handleClick(link.href)}
                      className={` font-ayer-poster text-4xl md:text-5xl font-bold tracking-wider transition-all duration-300 hover:text-accent hover:translate-x-4 ${activeLink === link.href.replace("#", "")
                        ? "text-accent"
                        : "text-white/90"
                        }`}
                    >
                      {link.label}
                    </button>
                    
                    {/* Subtle separator for each link */}
                    {index <= navLinks.length - 1 && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.15 + index * 0.1, duration: 0.3 }}
                        className="h-px bg-white/10"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Contact Button - Mobile - Appears last */}
              <motion.button
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ 
                  delay: 0.4, 
                  duration: 0.4,
                  ease: "easeOut"
                }}
                onClick={() => handleClick("#contact")}
                className="mb-8 font-ayer-poster tracking-[0.1em] uppercase text-lg cursor-pointer bg-transparent border-2 border-white/40 hover:border-accent px-10 py-4 rounded-full text-white hover:text-accent transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,163,82,0.3)] group"
              >
                <span className="relative overflow-hidden block">
                  <span className="block group-hover:-translate-y-full transition-transform duration-300">
                   START A PROJECT
                  </span>
                  <span className="absolute top-full left-0 block group-hover:-translate-y-full transition-transform duration-300 text-accent">
                    START A PROJECT 
                  </span>
                </span>
              </motion.button>

              {/* Close hint - subtle text */}
              {/* <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="absolute bottom-8 left-8 text-white/40 text-sm tracking-wider uppercase  font-ayer-poster"
              >
                CLICK ANYWHERE TO CLOSE
              </motion.p> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}