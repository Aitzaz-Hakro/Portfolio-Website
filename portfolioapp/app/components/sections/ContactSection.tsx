"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Send, MapPin, Phone, Github, Linkedin, ArrowUpRight, Sparkle, CheckCircle } from "lucide-react";

const contactInfo = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "aitzazhakro123@gmail.com",
    action: "mailto:aitzazhakro123@gmail.com",
    color: "text-blue-400",
  },
  { 
    icon: Phone, 
    label: "Phone", 
    value: "+92 304 3005127",
    action: "tel:+923043005127",
    color: "text-accent",
  },
  { 
    icon: MapPin, 
    label: "Location", 
    value: "Hyderabad, Pakistan",
    action: "https://maps.google.com/?q=Hyderabad,+Pakistan",
    color: "text-purple-400",
  },
];

const socialLinks = [
  { 
    platform: "GitHub", 
    href: "https://github.com/Aitzaz-Hakro/", 
    icon: Github,
    color: "text-gray-400 hover:text-white",
    metric: "50+ repos"
  },
  { 
    platform: "LinkedIn", 
    href: "https://linkedin.com/in/aitzazhassan2005", 
    icon: Linkedin,
    color: "text-blue-400 hover:text-blue-300",
    metric: "2500+ followers"
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 overflow-hidden"
      onMouseLeave={() => setHoveredElement(null)}
    >
      {/* Minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d14] to-[#0a0a0f]" />
      
      {/* Accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container-custom relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20 text-center flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <div className="inline-flex items-center gap-3 ">
              <div className="w-8 h-px bg-accent/40" />
              <span className="text-xs font-ayer-poster tracking-[0.3em] uppercase text-white/40">
                Contact
              </span>
            </div>
          </motion.div>

          <motion.div  variants={itemVariants}>
            <h2 className="font-ayer-poster text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6">
              <span className="inline-block">
                Let&apos;s Build
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-accent">
                Something Amazing
              </span>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed font-light">
              Ready to bring your vision to life? I&apos;m here to help transform your ideas into exceptional digital experiences.
            </p>
          </motion.div>
        </motion.div>

        {/* Content Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Contact Form */}
          <div>
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="font-ayer-poster text-2xl font-medium text-white mb-4">
                Send a Message
              </h3>
              <p className="text-white/40 text-sm font-light">
                Fill out the form below and I&apos;ll get back to you within 24 hours.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full px-4 py-4 pt-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-accent/40 transition-colors duration-300"
                  />
                  <label className={`absolute left-4 text-white/40 text-sm font-light pointer-events-none transition-all duration-300 ${formData.name ? '-top-2.5 text-xs bg-[#0d0d14] px-2 text-accent/70' : 'top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-[#0d0d14] peer-focus:px-2 peer-focus:text-accent/70'}`}>
                    Your Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" "
                    className="peer w-full px-4 py-4 pt-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-accent/40 transition-colors duration-300"
                  />
                  <label className={`absolute left-4 text-white/40 text-sm font-light pointer-events-none transition-all duration-300 ${formData.email ? '-top-2.5 text-xs bg-[#0d0d14] px-2 text-accent/70' : 'top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-[#0d0d14] peer-focus:px-2 peer-focus:text-accent/70'}`}>
                    Email Address
                  </label>
                </div>
              </div>

              {/* Subject */}
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-4 py-4 pt-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-accent/40 transition-colors duration-300"
                />
                <label className={`absolute left-4 text-white/40 text-sm font-light pointer-events-none transition-all duration-300 ${formData.subject ? '-top-2.5 text-xs bg-[#0d0d14] px-2 text-accent/70' : 'top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-[#0d0d14] peer-focus:px-2 peer-focus:text-accent/70'}`}>
                  Subject
                </label>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  rows={4}
                  className="peer w-full px-4 py-4 pt-6 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-accent/40 transition-colors duration-300 resize-none"
                />
                <label className={`absolute left-4 text-white/40 text-sm font-light pointer-events-none transition-all duration-300 ${formData.message ? '-top-2.5 text-xs bg-[#0d0d14] px-2 text-accent/70' : 'top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-[#0d0d14] peer-focus:px-2 peer-focus:text-accent/70'}`}>
                  Your Message
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full px-8 py-4 bg-white/5 border border-white/10 rounded-lg text-white font-light hover:border-accent/40 transition-all duration-300"
                onMouseEnter={() => setHoveredElement("submit")}
                onMouseLeave={() => setHoveredElement(null)}
              >
                <div className="flex items-center justify-center gap-3">
                  <span>Send Message</span>
                  <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
                
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute inset-0 flex items-center justify-center gap-2 bg-accent/10 border border-accent/20 rounded-lg"
                    >
                      <CheckCircle size={16} className="text-accent" />
                      <span className="text-accent text-sm">Message Sent!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="font-ayer-poster text-2xl font-medium text-white mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400">
                  Get In Touch
                </span>
              </h3>
              
              {/* Contact Info Cards */}
              <div className="space-y-4 mb-12">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.action}
                    target={item.action.startsWith('http') ? '_blank' : undefined}
                    rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block"
                    onMouseEnter={() => setHoveredElement(item.label)}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    <div className="flex items-center gap-4 p-4 border border-white/5 rounded-lg hover:border-white/10 transition-colors duration-300">
                      <div className={`p-3 rounded-lg bg-white/5 ${item.color}`}>
                        <item.icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-white/40 font-light">{item.label}</div>
                        <div className="text-white font-light">{item.value}</div>
                      </div>
                      <ArrowUpRight 
                        size={16} 
                        className="text-white/20 group-hover:text-white/60 transition-colors" 
                      />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="mb-12">
              <h4 className="font-ayer-poster text-sm font-medium text-white/60 tracking-wider uppercase mb-6">
                Connect With Me
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-4 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300 ${social.color}`}
                    onMouseEnter={() => setHoveredElement(`social-${social.platform}`)}
                    onMouseLeave={() => setHoveredElement(null)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <social.icon size={20} className="opacity-80" />
                      <ArrowUpRight 
                        size={16} 
                        className="opacity-0 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>
                    <div className="text-sm font-medium">{social.platform}</div>
                    <div className="text-xs opacity-50 font-light">{social.metric}</div>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={itemVariants}>
              <div className="p-6 mb-10 border border-white/5 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent animate-ping" />
                  </div>
                  <div>
                    <div className="text-white font-light">Available for Projects</div>
                    <div className="text-sm text-white/40 font-light">Response time: &lt;24 hours</div>
                  </div>
                </div>
                <p className="text-sm text-white/60 font-light">
                  Currently accepting freelance work and full-time opportunities. Let&apos;s discuss how I can contribute to your success.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Divider */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={isInView ? { opacity: 1, width: "100%" } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />
      </div>

      {/* Micro-interaction Indicator */}
      <AnimatePresence>
        {hoveredElement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 right-8 pointer-events-none"
          >
            <div className="text-xs text-white/30 font-mono tracking-wider">
              {hoveredElement.toUpperCase()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}