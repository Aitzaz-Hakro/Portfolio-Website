"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO, TechVenture Inc.",
    content:
      "Working with this developer was transformative for our platform. The attention to detail and innovative approach exceeded all expectations. Our user engagement increased by 340% within three months.",
    avatar: "SC",
    color: "#8b5cf6",
  },
  {
    id: 2,
    name: "Michael Roberts",
    role: "Founder, StartupHub",
    content:
      "The level of professionalism and technical expertise is unmatched. They didn't just build what we asked for—they anticipated our needs and delivered solutions we didn't even know we needed.",
    avatar: "MR",
    color: "#06b6d4",
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "CTO, InnovateTech",
    content:
      "A rare combination of creative vision and technical mastery. The codebase is clean, scalable, and a joy to work with. They've become our go-to partner for all critical projects.",
    avatar: "EW",
    color: "#10b981",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Product Lead, GlobalScale",
    content:
      "From day one, the communication was crystal clear. They understood our vision instantly and delivered a product that perfectly captured our brand essence while pushing technical boundaries.",
    avatar: "DK",
    color: "#f59e0b",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Director, DigitalFirst Agency",
    content:
      "We've collaborated on dozens of projects, and every single one has been delivered on time, under budget, and above expectations. An absolute gem in the development world.",
    avatar: "LT",
    color: "#ec4899",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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
        ".testimonial-title-line",
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

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative section-padding overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

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
            Testimonials
          </motion.span>
          <h2 className="text-display text-section overflow-hidden">
            <span className="testimonial-title-line block">
              Words from
            </span>
            <span className="testimonial-title-line block gradient-text">
              those I&apos;ve worked with
            </span>
          </h2>
        </div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main testimonial card */}
            <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  className="absolute w-full"
                >
                  <div className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden">
                    {/* Quote icon */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute -top-4 -left-4"
                    >
                      <Quote
                        size={120}
                        style={{ color: testimonials[currentIndex].color }}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 italic"
                      >
                        &quot;{testimonials[currentIndex].content}&quot;
                      </motion.p>

                      {/* Author info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4"
                      >
                        {/* Avatar */}
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{
                            background: `linear-gradient(135deg, ${testimonials[currentIndex].color}, ${testimonials[currentIndex].color}80)`,
                          }}
                        >
                          {testimonials[currentIndex].avatar}
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonials[currentIndex].role}
                          </p>
                        </div>
                      </motion.div>
                    </div>

                    {/* Decorative gradient */}
                    <div
                      className="absolute bottom-0 right-0 w-32 h-32 opacity-10 blur-2xl"
                      style={{
                        background: `radial-gradient(circle, ${testimonials[currentIndex].color}, transparent)`,
                      }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {/* Previous button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-hover"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Dots indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-hover ${
                      index === currentIndex
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors cursor-hover"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by innovative companies worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-40">
              {["TechVenture", "StartupHub", "InnovateTech", "GlobalScale", "DigitalFirst"].map(
                (company) => (
                  <span
                    key={company}
                    className="text-lg font-semibold text-foreground"
                  >
                    {company}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
