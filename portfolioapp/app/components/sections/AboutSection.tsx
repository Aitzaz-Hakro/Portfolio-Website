"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, ArrowUpRight, Sparkle, Code, Palette, Zap, Target } from "lucide-react";

const expertise = [
  {
    icon: Code,
    title: "Frontend Architecture",
    description: "Scalable component systems & performance optimization",
    metric: "40% faster load times",
    color: "text-blue-400",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User-centered design with conversion optimization",
    metric: "2.5x engagement boost",
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "Technical Leadership",
    description: "Team mentoring & technical strategy development",
    metric: "10+ projects led",
    color: "text-purple-400",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-32 overflow-hidden"
      onMouseLeave={() => setHoveredElement(null)}
    >
      {/* Ultra-minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      
      {/* Single accent line for visual anchor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container-custom relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-20 items-center"
        >
          
          {/* Left Column - Text Content */}
          <div>
            {/* Minimal label */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-px bg-accent/40" />
                <span className="text-xs font-ayer-poster tracking-[0.3em] uppercase text-white/40">
                  About
                </span>
              </div>
            </motion.div>

            {/* Name & Title */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 
                id="about-heading"
                className="font-ayer-poster text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight mb-4"
              >
                Aitzaz Hassan
              </h1>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                </div>
                <p className="text-white/80 text-lg font-light">
                  Creative Full Stack Developer
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="space-y-6">
                <p className="text-white/70 leading-relaxed font-light text-lg">
                  I bridge the gap between <span className="text-white ">aesthetic vision</span> and 
                  <span className="text-white font-"> technical execution</span>, creating digital experiences 
                  that are both beautiful and performant.
                </p>
                <p className="text-white/50 leading-relaxed font-light">
                  With expertise across the full stack, I specialize in building scalable applications 
                  that deliver measurable business results through thoughtful architecture and user-centered design.
                </p>
              </div>
            </motion.div>

            {/* Expertise Grid */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {expertise.map((item) => (
                  <div
                    key={item.title}
                    className="group relative p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors duration-300"
                    onMouseEnter={() => setHoveredElement(item.title)}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <item.icon size={20} className={`${item.color} opacity-80`} />
                      <AnimatePresence>
                        {hoveredElement === item.title && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-xs text-accent"
                          >
                            {item.metric}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <h3 className="text-sm font-medium text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-white/40 font-light">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Actions */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <a
                href="/resume.pdf"
                download
                aria-label="Download resume PDF"
                className="group relative inline-flex items-center gap-3 px-6 py-3 text-sm text-white bg-white/5 border border-white/10 rounded-full hover:border-accent/40 transition-all duration-300"
                onMouseEnter={() => setHoveredElement("resume")}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <Download size={16} className="opacity-60 group-hover:opacity-100" />
                <span className="font-light">Resume</span>
                <ArrowUpRight 
                  size={14} 
                  className="opacity-0 group-hover:opacity-100 transition-opacity" 
                />
              </a>
              
              <a
                href="#projects"
                className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-light"
                onMouseEnter={() => setHoveredElement("projects")}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <span>View Projects</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Column - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mb-20"
            onMouseEnter={() => setHoveredElement("profile")}
            onMouseLeave={() => setHoveredElement(null)}
          >
            {/* Minimal frame */}
            <div className="relative">
              {/* Image container */}
              <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                <Image
                  src="/profile.png"
                  alt="Portrait of Aitzaz Hassan, Creative Full Stack Developer"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                {/* Hover overlay */}
                <AnimatePresence>
                  {hoveredElement === "profile" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Status indicator */}
              <div className="absolute -top-3 -right-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs text-accent font-medium">Available</span>
                </div>
              </div>

              {/* Stats overlay - appears on hover */}
              <AnimatePresence>
                {hoveredElement === "profile" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5"
                  >
                    <div className="grid grid-cols-3 gap-4 p-4  backdrop-blur-md border border-white/10 rounded-xl">
                      {[
                        { value: "2+", label: "Years" },
                        { value: "50+", label: "Projects" },
                        { value: "100%", label: "Satisfaction" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-accent">{stat.value}</div>
                          <div className="text-xs text-white/40">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Background decorative element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 blur-3xl" />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom divider */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: "100%" } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>

      {/* Micro-interaction indicator */}
      <AnimatePresence>
        {hoveredElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 right-8 pointer-events-none"
          >
            <div className="text-xs text-white/30 font-mono tracking-wider">
              {hoveredElement.toUpperCase()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}