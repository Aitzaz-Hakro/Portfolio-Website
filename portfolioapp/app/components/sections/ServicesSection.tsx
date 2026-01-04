"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticWrapper } from "@/app/components/ui/MagneticWrapper";
import { Code2, Layout, Server, Sparkles, ArrowRight, CheckCircle, Zap, Target, Users, Clock, Shield, BarChart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "I build high-performance web applications that engage users and drive business growth. From sleek landing pages to complex web apps, I ensure pixel-perfect implementation across all devices.",
    features: [
      { text: "Responsive Web Applications", icon: CheckCircle },
      { text: "React & Next.js Development", icon: Zap },
      { text: "Performance Optimization", icon: Target },
      { text: "Cross-browser Compatibility", icon: CheckCircle },
    ],
    benefits: [
      "Increase user engagement by 40%+",
      "Improve conversion rates",
      "Reduce bounce rates significantly",
      "Enhanced brand credibility"
    ],
    color: "accent",
    gradient: "from-blue-400/20 to-accent/10",
  },
  {
    icon: Server,
    title: "Backend Solutions",
    description: "Scalable server architecture that grows with your business. I create robust APIs, efficient databases, and cloud infrastructure that ensures reliability and security.",
    features: [
      { text: "API Development & Integration", icon: Zap },
      { text: "Database Architecture", icon: Target },
      { text: "Cloud Deployment (AWS/Azure)", icon: Shield },
      { text: "Real-time Functionality", icon: CheckCircle },
    ],
    benefits: [
      "99.9% uptime guarantee",
      "Scalable infrastructure",
      "Enhanced data security",
      "Future-proof architecture"
    ],
    color: "#1E4FA8",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description: "I craft intuitive user experiences that convert visitors into customers. Using data-driven design principles, I create interfaces that are both beautiful and functional.",
    features: [
      { text: "User Experience Strategy", icon: Users },
      { text: "Interactive Prototyping", icon: Target },
      { text: "Conversion Optimization", icon: BarChart },
      { text: "Design System Creation", icon: CheckCircle },
    ],
    benefits: [
      "Higher user satisfaction",
      "Improved conversion paths",
      "Reduced development costs",
      "Consistent brand experience"
    ],
    color: "#10b981",
    gradient: "from-emerald-500/20 to-green-500/10",
  },
  {
    icon: Sparkles,
    title: "Digital Transformation",
    description: "I help businesses modernize their digital presence with cutting-edge technologies, ensuring they stay competitive in today's fast-paced market.",
    features: [
      { text: "Technology Stack Migration", icon: Zap },
      { text: "Progressive Web Apps", icon: Clock },
      { text: "Digital Strategy Consulting", icon: Target },
      { text: "Performance Analytics", icon: BarChart },
    ],
    benefits: [
      "Future-ready solutions",
      "Competitive advantage",
      "Operational efficiency",
      "Innovation leadership"
    ],
    color: "#8b5cf6",
    gradient: "from-purple-500/20 to-violet-500/10",
  },
];

interface ServiceAccordionProps {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

function ServiceAccordion({ service, index, isActive, onSelect }: ServiceAccordionProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);
  
  const Icon = service.icon;

