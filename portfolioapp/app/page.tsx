"use client";

import dynamic from "next/dynamic";
import  Navigation from "@/app/components/Navigation";
import { Footer } from "@/app/components/Footer";
import { SmoothScrollProvider } from "@/app/components/providers/SmoothScrollProvider";
// import { CustomCursor } from "@/app/components/ui/CustomCursor";
import { LoadingScreen } from "@/app/components/ui/LoadingScreen";
import { DynamicLightRays } from "@/app/components/DynamicLightRays";

// Dynamic imports for better code splitting
const HeroSection = dynamic(  
  () =>
    import("@/app/components/sections/HeroSection").then(
      (mod) => mod.HeroSection
    ),
  { ssr: false }
);

const AboutSection = dynamic(
  () =>
    import("@/app/components/sections/AboutSection").then(
      (mod) => mod.AboutSection
    ),
  { ssr: false }
);

const ProjectsSection = dynamic(
  () =>
    import("@/app/components/sections/ProjectsSection").then(
      (mod) => mod.ProjectsSection
    ),
  { ssr: false }
);

const ServicesSection = dynamic(
  () =>
    import("@/app/components/sections/ServicesSection").then(
      (mod) => mod.ServicesSection
    ),
  { ssr: false }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/app/components/sections/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection
    ),
  { ssr: false }
);

const ContactSection = dynamic(
  () =>
    import("@/app/components/sections/ContactSection").then(
      (mod) => mod.ContactSection
    ),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      {/* Dynamic Light Rays Background */}
      <DynamicLightRays />
      
      <Navigation />
      <LoadingScreen />
      {/* <SmoothScrollProvider> */}
        {/* <CustomCursor /> */}
        <main className="noise relative z-10">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ServicesSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      {/* </SmoothScrollProvider> */}
    </>
  );
}
