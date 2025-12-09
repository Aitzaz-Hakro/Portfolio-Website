"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY - height / 2) / height) * -20;
    const rotateY = ((mouseX - width / 2) / width) * 20;

    x.set(rotateY);
    y.set(rotateX);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="perspective-container scroll-snap-item"
    >
      <motion.div
        style={{
          rotateX: mouseYSpring,
          rotateY: mouseXSpring,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="tilt-card group relative overflow-hidden rounded-2xl glass cursor-hover"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(circle at center, ${project.color}20, transparent 70%)`,
          }}
        />

        {/* Image placeholder */}
        <div
          className="relative h-56 md:h-64 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, transparent 40%, ${project.color}40 50%, transparent 60%)`,
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Project number */}
          <div
            className="absolute top-4 left-4 text-8xl font-bold opacity-10"
            style={{ color: project.color }}
          >
            0{project.id}
          </div>

          {/* Floating icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: "translateZ(50px)" }}
          >
            <motion.div
              animate={{ y: isHovered ? -10 : 0, scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: `${project.color}30` }}
            >
              <span className="text-4xl font-bold" style={{ color: project.color }}>
                {project.title.charAt(0)}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 relative z-10">
          <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-secondary/50 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <motion.a
              href={project.link}
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors cursor-hover"
            >
              <ExternalLink size={16} />
              <span>View Project</span>
            </motion.a>
            <motion.a
              href={project.github}
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-hover"
            >
              <Github size={16} />
              <span>Source</span>
            </motion.a>
          </div>
        </div>

        {/* Border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 0 1px ${project.color}50`,
          }}
        />
      </motion.div>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
