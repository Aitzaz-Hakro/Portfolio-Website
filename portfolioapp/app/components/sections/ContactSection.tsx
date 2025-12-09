"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/app/components/ui/Button";
import { MagneticWrapper } from "@/app/components/ui/MagneticWrapper";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@example.com" },
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
];

interface AnimatedInputProps {
  label: string;
  type?: string;
  placeholder: string;
  isTextarea?: boolean;
}

function AnimatedInput({
  label,
  type = "text",
  placeholder,
  isTextarea = false,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const inputClasses = `
    w-full px-4 py-4 bg-secondary/30 border border-border rounded-xl
    text-foreground placeholder-transparent
    focus:outline-none focus:border-primary focus:bg-secondary/50
    transition-all duration-300
    ${isFocused || hasValue ? "pt-6 pb-2" : ""}
  `;

  const labelClasses = `
    absolute left-4 transition-all duration-300 pointer-events-none
    ${
      isFocused || hasValue
        ? "top-2 text-xs text-primary"
        : "top-1/2 -translate-y-1/2 text-muted-foreground"
    }
  `;

  return (
    <div className="relative">
      {isTextarea ? (
        <>
          <textarea
            className={`${inputClasses} min-h-[150px] resize-none`}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value.length > 0);
            }}
            onChange={(e) => setHasValue(e.target.value.length > 0)}
          />
          <label
            className={`absolute left-4 transition-all duration-300 pointer-events-none ${
              isFocused || hasValue
                ? "top-2 text-xs text-primary"
                : "top-6 text-muted-foreground"
            }`}
          >
            {label}
          </label>
        </>
      ) : (
        <>
          <input
            type={type}
            className={inputClasses}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value.length > 0);
            }}
            onChange={(e) => setHasValue(e.target.value.length > 0)}
          />
          <label className={labelClasses}>{label}</label>
        </>
      )}

      {/* Focus indicator line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? "100%" : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export function ContactSection() {
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
        ".contact-title-line",
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
      id="contact"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-secondary/5 to-background" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

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
            Get In Touch
          </motion.span>
          <h2 className="text-display text-section overflow-hidden">
            <span className="contact-title-line block">
              Let&apos;s create
            </span>
            <span className="contact-title-line block gradient-text">
              something amazing
            </span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground mt-6 max-w-2xl mx-auto"
          >
            Ready to bring your vision to life? I&apos;m here to help transform your
            ideas into digital reality.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact form (UI only) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="glass rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-6">
                  <AnimatedInput label="Your Name" placeholder="John Doe" />
                  <AnimatedInput
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>

                <AnimatedInput
                  label="Subject"
                  placeholder="Project Inquiry"
                />

                <AnimatedInput
                  label="Your Message"
                  placeholder="Tell me about your project..."
                  isTextarea
                />

                <MagneticWrapper strength={0.15}>
                  <Button
                    type="button"
                    variant="glow"
                    size="lg"
                    className="w-full group"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </MagneticWrapper>
              </form>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Info cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  className="glass rounded-2xl p-6 group hover:bg-white/5 transition-colors cursor-hover"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {info.label}
                      </p>
                      <p className="text-lg font-medium">{info.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div className="pt-8">
              <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-6">
                Connect with me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                  >
                    <MagneticWrapper strength={0.3}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="w-14 h-14 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-white/5 transition-all cursor-hover"
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    </MagneticWrapper>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Availability status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <span className="text-foreground">
                  Available for new projects
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Currently accepting freelance work and full-time remote
                positions. Response time: &lt;24 hours.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
