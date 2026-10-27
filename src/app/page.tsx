"use client";

import React, { useState } from "react";
import CyberBackground from "../components/CyberBackground";
import CyberMascot from "../components/CyberMascot";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SkillsMatrix from "../components/SkillsMatrix";
import ProjectsSection from "../components/ProjectsSection";
import TimelineSection from "../components/TimelineSection";
import ContactSection from "../components/ContactSection";
import TerminalEasterEgg from "../components/TerminalEasterEgg";
import ResumeModal from "../components/ResumeModal";
import Footer from "../components/Footer";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isMascotActive, setIsMascotActive] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#090d16] text-white overflow-hidden">
      {/* 1. 3D Interactive Dynamic Canvas Background */}
      <CyberBackground />

      {/* 2. Custom Animated Mascot Cursor Companion */}
      <CyberMascot enabled={isMascotActive} />

      {/* 3. Global Navbar */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        isMascotActive={isMascotActive}
        onToggleMascot={() => setIsMascotActive((prev) => !prev)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Section */}
        <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* Floating Skills Matrix */}
        <SkillsMatrix />

        {/* Projects Showcase Grid */}
        <ProjectsSection />

        {/* Timeline & Roadmap */}
        <TimelineSection />

        {/* Interactive Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Cyber Terminal Easter Egg */}
      <TerminalEasterEgg
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}
