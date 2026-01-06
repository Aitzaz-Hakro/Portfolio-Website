"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Download, ArrowUpRight, Palette, Zap, LucideIcon } from "lucide-react";

type ExpertiseItem = {
  icon?: LucideIcon;
  customIcon?: string;
  title: string;
  description: string;
  metric: string;
  color: string;
};

const expertise: ExpertiseItem[] = [
  {
    customIcon: "/icons/extension.png",
    title: "Frontend Development",
    description: "Designing scalable component systems with peak performance optimization",
    metric: "40% faster load times",
    color: "text-blue-400",
  },
  {
    customIcon: "/icons/user-experience.png",
    title: "UI/UX Design",
    description: "Crafting intuitive, conversion-focused user interfaces",
    metric: "2.5x engagement boost",
    color: "text-accent",
  },
  {
    customIcon: "/icons/team-leader.png",
    title: "Technical Leadership",
    description: "Guiding teams & driving full-stack project success",
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
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-32 overflow-hidden"
      onMouseLeave={() => setHoveredElement(null)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container-custom relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 mb-20 gap-20 items-center"
        >
          {/* Left Column - Text Content */}
          <div>
            <motion.div variants={itemVariants} className="mb-12">
              <div className="inline-flex items-center gap-3">
                <div className="w-8 h-px bg-accent/40" />
                <span className="text-xs font-ayer-poster tracking-[0.3em] uppercase text-white/40">
                  About Me
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h1
                id="about-heading"
                className="font-ayer-poster text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight mb-4"
              >
                Aitzaz Hassan
              </h1>
              <div className="flex items-center gap-3">
                <Image
                  src="/icons/focus1.png"
                  alt="Focus"
                  width={20}
                  height={20}
                  className="opacity-80"
                />
                <p className="text-white/80 text-lg font-light">
                  Frontend-Focused Full Stack Developer
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12">
              <div className="space-y-6">
                <p className="text-white/70 leading-relaxed font-light text-lg">
                  I design and build <span className="text-white font-semibold">high-performance web applications</span> where <span className="text-white font-semibold">visual clarity</span> meets <span className="text-white font-semibold">clean, scalable architecture</span>.
                </p>
                <p className="text-white/50 leading-relaxed font-light">
                  As a full-stack developer with a <span className="text-white font-semibold">frontend-first mindset</span>, I focus on speed, accessibility, and <span className="text-white font-semibold">SEO-ready experiences</span> that convert users into customers.
                </p>
                <p className="text-white/50 leading-relaxed font-light">
                  Every product I build is optimized for <span className="text-white font-semibold">real-world performance</span>, <span className="text-white font-semibold">responsive UX</span>, and <span className="text-white font-semibold">measurable business outcomes</span>.
                </p>
              </div>
            </motion.div>

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
                      {item.customIcon ? (
                        <Image
                          src={item.customIcon}
                          alt={item.title}
                          width={20}
                          height={20}
                          className="opacity-80"
                        />
                      ) : item.icon ? (
                        <item.icon size={20} className={`${item.color} opacity-80`} />
                      ) : null}
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

            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <motion.a
                href="/resume.pdf"
                download
                aria-label="Download resume PDF"
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-accent hover:border-accent text-white font-ayer-poster font-medium text-sm uppercase tracking-widest rounded-full transition-all duration-500 hover:bg-accent/10 overflow-hidden"
                onMouseEnter={() => setHoveredElement("resume")}
                onMouseLeave={() => setHoveredElement(null)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Animated background effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <span className="relative">Download Resume</span>
                <Download className="w-4 h-4 transition-all duration-300 group-hover:translate-y-1 group-hover:scale-110" />
              </motion.a>

              <a
                href="#projects"
                className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-light"
                onMouseEnter={() => setHoveredElement("projects")}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <span>See My Projects</span>
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
            <div className="relative">
                <div className="relative aspect-[3/4] max-w-md mx-auto overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                <Image
                  src="/profile.png"
                  alt="Portrait of Aitzaz Hassan, Frontend-Focused Full Stack Developer"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />


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

              <div className="absolute -top-3 -right-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs text-accent font-medium">Available</span>
                </div>
              </div>

              <AnimatePresence>
                {hoveredElement === "profile" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5"
                  >
                    <div className="grid grid-cols-3 gap-4 p-4 backdrop-blur-md border border-white/10 rounded-xl">
                      {[
                        { value: "2+", label: "Years Experience" },
                        { value: "50+", label: "Projects Delivered" },
                        { value: "100%", label: "Client Satisfaction" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-accent">
                            {stat.value}
                          </div>
                          <div className="text-xs text-white/40">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 blur-3xl" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: "100%" } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>

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
