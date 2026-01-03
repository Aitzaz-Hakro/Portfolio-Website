


"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#services", label: "Services" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] md:w-auto ${isScrolled ? "py-2 md:py-3" : "py-4 md:py-6"
          }`}
      >
        <nav
          className={`flex justify-center items-center h-14 md:h-16 px-5 md:px-10 gap-3 md:gap-8 lg:gap-10 text-white text-base md:text-lg rounded-full transition-all duration-500 ${isScrolled
            ? "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            : "bg-white/5 backdrop-blur-sm border border-white/10"
            }`}
        >
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className={`relative px-3 py-2 transition-all duration-300 group ${activeLink === link.href.replace("#", "")
                  ? "text-primary"
                  : "text-white/70 hover:text-white"
                  }`}
              >
                {/* Hover background glow */}
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-all duration-300" />

                {/* Text with slide effect */}
                <span className="relative z-10 overflow-hidden block">
                  <span className="block group-hover:-translate-y-full transition-transform duration-300 ease-out">
                    {link.label}
                  </span>
                  <span className="absolute top-full left-0 block group-hover:-translate-y-full transition-transform duration-300 ease-out text-primary">
                    {link.label}
                  </span>
                </span>

                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent transition-all duration-300 ${activeLink === link.href.replace("#", "")
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                    }`}
                />
              </motion.a>
            ))}
          </div>

          {/* Contact Button - Desktop */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => handleClick("#contact")}
            className="hidden md:block cursor-pointer bg-gradient-to-b from-primary to-primary/80 shadow-[0px_4px_32px_0_rgba(245,163,82,.50)] px-8 py-3 rounded-xl border-[1px] border-primary/50 text-black text-base font-semibold group overflow-hidden hover:shadow-[0px_4px_48px_0_rgba(245,163,82,.70)] transition-shadow duration-300"
          >
            <div className="relative overflow-hidden h-6">
              <p className="group-hover:-translate-y-8 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                CONTACT ME
              </p>
              <p className="absolute top-8 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                CONTACT ME
              </p>
            </div>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group hover:bg-white/20 transition-all duration-300"
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-full flex flex-col items-center justify-center gap-8"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(link.href);
                  }}
                  className={`text-3xl font-bold tracking-wide transition-all duration-300 hover:text-primary hover:scale-110 ${activeLink === link.href.replace("#", "")
                    ? "text-primary"
                    : "text-white/80"
                    }`}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Contact Button - Mobile */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                onClick={() => handleClick("#contact")}
                className="mt-4 cursor-pointer bg-gradient-to-b from-primary to-primary/80 shadow-[0px_4px_32px_0_rgba(245,163,82,.50)] px-8 py-3 rounded-xl border-[1px] border-primary/50 text-black font-medium text-lg group overflow-hidden"
              >
                <div className="relative overflow-hidden h-6">
                  <p className="group-hover:-translate-y-8 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    CONTACT ME
                  </p>
                  <p className="absolute top-8 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
                    CONTACT ME
                  </p>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
