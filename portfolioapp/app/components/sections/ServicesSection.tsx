"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Layout, 
  Server, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Zap,
  ChevronDown
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "High-performance applications with pixel-perfect implementation across all devices.",
    highlights: [
      "React & Next.js Expertise",
      "Performance Optimization",
      "Cross-browser Compatibility",
      "Responsive Web Apps"
    ],
    cta: "Build Your Frontend",
    color: "#1E4FA8",
    gradient: "from-blue-500/10 to-accent/5"
  },
   {
    icon: Zap,
    title: "Landing Page Design",
    description: "High-converting landing pages designed to capture leads and drive results.",
    highlights: [
      "Conversion-Focused Design",
      "A/B Testing Ready",
      "Fast Load Performance",
      "Mobile-First Approach"
    ],
    cta: "Launch Your Landing Page",
    color: "#EC4899",
    gradient: "from-pink-500/10 to-rose-500/5"
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description: "Intuitive experiences that convert visitors into customers.",
    highlights: [
      "User Experience Strategy",
      "Interactive Prototyping",
      "Conversion Optimization",
      "Design Systems"
    ],
    cta: "Design Your Experience",
    color: "#10B981",
    gradient: "from-emerald-500/10 to-green-500/5"
  },
  {
  icon: Server, // Already imported
  title: "Web Application Development",
  description: "Custom web applications tailored to your business needs and workflows.",
  highlights: [
    "Custom Business Logic",
    "Database Integration",
    "API Development",
    "Scalable Architecture"
  ],
  cta: "Build Your Web App",
  color: "#8B5CF6",
  gradient: "from-violet-500/10 to-purple-500/5"
},
];

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                           linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="container-custom relative z-10 max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-ayer-poster tracking-[0.2em] uppercase text-accent mb-6"
          >
            Expert Services
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-ayer-poster text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tighter mb-8"
          >
            <span className="block">Digital Solutions</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-accent">
              That Deliver Impact
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-white/60 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Focused on results-driven development that accelerates growth and enhances user engagement.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(isActive ? null : index)}
              >
                {/* Card */}
                <div className={`
                  relative p-6 md:p-8 rounded-2xl cursor-pointer transition-all duration-300 h-full flex flex-col
                  ${isActive 
                    ? 'bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10' 
                    : 'bg-white/[0.02] hover:bg-white/[0.04] border border-white/5'
                  }
                `}>
                  {/* Accent glow */}
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/5 to-transparent"
                    />
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300
                        ${isActive ? 'bg-white/[0.08] scale-110' : 'bg-white/[0.03]'}
                      `}>
                        <Icon className={`w-6 h-6 ${isActive ? 'text-accent' : 'text-white/60'}`} />
                      </div>
                      <h3 className={`font-ayer-poster text-xl md:text-2xl font-bold transition-colors
                        ${isActive ? 'text-white' : 'text-white/80'}`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    
                    <ChevronDown className={`
                      w-5 h-5 transition-all duration-300
                      ${isActive ? 'text-accent rotate-180' : 'text-white/40'}
                    `} />
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm md:text-base mb-6 leading-relaxed min-h-[3rem] md:min-h-[3.5rem]">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-white/10">
                          <div className="grid grid-cols-2 gap-3 mb-8">
                            {service.highlights.map((item, i) => (
                              <motion.div
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3 h-3 text-accent" />
                                </div>
                                <span className="text-white/80 text-sm">{item}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* CTA Button */}
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 
                                     border border-accent/20 text-white font-ayer-poster 
                                     tracking-wider uppercase text-sm hover:bg-accent/15 
                                     hover:border-accent/30 transition-all duration-300
                                     flex items-center justify-center gap-3"
                          >
                            {service.cta}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Hover effect */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300
                  ${isHovered && !isActive ? 'opacity-100' : ''}
                  bg-gradient-to-r from-accent/5 via-transparent to-transparent
                  -z-10
                `} />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col items-center gap-8">
            <div className="text-center flex flex-col items-center">
              <h3 className="font-ayer-poster text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Elevate Your Digital Presence?
              </h3>
              <p className="text-white/60 max-w-md mx-auto">
                Let's build something exceptional together
              </p>
            </div>
            
            <motion.a
              href="#contact"
              className="group relative inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-transparent border-2 border-accent hover:border-accent text-white font-ayer-poster font-medium text-base md:text-lg uppercase tracking-widest rounded-full transition-all duration-500 hover:bg-accent/10 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated background effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative">Start Your Project</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
            </motion.a>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-8 border-t border-white/10 w-full">
              {[
                { value: "95%", label: "Client Satisfaction" },
                { value: "10+", label: "Projects" },
                { value: "24/7", label: "Support" },
                { value: "<2s", label: "Avg. Load Time" }
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-ayer-poster text-2xl sm:text-3xl font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs tracking-widest uppercase text-white/40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </section>
  );
}