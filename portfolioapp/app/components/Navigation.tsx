// "use client";

// import { useRef, useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { gsap } from "gsap";
// import { Menu, X } from "lucide-react";
// import { MagneticWrapper } from "@/app/components/ui/MagneticWrapper";

// const navLinks = [
//   { href: "#hero", label: "HOME" },
//   { href: "#about", label: "ABOUT ME" },
//   { href: "#projects", label: "MY WORKS" },
//   { href: "#contact", label: "CONTACT" },
// ];

// export function Navigation() {
//   const navRef = useRef<HTMLElement>(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState("hero");

//   useEffect(() => {
//     // GSAP initial animation
//     gsap.fromTo(
//       navRef.current,
//       { y: -100, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power4.out" }
//     );

//     // Scroll handler
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);

//       // Update active section
//       const sections = navLinks.map((link) => link.href.replace("#", ""));
//       for (const section of sections.reverse()) {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           if (rect.top <= 150) {
//             setActiveSection(section);
//             break;
//           }
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLinkClick = (href: string) => {
//     setIsMobileMenuOpen(false);
//     const element = document.querySelector(href);
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <>
//       <motion.nav
//         ref={navRef}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           isScrolled ? "py-3" : "py-4 md:py-6"
//         }`}
//       >
//         <div className="container-custom">
//           <div
//             className={`flex items-center justify-between px-4 md:px-6 py-2 md:py-3 rounded-2xl transition-all duration-500 ${
//               isScrolled ? "glass" : "bg-transparent"
//             }`}
//           >
//             {/* Logo - AARONN style with cyan circle accent */}
//             <MagneticWrapper strength={0.2}>
//               <a
//                 href="#hero"
//                 onClick={() => handleLinkClick("#hero")}
//                 className="text-xl md:text-2xl font-display font-bold text-white cursor-hover tracking-wider"
//               >
//                 AIT<span className="relative">Z<span className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-cyan-400 rounded-full"></span></span>AZZ
//               </a>
//             </MagneticWrapper>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-1 lg:gap-2">
//               {navLinks.filter(link => link.href !== "#contact").map((link) => (
//                 <MagneticWrapper key={link.href} strength={0.15}>
//                   <button
//                     onClick={() => handleLinkClick(link.href)}
//                     className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-sans font-medium tracking-wide transition-all duration-300 cursor-hover ${
//                       activeSection === link.href.replace("#", "")
//                         ? "text-white"
//                         : "text-gray-400 hover:text-white"
//                     }`}
//                   >
//                     {link.label}
//                   </button>
//                 </MagneticWrapper>
//               ))}
              
//               {/* Contact button - styled differently */}
//               <MagneticWrapper strength={0.15}>
//                 <button
//                   onClick={() => handleLinkClick("#contact")}
//                   className="ml-2 lg:ml-4 px-4 lg:px-6 py-2 rounded-full border border-white/30 text-xs lg:text-sm font-sans font-medium tracking-wide text-white hover:bg-white/10 transition-all duration-300 cursor-hover"
//                 >
//                   CONTACT
//                 </button>
//               </MagneticWrapper>
//             </div>

//             {/* Mobile menu button */}
//             <MagneticWrapper strength={0.2}>
//               <button
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//                 className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center glass cursor-hover"
//                 aria-label="Toggle menu"
//               >
//                 {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
//               </button>
//             </MagneticWrapper>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-40 md:hidden"
//           >
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="absolute inset-0 bg-background/95 backdrop-blur-xl"
//               onClick={() => setIsMobileMenuOpen(false)}
//             />

//             {/* Menu content */}
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: 50, opacity: 0 }}
//               transition={{ delay: 0.1 }}
//               className="relative h-full flex flex-col items-center justify-center gap-8"
//             >
//               {navLinks.map((link, index) => (
//                 <motion.button
//                   key={link.href}
//                   initial={{ y: 20, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   exit={{ y: 20, opacity: 0 }}
//                   transition={{ delay: 0.1 + index * 0.05 }}
//                   onClick={() => handleLinkClick(link.href)}
//                   className={`text-2xl font-display font-bold tracking-wide transition-colors cursor-hover ${
//                     activeSection === link.href.replace("#", "")
//                       ? "text-white"
//                       : "text-gray-400 hover:text-white"
//                   }`}
//                 >
//                   {link.label}
//                 </motion.button>
//               ))}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }


"use client";

export default function Navigation() {
  return (
    <header className="absolute top-0 right-0 w-full md:w-[50%] lg:w-[40%] h-16 md:h-20 bg-transparent py-4 md:py-6 z-20">
      <nav className="flex justify-center items-center h-full gap-6 md:gap-8 lg:gap-10 text-white text-sm md:text-[15px]">
        <a href="#about" className="hover:opacity-80 transition">About me</a>
        <a href="#skills" className="hover:opacity-80 transition">Skills</a>
        <a href="#portfolio" className="hover:opacity-80 transition">Portfolio</a>

        <button className="bg-primary text-white w-30 h-9 text-sm md:text-[15px] font-medium px-10  rounded-full hover:bg- transition">
          CONTACT ME
        </button>
      </nav>
    </header>
  );
}
