"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Mehran App",
    description: "Student-focused academic archive for MUET with fast past-paper search, reliable records, and mobile-first access.",
    category: "Academic",
    tags: ["NextJs", "Supabase", "Authentication"],
    image: "/projects/muetapp.png",
    color: "#0ea5a4",
    link: "https://mehranapp.vercel.app/",
    github: "https://github.com/Aitzaz-Hakro/mehranapp",
  },
  {
    id: 2,
    title: "Brit Cars Ltd",
    description: "High-converting cab booking platform with real-time availability and SEO optimization.",
    category: "Buisness",
    tags: ["Next.js", "JavaScript", "SQL"],
    image: "/projects/project1.webp",
    color: "#8b5cf6",
    link: "https://britcarsltd.co.uk/",
    github: "#",
  },
  {
     id: 3,
    title: "Cerevo Ai",
    description: "AI-powered job assistance platform offering real-time ATS resume analysis and multiple intelligent features for developers and professionals.",
    category: "SaaS",
    tags: ["Next.js","Supabase", "ML", "FastAPI",],
    image: "/projects/project5.webp",
    color: "#ef4444",
    link: "https://cerevo-ai.vercel.app/",
    github: "https://github.com/Aitzaz-Hakro/Cerevo-AI",
  },
  {
    id: 4,
    title: "NCRAAI MUET",
    description: "Modernized NCRAAI's website with a clean HTML, CSS, and JavaScript rebuild for their robotics and AI center.",
    category: "Buisness",
    tags: ["React Native", "Node.js", "MongoDB"],
    image: "/projects/project4.webp",
    color: "#f59e0b",
    link: "https://ncraai.muet.edu.pk/",
    github: "https://github.com/Aitzaz-Hakro/NCRAAI",
  },
  {
   id: 5,
    title: "Hult Prize MUET Chapter",
    description: "Professional organization website with secure public event registrations.",
    category: "Organization",
    tags: ["Html", "Bootstrap", "JavaScript"],
    image: "/projects/project2.webp",
    color: "#06b6d4",
    link: "https://hpmuetszab.social/",
    github: "https://github.com/Aitzaz-Hakro/HPFinal",

  },
  {
    id: 6,
    title: "ExoVision",
    description: "ExoVision- A website for NASA Experts to Analyze the unknown planets, and check whether its a planet or not. ",
    category: "Scientific",
    tags: ["Next.js", "3D", "ML Model"],
    image: "/projects/project6.webp",
    color: "#ec4899",
    link: "https://exovisionapp.vercel.app/",
    github: "https://github.com/Aitzaz-Hakro/Nasa-App/tree/main/frontend/itp-nasa-app",
  },
];

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  // Hover animation for image
  useEffect(() => {
    if (isHovered && imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.05,
        duration: 0.6,
        ease: "power2.out",
      });
    } else if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="group relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at center, ${project.color}15, transparent 70%)`,
        }}
      />

      {/* Card container */}
      <div className="relative h-full bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 group-hover:border-white/20">
        {/* Project image */}
        <div className="relative h-64 overflow-hidden">
          <div 
            ref={imageRef}
            className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"
            style={{
              backgroundImage: `linear-gradient(45deg, ${project.color}15, transparent 50%), url(${project.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Category label */}
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 text-xs font-ayer-poster tracking-wider uppercase bg-white/10 backdrop-blur-sm rounded-full text-white/80 border border-white/20">
                {project.category}
              </span>
            </div>

            {/* Project number */}
            <div className="absolute bottom-4 right-4">
              <span className="font-ayer-poster text-6xl font-bold text-white/5">
                0{project.id}
              </span>
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Project title */}
          <h3 className="font-ayer-poster text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed mb-4 font-light">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/70 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-3" />

          {/* Footer */}
          <div className="flex items-center justify-between -mb-3">
            {/* Links */}
            <div className="flex items-center gap-3">
              <motion.a
                href={project.link}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group/link"
                aria-label="View project"
              >
                <ExternalLink size={18} className="text-white/60 group-hover/link:text-white transition-colors" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black/90 backdrop-blur-sm rounded opacity-0 group-hover/link:opacity-100 transition-opacity whitespace-nowrap">
                  Live Preview
                </span>
              </motion.a>
              <motion.a
                href={project.github}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-3 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 group/link"
                aria-label="View source code"
              >
                <Github size={18} className="text-white/60 group-hover/link:text-white transition-colors" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs bg-black/90 backdrop-blur-sm rounded opacity-0 group-hover/link:opacity-100 transition-opacity whitespace-nowrap">
                  Source Code
                </span>
              </motion.a>
            </div>

            {/* View project arrow */}
            <motion.div
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-white/40 group-hover:text-white transition-colors"
            >
              <ArrowRight size={20} />
            </motion.div>
          </div>
        </div>

        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/5 pointer-events-none transition-colors duration-500" />
      </div>
    </motion.article>
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
      id="projects"
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* Background matching hero section */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(30, 30, 40, 0.8) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 0% 50%, rgba(20, 20, 30, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(20, 20, 30, 0.4) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0f 0%, #0d0d14 30%, #0a0a0f 100%)
          `,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#f5a352]/5 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-20" />

      <motion.div 
        style={{ opacity, scale, y }}
        className="container-custom relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
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
            Featured Work
          </motion.span>

          {/* Main title with character animation */}
          <h2 className="font-ayer-poster text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tighter mb-6">
            <span className="inline-block overflow-hidden">
              <span className="char inline-block">Selected</span>
            </span>
            <br />
            <span className="inline-block overflow-hidden">
                <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-accent">
                Projects
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
            A curated collection of my most impactful work, showcasing innovative solutions 
            and meticulous attention to detail in every project.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 mb-10 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View all CTA - Matching hero button style */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center "
        >
          <a
            href="#"
            className="group mb-4 inline-flex items-center gap-3 font-ayer-poster tracking-[0.1em] uppercase text-sm text-white/70 hover:text-white transition-colors"
          >
            <span>View Complete Portfolio</span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={16} />
            </motion.span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-full transition-all duration-500" />
          </a>
        </motion.div> */}
      </motion.div>

      {/* Section bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0" />
    </section>
  );
}