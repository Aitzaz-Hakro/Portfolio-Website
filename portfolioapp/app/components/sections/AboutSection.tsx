"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";

// Animation variants for staggered text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [imageHover, setImageHover] = useState(false);

  // Scroll-based fade animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Gradient background matching hero section */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(30, 30, 40, 0.8) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 0% 50%, rgba(20, 20, 30, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(20, 20, 30, 0.4) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0f 0%, #0d0d14 30%, #0a0a0f 100%)
          `,
        }}
      />

      {/* Decorative SVG Background for Profile */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 z-0 hidden lg:block">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 600"
          className="text-accent"
        >
          <defs>
            <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.05" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
            </linearGradient>
            <pattern
              id="gridPattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          
          {/* Concentric circles */}
          <circle cx="300" cy="300" r="280" fill="none" stroke="url(#circleGradient)" strokeWidth="1" />
          <circle cx="300" cy="300" r="220" fill="none" stroke="url(#circleGradient)" strokeWidth="1" />
          <circle cx="300" cy="300" r="160" fill="none" stroke="url(#circleGradient)" strokeWidth="1" />
          
          {/* Grid overlay */}
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>
      </div>

      <motion.div
        style={{ opacity, scale, y }}
        className="container-custom relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-left"
          >
            {/* Subtle label with hero section styling */}
            <motion.span
              variants={itemVariants}
              className="inline-block text-xs font-ayer-poster tracking-[0.2em] uppercase text-accent mb-8"
            >
              Introduction
            </motion.span>

            {/* Main heading with hero typography */}
            <motion.h2
              id="about-heading"
              variants={itemVariants}
              className="mb-8"
            >
              <span className="block font-ayer-poster text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tighter">
                Creative
              </span>
              <span className="block font-ayer-poster text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tighter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-accent">
                  Developer
                </span>
                <span className="text-white/60">.</span>
              </span>
            </motion.h2>

            {/* Description paragraphs with improved readability */}
            <motion.div
              variants={itemVariants}
              className="space-y-6 max-w-xl mb-10"
            >
              <p className="text-lg text-white/80 leading-relaxed font-light">
                I'm <span className="text-white font-medium">Aitzaz Hassan</span>, a creative full-stack developer specializing in 
                <span className="text-white font-normal"> frontend architecture</span> and creating 
                <span className="text-white font-normal"> immersive digital experiences</span>.
              </p>

              <p className="text-base text-white/60 leading-relaxed font-light">
                With a background in both design and development, I bridge the gap between 
                <em className="text-white/70 not-italic font-normal"> aesthetic vision</em> and 
                <em className="text-white/70 not-italic font-normal"> technical execution</em>, 
                ensuring every project delivers exceptional user experiences through clean code and thoughtful design.
              </p>
            </motion.div>

            {/* Resume button with hero styling */}
            <motion.div
              variants={itemVariants}
              className="mb-16"
            >
              <motion.a
                href="/resume.pdf"
                download
                aria-label="Download my resume as PDF"
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-transparent border-2 border-accent/60 rounded-full hover:border-accent text-white font-ayer-poster font-medium text-base uppercase tracking-widest  transition-all duration-500 hover:bg-accent/10 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated background effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <Download 
                  size={20} 
                  className="transition-all duration-300 group-hover:-translate-y-0.5"
                />
                <span className="relative">Download Resume</span>
              </motion.a>
            </motion.div>

            {/* Quick stats row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-xl"
            >
              {[
                { value: "2+", label: "Years Experience" },
                { value: "10+", label: "Projects Delivered" },
                { value: "8+", label: "Satisfied Clients" },
              ].map((stat, index) => (
                <div key={stat.label} className="text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="font-ayer-poster text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="text-xs tracking-[0.15em] uppercase text-white/40 mt-2 font-medium"
                  >
                    {stat.label}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Section with transparent background support */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative flex justify-center lg:justify-start"
          >
            <div
              ref={imageWrapperRef}
              className="relative"
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              {/* SVG frame with gradient */}
              <svg
                className="absolute inset-0 w-full h-full z-0"
                width="420"
                height="420"
                viewBox="0 0 420 420"
              >
                <defs>
                  <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="accent" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="accent" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {/* Animated frame */}
                <motion.circle
                  cx="210"
                  cy="210"
                  r="200"
                  fill="none"
                  stroke="url(#frameGradient)"
                  strokeWidth="2"
                  filter="url(#glow)"
                  animate={{
                    strokeDasharray: imageHover ? ["0 1256", "1256 0"] : ["1256 0", "0 1256"],
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{
                    strokeDasharray: "1256",
                    strokeDashoffset: "1256",
                  }}
                />
                
                {/* Decorative dots */}
                <circle cx="210" cy="50" r="2" fill="accent" opacity="0.6" />
                <circle cx="370" cy="210" r="2" fill="accent" opacity="0.6" />
                <circle cx="210" cy="370" r="2" fill="accent" opacity="0.6" />
                <circle cx="50" cy="210" r="2" fill="accent" opacity="0.6" />
              </svg>

              {/* Profile image with transparent background support */}
                <motion.div
                className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden bg-transparent"
                animate={{
                  y: imageHover ? -15 : 0,
                  rotate: imageHover ? 3 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{
                  boxShadow: `
                  0 20px 60px rgba(245, 163, 82, 0.25),
                  0 10px 30px rgba(255, 255, 255, 0.52),
                  0 0 0 2px rgba(245, 163, 82, 0.15),
                  inset 0 0 40px rgba(245, 163, 82, 0.1)
                  `,
                }}
                >
                {/* Background gradient for transparent images */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f] opacity-80" />
                
                <Image
                  src="/profile.png"
                  alt="Portrait photo of Aitzaz Hassan, creative full-stack developer"
                  fill
                  className="object-contain object-center mix-blend-normal"
                  sizes="(max-width: 768px) 320px, 384px"
                  priority
                />
                
                {/* Subtle overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent/80 via-transparent to-transparent"
                  animate={{ opacity: imageHover ? 0.4 : 0 } }
                  transition={{ duration: 0.4 }}
                />
                </motion.div>

              {/* Floating badge */}
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-br from-accent to-accent/60 text-white text-xs font-ayer-poster font-bold px-4 py-2 rounded-full z-10"
                animate={{
                  y: imageHover ? -8 : 0,
                  rotate: imageHover ? 5 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  boxShadow: "0 5px 20px rgba(245, 245, 245, 0.3)",
                }}
              >
                AVAILABLE
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Section bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
    </section>
  );
}