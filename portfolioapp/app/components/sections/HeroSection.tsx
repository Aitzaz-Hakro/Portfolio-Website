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

// Name background SVG component
function NameBackgroundSVG() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full z-0 opacity-15 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="nameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
          <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.4" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Large decorative name text in background */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="font-display"
        style={{
          fontSize: '320px',
          fontFamily: "'Ayer Poster', serif",
          fontWeight: '900',
          fill: 'url(#nameGradient)',
          opacity: 0.8,
          letterSpacing: '-0.02em',
          filter: 'url(#glow)',
        }}
      >
        AITZAZ
      </text>
    </svg>
  );
}



export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  // Force recompilation - remove this comment

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  useEffect(() => {
    // Add custom font
    const style = document.createElement('style');  
    style.textContent = `
      @font-face {
      font-family: 'Ayer Poster';
      src: url('/fonts/VisaDialect-Regular.woff2') format('woff2'),
           url('/fonts/VisaDialect-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
      
      }
      
      .font-ayer-poster {
      font-family: 'Ayer Poster', serif;
      word-spacing: 0.025em;
       letter-spacing: 00em !important;
      line-height: 1;
      } 
      
    `;
    document.head.appendChild(style);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animate main name with staggered fade-in
      const nameWords = titleRef.current?.querySelectorAll('.hero-name');
      if (nameWords) {
        tl.fromTo(
          nameWords,
          { 
            y: 60, 
            opacity: 0, 
            filter: "blur(10px)" 
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.4,
            stagger: 0.15,
            delay: 0.3
          }
        );
      }

      // Animate tagline with fade-in from bottom
      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { 
            y: 40, 
            opacity: 0,
            scale: 0.95 
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 1.2 
          },
          "-=0.6"
        );
      }

      // Animate CTA button
      tl.fromTo(
        ctaRef.current,
        { 
          y: 30, 
          opacity: 0,
          rotateX: -20 
        },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0, 
          duration: 0.9 
        },
        "-=0.4"
      );
    }, containerRef);

    return () => {
      document.head.removeChild(style);
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
            radial-gradient(ellipse 80% 50% at 50% 100%, rgba(30, 30, 40, 0.9) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(20, 20, 30, 0.7) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(20, 20, 30, 0.7) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0f 0%, #0d0d14 50%, #0a0a0f 100%)
          `,
        }}
      />

      {/* Name background SVG */}
      <NameBackgroundSVG />

      {/* Subtle particles */}
      <SubtleParticles />

      {/* Content */}
      <motion.div
        style={{ opacity, scale, y, gap: '1.5rem' }}
        className="relative z-20 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto"
      >
        {/* Main title with Tina Smith-inspired layout */}
        <div className="mb-4 md:mb-6" style={{ perspective: "1200px", marginTop: '-2rem' }}>
          <h1
            ref={titleRef}
            className="font-ayer-poster font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-6 md:mb-8 leading-[0.95] tracking-tighter"
          >
            <span className="hero-name inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-accent">
              Aitzaz Hassan
            </span>
            <br  className="mb-2 md:mb-4"/>
            <span className="hero-name inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl  text-white/90 ">
              Creative Full Stack Developer
            </span>
          </h1>
          
          {/* Bold tagline/hook inspired by Tina Smith */}
            <p
            ref={taglineRef}
            className="font-ayer-poster font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white/70 max-w-4xl mx-auto px-4"
            >
            specializing in <span className="text-accent font-semibold">frontend architecture</span> and <span className="text-accent font-semibold">immersive user experiences</span>
            </p>
        </div>

        {/* Updated CTA Button with Tina Smith-inspired styling */}
        <div ref={ctaRef} className="flex justify-center">
          <MagneticWrapper strength={0.15}>
            <motion.button
              onClick={handleExploreClick}
              className="group relative inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-transparent border-2 border-accent hover:border-accent text-white font-ayer-poster font-medium text-base md:text-lg uppercase tracking-widest rounded-full transition-all duration-500 hover:bg-accent/10 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated background effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative">View Selected Projects</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
            </motion.button>
          </MagneticWrapper>
        </div>

        {/* Scroll down indicator */}
       
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}