  // Animate content height
  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isActive ? "auto" : 0,
        opacity: isActive ? 1 : 0,
        duration: 0.6,
        ease: "power2.out",
        onStart: () => {
          if (isActive && contentRef.current) {
            contentRef.current.style.overflow = "hidden";
          }
        },
        onComplete: () => {
          if (!isActive && contentRef.current) {
            contentRef.current.style.overflow = "hidden";
          } else if (contentRef.current) {
            contentRef.current.style.overflow = "visible";
          }
        }
      });
    }
  }, [isActive]);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative border-l-2 transition-all duration-500 ${
        isActive 
          ? 'border-accent bg-gradient-to-r from-white/5 to-transparent' 
          : 'border-white/10 hover:border-white/20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Active indicator line */}
      {isActive && (
        <motion.div
          layoutId="serviceActive"
          className="absolute -left-[2px] top-0 h-full w-0.5 bg-gradient-to-b from-accent to-transparent"
        />
      )}

      {/* Service header */}
      <button
        onClick={onSelect}
        className="w-full text-left p-8 relative group"
      >
        <div className="flex items-start justify-between gap-6">
          {/* Left side - Icon and title */}
          <div className="flex items-start gap-6">
            <motion.div
              animate={{ 
                scale: isActive ? 1.1 : isHovered ? 1.05 : 1,
                rotate: isActive ? 5 : isHovered ? 3 : 0
              }}
              transition={{ duration: 0.3 }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden ${
                isActive ? 'bg-gradient-to-br from-white/10 to-white/5' : 'bg-white/5'
              }`}
            >
              {/* Background gradient */}
              <div 
                className={`absolute inset-0 opacity-20 ${service.gradient}`}
              />
              
              {/* Icon */}
              <Icon 
                size={28} 
                className={`relative z-10 ${
                  isActive ? 'text-accent' : 'text-white/60'
                }`}
              />
              
              {/* Hover/active glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                animate={{
                  boxShadow: isActive 
                    ? `0 0 40px ${service.color}40` 
                    : isHovered 
                      ? `0 0 20px ${service.color}20`
                      : 'none'
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Title and description preview */}
            <div>
              <h3 className={`font-ayer-poster text-2xl md:text-3xl font-bold mb-3 transition-colors ${
                isActive ? 'text-white' : 'text-white/80'
              }`}>
                {service.title}
              </h3>
              <p className={`text-white/60 text-sm max-w-xl transition-all ${
                isActive ? 'opacity-100' : 'opacity-70'
              }`}>
                {service.description.substring(0, 80)}...
              </p>
            </div>
          </div>

          {/* Right side - Arrow indicator */}
          <motion.div
            animate={{ rotate: isActive ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded-full ${
              isActive ? 'bg-accent/20' : 'bg-white/5'
            }`}
          >
            <ArrowRight 
              size={20} 
              className={isActive ? 'text-accent' : 'text-white/40'} 
            />
          </motion.div>
        </div>
      </button>

      {/* Expandable content */}
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="px-8 pb-8 ml-24">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Features */}
            <div>
              <h4 className="font-ayer-poster text-lg font-bold text-white mb-6 tracking-wider">
                KEY FEATURES
              </h4>
              <ul className="space-y-4">
                {service.features.map((feature, i) => (
                  <motion.li
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isActive ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="flex items-start gap-3 pt-1 group/feature"
                  > 
                    <div className={`p-1 rounded-full ${service.gradient} bg-opacity-20`}>
                      <feature.icon size={14} className="text-accent" />
                    </div>
                    <span className="text-white/80 text-sm group-hover/feature:text-white transition-colors">
                      {feature.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Business Benefits */}
            <div>
              <h4 className="font-ayer-poster text-lg font-bold text-white mb-6 tracking-wider">
                BUSINESS IMPACT
              </h4>
              <ul className="space-y-4 mb-8">
                {service.benefits.map((benefit, i) => (
                  <motion.li
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isActive ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3 group/benefit"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-white/80 text-sm group-hover/benefit:text-white transition-colors">
                      {benefit}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={isActive ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className=" w-full py-4 bg-gradient-to-r from-[#1E4FA8]/20 to-[#1E4FA8]/10 border border-accent/30 rounded-xl text-white font-ayer-poster tracking-wider uppercase text-sm hover:from-[#1E4FA8]/30 hover:to-[#1E4FA8]/20 hover:border-[#1E4FA8]/50 transition-all duration-300 group/cta"
              >
                <span className="flex items-center justify-center gap-3">
                  Start Your Project
                  <ArrowRight size={16} className="group-hover/cta:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(0);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -80]);

  // Title animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.fromTo(
          chars,
          { 
            y: 100, 
            opacity: 0,
            rotateX: -45 
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.05,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background matching hero section */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(30, 30, 40, 0.9) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 0% 50%, rgba(20, 20, 30, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(20, 20, 30, 0.5) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0f 0%, #0d0d14 30%, #0a0a0f 100%)
          `,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#1E4FA8]/5 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl opacity-20" />

      <motion.div 
        style={{ opacity, scale, y }}
        className="container-custom relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div ref={titleRef} className="mb-16 md:mb-24 text-center flex flex-col items-center">
          {/* Subtle label */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-xs font-ayer-poster tracking-[0.2em] uppercase text-accent mb-8"
          >
            My Services
          </motion.span>

          {/* Main title with character animation */}
          <h2 className="font-ayer-poster text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-6">
            <span className="inline-block overflow-hidden">
              <span className="char inline-block">Solutions</span>
            </span>
            <br />
            <span className="inline-block overflow-hidden">
              <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-accent">
                That Scale
              </span>
              <span className="char inline-block text-white/10">.</span>
            </span>
          </h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed font-light"
          >
            I deliver comprehensive digital solutions designed to accelerate your business growth, 
            enhance user engagement, and establish market leadership.
          </motion.p>
        </div>

        {/* Services accordion */}
        <div className="space-y-1 mb-10">
          {services.map((service, index) => (
            <ServiceAccordion
              key={service.title}
              service={service}
              index={index}
              isActive={activeService === index}
              onSelect={() => setActiveService(activeService === index ? null : index)}
            />
          ))}
        </div>

        {/* Bottom CTA - Matching hero style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className=" text-center mb-10"
        >
          <MagneticWrapper strength={0.1}>
            <motion.a
              href="#contact"
              className="mb-10 group inline-flex items-center gap-3 font-ayer-poster tracking-[0.1em] uppercase text-sm text-white/70 hover:text-white transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Ready to Transform Your Digital Presence?</span>
              <motion.span
                className="inline-block "
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={16} />
              </motion.span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-full transition-all duration-500" />
            </motion.a>
          </MagneticWrapper>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.6 }}
          className=" pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "98%", label: "Client Satisfaction" },
            { value: "40+", label: "Projects Delivered" },
            { value: "24/7", label: "Support Available" },
            { value: "∞", label: "Scalability Focus" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="font-ayer-poster text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-2">
                {stat.value}
              </div>
              <div className="text-xs tracking-[0.15em] uppercase text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Section bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
    </section>
  );
}