"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticWrapper } from "@/app/components/ui/MagneticWrapper";
import { Quote, Star, ChevronRight, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: "Muhsin Abro",
    role: "Agency Owner",
    content: "I've been collaborating with Aitzaz on multiple projects for over a year and I'm really impressed with the technical expertise and creative solutions. Our applications have never experienced downtime, and the support is always quick to help with any issues. Highly recommend for any complex web development needs!",
    rating: 4,
    color: "accent",
    gradient: "linear-gradient(145deg, rgba(245, 163, 82, 0.15), rgba(245, 163, 82, 0.05))",
    borderColor: "#f5a352",
    avatar: "MA",
  },
  {
    id: 2,
    name: "Engr. Muhammad Hassan",
    role: "Research Assistant, NCRAAI",
    content: "Aitzaz delivered three outstanding websites for our diverse needs: NCRAAI's research platform, BritCars' luxury automotive showcase, and Mehran App's academic archive for MUET students. Each project demonstrated exceptional attention to detail, from the academic rigor required for NCRAAI to the sleek aesthetics for BritCars and the accessible student-first design for Mehran App. Highly professional and versatile developer!",
    rating: 5,
    color: "#1E4FA8",
    gradient: "linear-gradient(210deg, rgba(30, 79, 168, 0.15), rgba(30, 79, 168, 0.05))",
    borderColor: "#1E4FA8",
    avatar: "MH",
  },
  {
    id: 3,
    name: "Rehan Mehdi",
    role: "Campus Director, Hult Prize",
    content: "Aitzaz built an exceptional website for our Hult Prize on-campus program. The registration system handled hundreds of participants flawlessly, and the event management features streamlined our entire workflow. The modern design perfectly captured the spirit of social entrepreneurship and innovation.",
    rating: 4,
    color: "#10b981",
    gradient: "linear-gradient(165deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05))",
    borderColor: "#10b981",
    avatar: "RM",
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
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

      // Animate cards in sequence
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.testimonial-card');
        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
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
      id="testimonials"
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
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#1E4FA8]/5 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl opacity-20" />

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
            Client Testimonials
          </motion.span>

          {/* Main title - Matching image style */}
         <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-ayer-poster text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.9] tracking-tighter mb-8"
          >            <span className="inline-block overflow-hidden">
              <span className="char inline-block">Don't Just Take</span>
            </span>
            <br />
            <span className="inline-block overflow-hidden">
              <span className="char inline-block text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-accent">
                My Word For It
              </span>
            </span>
          </motion.h2>

          {/* Description - Matching image style */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed font-light"
          >
            See what actual clients and collaborators have to say about working with me on their projects.
          </motion.p>
        </div>

        {/* Testimonials Grid - Horizontal layout like the image */}
        <div ref={cardsContainerRef} className="relative mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card group relative h-full"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card container */}
                <div 
                  className="h-full bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden transition-all duration-500 group-hover:border-white/20"
                  style={{
                    background: testimonial.gradient,
                  }}
                >
                  {/* Quote icon in background */}
                  <Quote 
                    size={80} 
                    className="absolute top-4 right-4 text-white/5 group-hover:text-white/10 transition-colors duration-500" 
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Stars rating - Matching image style */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`${i < testimonial.rating ? 'fill-accent text-accent' : 'fill-white/10 text-white/10'} transition-colors duration-300 group-hover:scale-110`}
                          style={{
                            transitionDelay: `${i * 50}ms`
                          }}
                        />
                      ))}
                    </div>

                    {/* Testimonial text - Full text display like image */}
                    <p className="text-white/80 text-base leading-relaxed mb-8 font-light italic">
                      "{testimonial.content}"
                    </p>

                    {/* Divider - Matching image style */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

                    {/* Author info - Matching image layout */}
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 bg-gradient-to-br from-[#0a0a0f] to-[#0d0d14]">
                          <div 
                            className="w-full h-full flex items-center justify-center text-white font-ayer-poster font-bold text-lg"
                            style={{
                              background: `linear-gradient(135deg, ${testimonial.color}40, ${testimonial.color}20)`,
                            }}
                          >
                            {testimonial.avatar}
                          </div>
                        </div>
                        {/* Verified badge */}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-accent to-[#1E4FA8] flex items-center justify-center border-2 border-[#0a0a0f]">
                          <Star size={10} className="text-white" />
                        </div>
                      </div>

                      {/* Name and role */}
                      <div>
                        <h3 className="font-ayer-poster text-lg font-bold text-white mb-1">
                          {testimonial.name}
                        </h3>
                        <p className="text-white/60 text-sm font-light">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Border glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/10 transition-colors duration-500 pointer-events-none" 
                    style={{
                      borderColor: testimonial.borderColor,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Background pattern overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
            <div className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, ${testimonials[0].borderColor}30 2px, transparent 2px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>
        </div>

        {/* CTA Section - Matching hero button style */}
        <div className="text-center mb-18">
          <MagneticWrapper strength={0.15}>
            <motion.button
              className="group relative mb- inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-transparent border-2 border-accent hover:border-accent text-white font-ayer-poster font-medium text-base md:text-lg uppercase tracking-widest rounded-full transition-all duration-500 hover:bg-accent/10 overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Animated background effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative">View More Testimonials</span>
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
            </motion.button>
          </MagneticWrapper>
         
        </div>

        {/* Stats row - Bottom of section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.6 }}
          className=" pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "95%", label: "Client Satisfaction" },
            { value: "4.5", label: "Average Rating" },
            { value: "10+", label: "Projects Completed" },
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