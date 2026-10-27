"use client";

import React, { useState, useEffect } from "react";
import { soundManager } from "../lib/sound";
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  FileText, 
  Menu, 
  X, 
  Sparkles,
  Bot,
  ExternalLink
} from "lucide-react";
import { PERSONAL_INFO } from "../lib/data";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  isMascotActive: boolean;
  onToggleMascot: () => void;
}

export default function Navbar({
  onOpenResume,
  onOpenTerminal,
  isMascotActive,
  onToggleMascot,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(soundManager.getIsMuted());

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  const navLinks = [
    { label: "Asosiy", href: "#hero" },
    { label: "Ko'nikmalar", href: "#skills" },
    { label: "Loyihalar", href: "#projects" },
    { label: "Tajriba", href: "#timeline" },
    { label: "Bog'lanish", href: "#contact" },
  ];

  const handleNavClick = () => {
    soundManager.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#090d16]/85 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={handleNavClick}
          onMouseEnter={() => soundManager.playHover()}
          className="group flex items-center gap-2.5 focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center font-mono font-bold text-cyan-300 text-sm tracking-wider">
              JA
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold tracking-tight text-base group-hover:text-cyan-300 transition-colors">
              Javohir
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 -mt-1 tracking-widest uppercase">
              Abdurazzoqov
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-full border border-cyan-500/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              onMouseEnter={() => soundManager.playHover()}
              className="text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Controls */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{PERSONAL_INFO.status}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
            aria-label="Ovoz sozlamasi"
            className="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Mascot Toggle */}
          <button
            onClick={() => {
              soundManager.playClick();
              onToggleMascot();
            }}
            title={isMascotActive ? "Kiber-Hamrohni yashirish" : "Kiber-Hamrohni chaqirish"}
            aria-label="Kiber-Hamroh"
            className={`p-2 rounded-xl border transition-colors ${
              isMascotActive
                ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                : "bg-slate-900/60 border-cyan-500/20 text-slate-400 hover:text-slate-200"
            }`}
          >
            <Bot className="w-4 h-4" />
          </button>

          {/* Terminal Console Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTerminal();
            }}
            title="Kiber Terminalni ochish"
            aria-label="Terminal"
            className="p-2 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-cyan-400 hover:text-cyan-200 hover:border-cyan-400/50 transition-colors"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all transform hover:scale-[1.02]"
          >
            <FileText className="w-4 h-4" />
            <span>Rezyume</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-slate-900/60 border border-cyan-500/20 text-slate-300"
            aria-label="Ovozni almashtirish"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/20 text-cyan-300 focus:outline-none"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pt-3 pb-5 bg-[#090d16]/95 backdrop-blur-2xl border-b border-cyan-500/20 space-y-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{PERSONAL_INFO.status}</span>
          </div>

          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className="text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-500 text-white font-medium text-xs shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Rezyume ko'rish</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminal();
              }}
              className="p-2 rounded-lg bg-slate-800 border border-cyan-500/30 text-cyan-300"
              title="Terminal"
            >
              <Terminal className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
