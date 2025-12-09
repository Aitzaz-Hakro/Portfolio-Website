"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticWrapper } from "@/app/components/ui/MagneticWrapper";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Subtle animated background particles
function SubtleParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create fewer, more subtle particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.15 + 0.05,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-40"
    />
  );
}

// Scroll progress indicator
function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-2">
      <div className="h-24 w-[2px] bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="w-full bg-white/60 rounded-full"
          style={{ height: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animate title words
      const words = titleRef.current?.querySelectorAll('.hero-word');
      if (words) {
        tl.fromTo(
          words,
          { y: 100, opacity: 0, rotateX: -90 },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0, 
            duration: 1.2, 
            stagger: 0.1,
            delay: 0.3 
          }
        );
      }

      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleExploreClick = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent backdrop-blur-40 section-padding"
      id="hero"
    >
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `
          //   radial-gradient(ellipse 80% 50% at 50% 100%, rgba(30, 30, 40, 0.8) 0%, transparent 60%),
          //   radial-gradient(ellipse 60% 40% at 20% 80%, rgba(20, 20, 30, 0.6) 0%, transparent 50%),
          //   radial-gradient(ellipse 60% 40% at 80% 80%, rgba(20, 20, 30, 0.6) 0%, transparent 50%),
          //   linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)
          // `,
        }}
      />

      {/* Subtle particles */}
      <SubtleParticles />

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-20 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto"
      >
        {/* Main title with italic styling */}
        <h1
          ref={titleRef}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8 md:mb-12 leading-[1.1] tracking-tight"
          style={{ perspective: "1000px" }}
        >
            <span className="hero-word text- inline-block italic">
              Aitzaz Hassan
            </span>
            <span className="hero-word inline-block italic ">
              Full Stack Developer
            </span>
            <br />
            <span className="hero-word inline-block italic mt-2 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl  md:mt-4 mb-3 text-muted-foreground ">
              Crafting Digital Experiences
            </span>
        </h1>

        {/* CTA Button */}
        <div ref={ctaRef} className="flex justify-center mt-8 md:mt-12">
          <MagneticWrapper strength={0.15}>
            <motion.button
              onClick={handleExploreClick}
              className="group w-50 h-10 relative inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-[#f5a352] hover:bg-[#e8943f] text-black font-sans font-medium text-sm md:text-base uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,163,82,0.4)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore Works</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </MagneticWrapper>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        > 
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
