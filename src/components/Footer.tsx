"use client";

import React, { useState, useEffect } from "react";
import { soundManager } from "../lib/sound";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../lib/data";
import { 
  ArrowUp, 
  Heart, 
  Clock, 
  MapPin, 
  Sparkles, 
  Mail, 
  Code
} from "lucide-react";
import { GithubIcon, TelegramIcon, LinkedinIcon } from "./SocialIcons";

export default function Footer() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Uzbekistan timezone (UTC+5)
      const formatted = new Intl.DateTimeFormat("uz-UZ", {
        timeZone: "Asia/Tashkent",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "github": return <GithubIcon className="w-4 h-4" />;
      case "telegram": return <TelegramIcon className="w-4 h-4" />;
      case "email": return <Mail className="w-4 h-4" />;
      case "linkedin": return <LinkedinIcon className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative bg-[#060910] border-t border-cyan-500/20 pt-16 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px]">
                <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center font-mono font-bold text-cyan-300 text-sm">
                  JA
                </div>
              </div>
              <div>
                <span className="text-white font-bold text-lg">{PERSONAL_INFO.name}</span>
                <p className="text-xs font-mono text-cyan-400 -mt-0.5">{PERSONAL_INFO.title}</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              O'zbekistonda yuqori darajadagi zamonaviy veb-ilovalarni yaratish, ilg'or dizayn va tezkor arxitektura yechimlari.
            </p>

            {/* Live Uzbekistan Time */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
              <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span>Farg'ona vaqti:</span>
              <strong className="text-white">{localTime || "12:00:00"}</strong>
              <span className="text-slate-500">(GMT+5)</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Bo'limlar
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#hero" className="hover:text-cyan-300 transition-colors">
                  Bosh sahifa
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-cyan-300 transition-colors">
                  Ko'nikmalar matritsasi
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-300 transition-colors">
                  Amaliy loyihalar
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-cyan-300 transition-colors">
                  Tajriba va ta'lim
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-300 transition-colors">
                  Bog'lanish
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Connect */}
          <div className="md:col-span-4 space-y-3 text-left">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
              Ijtimoiy Tarmoqlar
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-300 text-xs transition-colors"
                >
                  {getSocialIcon(link.name)}
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            <p className="text-xs text-slate-500 font-mono pt-2">
              Litsenziya: MIT • Barcha loyihalar mualliflik huquqi bilan himoyalangan.
            </p>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1 font-mono">
            <span>© 2026 {PERSONAL_INFO.name}. Barcha huquqlar himoyalangan.</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all transform hover:-translate-y-1 shadow-sm"
          >
            <span>Tepaga qaytish</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
