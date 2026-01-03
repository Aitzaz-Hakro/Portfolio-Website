"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Nexus Platform",
    description:
      "A next-generation SaaS platform with real-time collaboration features and AI-powered analytics dashboard.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "AI"],
    image: "/projects/project1.jpg",
    color: "#8b5cf6",
    link: "#",
    github: "#",
  },
  {
    id: 2,
    title: "Crypto Vault",
    description:
      "Secure cryptocurrency portfolio management with advanced charting and automated trading strategies.",
    tags: ["React", "Node.js", "Web3", "D3.js"],
    image: "/projects/project2.jpg",
    color: "#06b6d4",
    link: "#",
    github: "#",
  },
  {
    id: 3,
    title: "EcoTrack",
    description:
      "Environmental monitoring platform tracking carbon footprint with IoT integration and predictive modeling.",
    tags: ["Python", "FastAPI", "React", "ML"],
    image: "/projects/project3.jpg",
    color: "#10b981",
    link: "#",
    github: "#",
  },
  {
    id: 4,
    title: "MindFlow",
    description:
      "Mental wellness application featuring guided meditation, mood tracking, and personalized recommendations.",
    tags: ["React Native", "Node.js", "MongoDB"],
    image: "/projects/project4.jpg",
    color: "#f59e0b",
    link: "#",
    github: "#",
  },
  {
    id: 5,
    title: "QuantumLeap",
    description:
      "High-frequency trading platform with microsecond execution times and complex algorithmic strategies.",
    tags: ["Rust", "Python", "Redis", "WebSocket"],
    image: "/projects/project5.jpg",
    color: "#ef4444",
    link: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Artisan Hub",
    description:
      "E-commerce marketplace for handcrafted goods with AR preview and creator monetization tools.",
    tags: ["Next.js", "Stripe", "Prisma", "AR.js"],
    image: "/projects/project6.jpg",
    color: "#ec4899",
    link: "#",
    github: "#",
  },
];

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="nft-card group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* NFT Card with shine effect */}
      <div 
        className={`
          relative overflow-hidden h-full
          border border-white/10
          rounded-2xl
          backdrop-blur-md
          transition-all duration-500 ease-out
          ${isHovered ? 'border-white/20 scale-[1.02]' : ''}
        `}
        style={{
          background: 'linear-gradient(0deg, rgba(40,44,52,1) 0%, rgba(17,0,32,0.5) 100%)',
          boxShadow: isHovered 
            ? '0 20px 40px -10px rgba(0,0,0,0.6)' 
            : '0 10px 30px -5px rgba(0,0,0,0.4)',
        }}
      >
        {/* Shine effect on hover */}
        <div 
          className={`
            absolute inset-0 pointer-events-none z-10
            transition-opacity duration-500
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
            backgroundSize: '200% 200%',
            animation: isHovered ? 'shine 0.8s ease-in-out' : 'none',
          }}
        />

        {/* Main content wrapper */}
        <div className="p-5 flex flex-col h-full">
          {/* Project Image */}
          <div 
            className="relative h-48 rounded-xl overflow-hidden mb-5"
            style={{
              background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
            }}
          >
            {/* Project number watermark */}
            <div
              className="absolute top-4 left-4 text-6xl font-display font-bold opacity-15 select-none"
              style={{ color: project.color }}
            >
              0{project.id}
            </div>

            {/* Floating letter icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ y: isHovered ? -6 : 0, scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div 
                className="w-16 h-16 rounded-xl flex items-center justify-center backdrop-blur-sm"
                style={{ 
                  background: `${project.color}25`,
                  boxShadow: `0 8px 24px ${project.color}30`,
                }}
              >
                <span className="text-3xl font-display font-bold" style={{ color: project.color }}>
                  {project.title.charAt(0)}
                </span>
              </div>
            </motion.div>

            {/* Gradient overlay */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                background: `radial-gradient(ellipse at 50% 100%, ${project.color}25, transparent 70%)`,
              }}
            />
          </div>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed mb-5 line-clamp-2 flex-grow">
            {project.description}
          </p>

          {/* Tags Row */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/70 border border-white/10"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/50 border border-white/10">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5" />

          {/* Creator / Title Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Avatar wrapper */}
              <div className="flex-shrink-0">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shadow-lg"
                  style={{ 
                    background: `linear-gradient(135deg, ${project.color}, ${project.color}90)`,
                    color: '#000',
                  }}
                >
                  {project.title.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-white font-display font-semibold text-sm truncate">{project.title}</p>
                <p className="text-white/40 text-xs">Project #{project.id}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.a
                href={project.link}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
                aria-label="View project"
              >
                <ExternalLink size={16} />
              </motion.a>
              <motion.a
                href={project.github}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 hover:bg-white/10 transition-all duration-300"
                aria-label="View source code"
              >
                <Github size={16} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Colored glow on bottom */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-16 blur-2xl opacity-20 pointer-events-none"
          style={{ background: project.color }}
        />
      </div>

      {/* Card shine animation keyframes */}
      <style jsx>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}

export function ProjectsSection() {
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
        ".project-title-line",
        { y: 100, opacity: 0 },
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
      id="projects"
      className="relative section-padding overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

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
            Featured Work
          </motion.span>
          <h2 className="text-display text-section overflow-hidden">
            <span className="project-title-line block">
              Projects that
            </span>
            <span className="project-title-line block gradient-text">
              define excellence
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground mt-6 max-w-2xl mx-auto"
          >
            Each project represents a unique challenge conquered with innovative
            solutions and meticulous attention to detail.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 text-lg text-primary hover:text-accent transition-colors cursor-hover group"
          >
            <span className="line-reveal">View All Projects</span>
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
