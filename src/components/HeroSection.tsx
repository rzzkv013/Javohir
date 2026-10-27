"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { soundManager } from "../lib/sound";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../lib/data";
import { 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Mail, 
  Code, 
  Cpu, 
  ShieldCheck, 
  Flame,
  CheckCircle2
} from "lucide-react";
import { GithubIcon, TelegramIcon, LinkedinIcon } from "./SocialIcons";

interface HeroSectionProps {
  onOpenResume: () => void;
}

export default function HeroSection({ onOpenResume }: HeroSectionProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const fullText = PERSONAL_INFO.subtitles[currentTitleIndex];
    const typingSpeed = isDeleting ? 30 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % PERSONAL_INFO.subtitles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex]);

  const fireGreetingConfetti = () => {
    soundManager.playCelebration();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#38bdf8", "#818cf8", "#34d399", "#f43f5e"],
    });
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "github":
        return <GithubIcon className="w-5 h-5" />;
      case "telegram":
        return <TelegramIcon className="w-5 h-5" />;
      case "email":
        return <Mail className="w-5 h-5" />;
      case "linkedin":
        return <LinkedinIcon className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
                <span>{PERSONAL_INFO.location}</span>
                <span className="text-slate-400">|</span>
                <span className="text-white font-medium">🇺🇿 O'zbekiston</span>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{PERSONAL_INFO.status}</span>
              </div>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-sm tracking-widest uppercase">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Assalomu alaykum, xush kelibsiz!</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
                Men{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  {PERSONAL_INFO.name}
                </span>
              </h1>
            </div>

            {/* Dynamic Typewriter Title */}
            <div className="h-10 flex items-center">
              <span className="text-xl sm:text-2xl font-mono font-medium text-slate-300">
                {displayedText}
                <span className="inline-block w-2.5 h-6 bg-cyan-400 ml-1 animate-pulse align-middle" />
              </span>
            </div>

            {/* Short Bio */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {PERSONAL_INFO.shortBio}
            </p>

            {/* Social Links Row */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-1">
                Bog'lanish:
              </span>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => soundManager.playClick()}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-cyan-400/60 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all duration-200 group shadow-sm"
                  title={`${link.name}: ${link.handle}`}
                >
                  <span className="transition-transform group-hover:scale-110">
                    {getSocialIcon(link.name)}
                  </span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={() => {
                  soundManager.playClick();
                  fireGreetingConfetti();
                }}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Loyihalarni Ko'rish</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 hover:text-white font-semibold text-sm transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Rezyume ko'rish</span>
              </button>

              <a
                href="#contact"
                onClick={() => soundManager.playClick()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-slate-800/40 text-slate-300 hover:text-cyan-300 text-sm font-medium transition-colors"
              >
                <span>Xabar yuborish</span>
              </a>
            </div>

          </div>

          {/* Right Column: Holographic Cyber Avatar & Live Code Matrix */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-full max-w-[390px] flex items-center justify-center py-6">
              
              {/* Rotating outer orbital glow */}
              <div className="absolute inset-0 border-2 border-dashed border-cyan-500/25 rounded-3xl animate-pulse pointer-events-none" />
              <div className="absolute -inset-3 bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

              {/* Central Hexagonal / Cyber Shield */}
              <div className="relative w-full bg-gradient-to-br from-slate-900/95 via-[#0d1424]/95 to-[#090d16]/98 border-2 border-cyan-400/40 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.25)] flex flex-col justify-between group">
                
                {/* Header bar */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-[11px] text-cyan-400/80">~/javohir/profile.ts</span>
                </div>

                {/* Cyber Code Snippet inside terminal */}
                <div className="font-mono text-xs sm:text-[13px] text-left space-y-1.5 text-slate-300 py-3 leading-relaxed">
                  <p className="text-cyan-400">const <span className="text-indigo-300">developer</span> = &#123;</p>
                  <p className="pl-4 text-slate-400">name: <span className="text-emerald-300">"Javohir"</span>,</p>
                  <p className="pl-4 text-slate-400">role: <span className="text-emerald-300">"Frontend Next.js"</span>,</p>
                  <p className="pl-4 text-slate-400">location: <span className="text-emerald-300">"Farg'ona, UZ"</span>,</p>
                  <p className="pl-4 text-slate-400">stack: [</p>
                  <p className="pl-8 text-sky-300">"Next.js 14+", "React",</p>
                  <p className="pl-8 text-sky-300">"TypeScript", "Tailwind"</p>
                  <p className="pl-4 text-slate-400">],</p>
                  <p className="pl-4 text-slate-400">hireable: <span className="text-amber-300">true</span>,</p>
                  <p className="text-cyan-400">&#125;;</p>
                </div>

                {/* Bottom Quick Metric */}
                <div className="pt-3.5 mt-1 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Ready for Projects</span>
                  </div>
                  <button
                    onClick={fireGreetingConfetti}
                    title="Qarsak / Tabrik"
                    className="text-xs px-3 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-all font-mono"
                  >
                    🎉 Salom!
                  </button>
                </div>

              </div>

              {/* Floating satellite badges */}
              <div className="absolute -top-1 -right-2 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-cyan-400/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] text-cyan-300 text-xs font-mono flex items-center gap-1.5 animate-bounce z-10">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Next.js 14+</span>
              </div>

              <div className="absolute -bottom-2 -left-2 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-indigo-400/40 shadow-[0_0_15px_rgba(99,102,241,0.3)] text-indigo-300 text-xs font-mono flex items-center gap-1.5 z-10">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>React 19 & TS</span>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Stats Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 sm:mt-20">
          
          <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/15 hover:border-cyan-400/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] group">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-cyan-400 group-hover:scale-105 transition-transform">
              {PERSONAL_INFO.experienceYears}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
              Yillik Amaliy Tajriba
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              Frontend & Web Ekotizim
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/15 hover:border-cyan-400/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] group">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-indigo-400 group-hover:scale-105 transition-transform">
              {PERSONAL_INFO.completedProjects}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
              Muvaffaqiyatli Loyihalar
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              E-Commerce, Web, Botlar
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/15 hover:border-cyan-400/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] group">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 group-hover:scale-105 transition-transform">
              {PERSONAL_INFO.cleanCodeScore}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
              Toza & Optimallashtirilgan Kod
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              TypeScript & Lighthouse 95+
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-md border border-cyan-500/15 hover:border-cyan-400/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] group">
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-400 group-hover:scale-105 transition-transform">
              {PERSONAL_INFO.satisfiedClients}
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-300 mt-1">
              Mijozlar Mamnuniyati
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              Vaqtida va Sifatli Yetkazish
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
