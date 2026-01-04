"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, ExternalLink, Sparkle } from "lucide-react";

const footerLinks = [
  {
    section: "Explore",
    items: [
      { label: "Projects", href: "#projects", badge: "10+" },
      { label: "Services", href: "#services", badge: "Expert" },
      { label: "Testimonials", href: "#testimonials", badge: "5.0★" },
    ],
  },
  {
    section: "Connect",
    items: [
      { label: "LinkedIn", href: "https://linkedin.com/in/aitzazhassan", external: true },
      { label: "GitHub", href: "https://github.com/aitzazhassan", external: true },
      { label: "Email", href: "mailto:aitzazhassan2005@gmail.com", external: true },
    ],
  },
];

const socialLinks = [
  { 
    platform: "GitHub", 
    href: "https://github.com/aitzazhassan", 
    icon: Github,
    metric: "50+ repos",
    color: "text-gray-400 hover:text-white"
  },
  { 
    platform: "LinkedIn", 
    href: "https://linkedin.com/in/aitzazhassan", 
    icon: Linkedin,
    metric: "500+ connections",
    color: "text-blue-400 hover:text-blue-300"
  },
  { 
    platform: "Email", 
    href: "mailto:aitzazhassan2005@gmail.com", 
    icon: Mail,
    metric: "24h response",
    color: "text-accent hover:text-accent-light"
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

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
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer 
      ref={footerRef} 
      className="relative pt-32 pb-12 overflow-hidden"
      onMouseLeave={() => setHoveredItem(null)}
    >
      {/* Minimal background - just a subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
      
      {/* Single subtle accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container-custom relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content - Single column for maximum clarity */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          {/* Signature */}
          <motion.div 
            variants={itemVariants}
            className="mb-16"
          >
            <div className="inline-block">
              <a 
                href="#hero" 
                className="group relative mb-4 inline-block"
                onMouseEnter={() => setHoveredItem("signature")}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-ayer-poster text-4xl md:text-5xl font-medium text-white tracking-tight">
                    Aitzaz Hassan
                  </span>
                  <motion.span
                    animate={{ rotate: hoveredItem === "signature" ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight size={24} />
                  </motion.span>
                </div>
                <AnimatePresence>
                  {hoveredItem === "signature" && (
                    <motion.div
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100%" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-accent to-transparent"
                    />
                  )}
                </AnimatePresence>
              </a>
              <p className="text-white/40 text-sm font-light max-w-md">
                Creative Full Stack Developer • Frontend Architect • Digital Experience Specialist
              </p>
            </div>
          </motion.div>

          {/* Links grid - Minimal 2 column layout */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-12 mb-20"
          >
            {footerLinks.map((section) => (
              <div key={section.section}>
                <h4 className="font-ayer-poster text-sm font-medium text-white/60 tracking-wider uppercase mb-6">
                  {section.section}
                </h4>
                <ul className="space-y-4">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={"external" in item && item.external ? "_blank" : undefined}
                        rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                        className="group flex items-center justify-between py-2 text-white/70 hover:text-white transition-colors duration-300"
                        onMouseEnter={() => setHoveredItem(item.label)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-light">{item.label}</span>
                          {"badge" in item && item.badge && (
                            <span className="text-xs px-2 py-0.5 bg-white/5 rounded-full text-white/40">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <AnimatePresence>
                            {hoveredItem === item.label && (
                              <motion.span
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 5 }}
                                className="text-xs text-accent"
                              >
                                {"external" in item && item.external ? "External" : "Navigate"}
                              </motion.span>
                            )}
                          </AnimatePresence>
                          <motion.span
                            animate={{ 
                              rotate: hoveredItem === item.label ? ("external" in item && item.external ? 45 : 0) : 0 
                            }}
                            className="text-white/30 group-hover:text-white"
                          >
                            {"external" in item && item.external ? (
                              <ExternalLink size={16} />
                            ) : (
                              <ArrowUpRight size={16} />
                            )}
                          </motion.span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Social connections - Horizontal with metrics */}
          <motion.div 
            variants={itemVariants}
            className="mb-16"
          >
            <h4 className="font-ayer-poster text-sm font-medium text-white/60 tracking-wider uppercase mb-8">
              Connect
            </h4>
            <div className="grid sm:grid-cols-3 gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-4 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 ${social.color}`}
                  onMouseEnter={() => setHoveredItem(`social-${social.platform}`)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <social.icon size={20} className="opacity-80" />
                    <motion.span
                      animate={{ rotate: hoveredItem === `social-${social.platform}` ? 45 : 0 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowUpRight size={16} />
                    </motion.span>
                  </div>
                  <div className="text-sm font-medium mb-1">{social.platform}</div>
                  <div className="text-xs opacity-50 font-light">{social.metric}</div>
                  
                  <AnimatePresence>
                    {hoveredItem === `social-${social.platform}` && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 border border-current rounded-xl -m-px"
                      />
                    )}
                  </AnimatePresence>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Availability status */}
          <motion.div 
            variants={itemVariants}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-sm text-accent font-medium">Available for select projects</span>
              </div>
              <Sparkle size={14} className="text-accent/60" />
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar - Ultra minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright - Minimal */}
            <div className="text-center md:text-left">
              <p className="text-xs text-white/30 font-light">
                © {new Date().getFullYear()} Aitzaz Hassan
                <span className="mx-2">•</span>
                All intellectual property
              </p>
            </div>

            {/* Tech stack indicator */}
            <div className="flex items-center gap-3">
              <div className="text-xs text-white/30 font-light tracking-wider">
                BUILT WITH
              </div>
              <div className="flex items-center gap-2">
                {["Next.js", "TS", "Motion"].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-white/5 rounded text-white/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Back to top - Subtle */}
            <a
              href="#hero"
              className="group flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors"
            >
              <span className="text-xs font-light tracking-wider">TOP</span>
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/30"
              >
                <ArrowUpRight size={12} className="rotate-90" />
              </motion.div>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Micro-interaction indicator */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 right-8 pointer-events-none"
          >
            <div className="text-xs text-white/30 font-mono tracking-wider">
              INTERACTION
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}