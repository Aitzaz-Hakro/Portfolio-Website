"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";

// Animation variants for staggered text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [imageHover, setImageHover] = useState(false);

  // Scroll-based fade animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        style={{ opacity, scale, y }}
        className="container-custom relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Section - Shows first on mobile */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div
              ref={imageWrapperRef}
              className="relative"
              onMouseEnter={() => setImageHover(true)}
              onMouseLeave={() => setImageHover(false)}
            >
              {/* Colored circle background - using primary color */}
              <motion.div
                className="absolute -inset-4 sm:-inset-6 rounded-full bg-primary/90"
                animate={{
                  scale: imageHover ? 1.05 : 1,
                  rotate: imageHover ? 3 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  boxShadow: "0 25px 60px -15px rgba(245, 163, 82, 0.4)",
                }}
              />
              
              {/* Secondary accent ring */}
              <motion.div
                className="absolute -inset-8 sm:-inset-10 rounded-full border-2 border-primary/20"
                animate={{
                  scale: imageHover ? 1.08 : 1,
                  rotate: imageHover ? -2 : 0,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />

              {/* Profile image container */}
              <motion.div
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] rounded-full overflow-hidden"
                animate={{
                  y: imageHover ? -8 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Image
                  src="/profile.png"
                  alt="Portrait photo of Aitzaz Hassan, a full-stack developer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 740px) 256px, (max-width: 868px) 288px, (max-width: 1024px) 320px, 340px"
                  priority
                />
                
                {/* Subtle overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
                  animate={{ opacity: imageHover ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white/80"
                animate={{
                  y: imageHover ? -5 : 0,
                  scale: imageHover ? 1.2 : 1,
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-primary/60"
                animate={{
                  y: imageHover ? 5 : 0,
                  scale: imageHover ? 1.3 : 1,
                }}
                transition={{ duration: 0.4, delay: 0.15 }}
              />
            </div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Subtle highlight label */}
            <motion.span
              variants={itemVariants}
              className="inline-block text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-primary mb-6 border border-primary/30 px-4 py-1.5 rounded-full bg-primary/5"
            >
              Who I Am
            </motion.span>

            {/* Main heading with stylized typography */}
            <motion.h2
              id="about-heading"
              variants={itemVariants}
              className="mb-6 lg:mb-8"
            >
              <span className="block text-sm sm:text-base font-light tracking-[0.15em] uppercase text-white/50 mb-2">
                Get to know
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.9] tracking-tight">
                About
              </span>
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-400 to-primary italic">
                  Me
                </span>
                <span className="text-white/20">.</span>
              </span>
            </motion.h2>

            {/* Description paragraphs with refined typography */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-white/80 leading-[1.8] max-w-lg mx-auto lg:mx-0 mb-5 font-light"
            >
              I&apos;m a <span className="text-primary font-medium">passionate full-stack developer</span> with 
              a love for crafting beautiful, performant digital experiences.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-white/50 leading-[1.8] max-w-lg mx-auto lg:mx-0 mb-10 font-light"
            >
              My approach combines <em className="text-white/70 not-italic font-normal">clean code architecture</em> with 
              intuitive design, ensuring every project delivers an{" "}
              <span className="text-white/70 font-normal">exceptional user experience</span>.
            </motion.p>
            <div className="flex flex-col items-center lg:items-start gap-10">
            {/* Resume button */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start"
            >
              <motion.a
              href="/resume.pdf"
              download
              aria-label="Download my resume as PDF"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full overflow-hidden transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              >
              {/* Button background animation */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] group-hover:animate-shimmer" />
              
              {/* Button content */}
              <span className="relative flex items-center gap-3">
                <Download 
                size={18} 
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                <span className="text-sm tracking-[0.05em] font-semibold uppercase">
                Download Resume
                </span>
              </span>

              {/* Subtle glow effect */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_30px_rgba(245,163,82,0.5)]" />
              </motion.a>
            </motion.div>

            {/* Quick stats row */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center lg:justify-start gap-10 sm:gap-12 pt-8 border-t border-white/10 w-full max-w-lg"
            >
              {[
              { value: "5+", label: "Years of Experience" },
              { value: "50+", label: "Projects Completed" },
              { value: "30+", label: "Happy Clients" },
              ].map((stat, index) => (
              <div key={stat.label} className="text-center lg:text-left">
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="text-3xl sm:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
              >
              {stat.value}
              </motion.div>
              <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              className="text-[10px] sm:text-xs tracking-[0.1em] uppercase text-white/40 mt-2 font-medium"
              >
              {stat.label}
              </motion.div>
              </div>
              ))}
            </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
