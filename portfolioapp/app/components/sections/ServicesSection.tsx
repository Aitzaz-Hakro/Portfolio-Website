"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticWrapper } from "@/app/components/ui/MagneticWrapper";
import { Code2, Layout, Server, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Crafting pixel-perfect, responsive interfaces with React, Next.js, and cutting-edge animation libraries.",
    features: ["React & Next.js", "TypeScript", "Animations", "Performance"],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Building robust, scalable server architectures with Node.js, Python, and cloud-native technologies.",
    features: ["Node.js & Python", "APIs", "Databases", "Cloud"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description:
      "Designing intuitive user experiences with a focus on aesthetics, accessibility, and conversion optimization.",
    features: ["Figma", "Prototyping", "User Research", "Design Systems"],
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Sparkles,
    title: "Web3 & Innovation",
    description:
      "Exploring the frontiers of decentralized applications, smart contracts, and emerging technologies.",
    features: ["Smart Contracts", "dApps", "Blockchain", "NFTs"],
    gradient: "from-amber-500 to-orange-500",
  },
];

interface ServiceCardProps {
  service: (typeof services)[0];
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <MagneticWrapper strength={0.1}>
        <div
          className="relative h-full p-8 rounded-3xl glass overflow-hidden cursor-hover group"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Spotlight effect */}
          <motion.div
            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
            }}
          />

          {/* Animated border gradient */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, transparent, rgba(139, 92, 246, 0.1), transparent)`,
            }}
          />

          {/* Icon */}
          <motion.div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 relative z-10`}
            animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold mb-4 relative z-10 group-hover:text-primary transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-6 relative z-10 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 relative z-10">
            {service.features.map((feature, i) => (
              <motion.span
                key={feature}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
              >
                {feature}
              </motion.span>
            ))}
          </div>

          {/* Decorative corner element */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
              <path
                d="M100 0 L100 100 L0 100"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              />
            </svg>
          </div>
        </div>
      </MagneticWrapper>
    </motion.div>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-title-line",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative section-padding overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div 
        style={{ opacity, scale, y }}
        className="container-custom relative z-10"
      >
        {/* Section header */}
        <div ref={titleRef} className="mb-16 md:mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-subtitle text-primary mb-4 block"
          >
            What I Offer
          </motion.span>
          <h2 className="text-display text-section overflow-hidden">
            <span className="service-title-line block">
              Services that
            </span>
            <span className="service-title-line block gradient-text">
              drive results
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground mt-6 max-w-2xl mx-auto"
          >
            From concept to deployment, I provide end-to-end solutions tailored
            to your unique needs and ambitious goals.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Have a project in mind?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-lg font-medium text-primary hover:text-accent transition-colors cursor-hover group"
          >
            <span className="line-reveal">Let&apos;s discuss your ideas</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
