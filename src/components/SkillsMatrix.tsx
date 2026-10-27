"use client";

import React, { useState } from "react";
import { SKILLS } from "../lib/data";
import { Skill } from "../types";
import { soundManager } from "../lib/sound";
import { 
  Sparkles, 
  Layers, 
  Check, 
  ExternalLink, 
  Info, 
  X,
  Code2,
  FileCode,
  Zap,
  Palette,
  Terminal,
  LayoutGrid,
  Server,
  GitBranch,
  Rocket,
  Database,
  FileSpreadsheet,
  Globe
} from "lucide-react";

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const categories = [
    { id: "all", label: "Barchasi" },
    { id: "frontend", label: "Frontend & Next.js" },
    { id: "languages", label: "Dasturlash Tillari" },
    { id: "styling", label: "Dizayn & UI Kutubxonalari" },
    { id: "backend-tools", label: "Backend & Vositalar" },
  ];

  const filteredSkills = selectedCategory === "all"
    ? SKILLS
    : SKILLS.filter((s) => s.category === selectedCategory);

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case "Globe": return <Globe className="w-6 h-6" />;
      case "Code2": return <Code2 className="w-6 h-6" />;
      case "FileCode": return <FileCode className="w-6 h-6" />;
      case "Zap": return <Zap className="w-6 h-6" />;
      case "Palette": return <Palette className="w-6 h-6" />;
      case "Terminal": return <Terminal className="w-6 h-6" />;
      case "Layers": return <Layers className="w-6 h-6" />;
      case "LayoutGrid": return <LayoutGrid className="w-6 h-6" />;
      case "Server": return <Server className="w-6 h-6" />;
      case "GitBranch": return <GitBranch className="w-6 h-6" />;
      case "Rocket": return <Rocket className="w-6 h-6" />;
      case "Database": return <Database className="w-6 h-6" />;
      case "Sparkles": return <Sparkles className="w-6 h-6" />;
      default: return <FileSpreadsheet className="w-6 h-6" />;
    }
  };

  const handleCategorySelect = (catId: string) => {
    soundManager.playClick();
    setSelectedCategory(catId);
  };

  const handleSkillClick = (skill: Skill) => {
    soundManager.playClick();
    setActiveSkill(skill);
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Texnologik Arsenal</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Suzuvchi{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Ko'nikmalar Matritsasi
            </span>
          </h2>
          
          <p className="text-slate-400 text-base sm:text-lg">
            Zamonaviy raqamli mahsulotlarni qurishda qo'llaniladigan yetakchi texnologiyalar, kutubxonalar va dasturlash tillari. Har bir ko'nikma amaliy loyihalarda sinovdan o'tgan.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/30"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Skills Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredSkills.map((skill, index) => {
            const isHighlighted = skill.highlight;
            // Float animation stagger
            const floatDelay = (index % 5) * 0.4;

            return (
              <div
                key={skill.name}
                onClick={() => handleSkillClick(skill)}
                onMouseEnter={() => soundManager.playHover()}
                style={{
                  animationDelay: `${floatDelay}s`,
                }}
                className={`relative group cursor-pointer rounded-2xl p-5 bg-[#0d1424]/80 backdrop-blur-md border transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-float ${
                  isHighlighted
                    ? "border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]"
                    : "border-slate-800 hover:border-indigo-400/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                }`}
              >
                {/* Neon Glow under badge on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${skill.color}25 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                  {/* Skill Icon container */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110 shadow-inner"
                    style={{
                      backgroundColor: "rgba(15, 23, 42, 0.8)",
                      border: `1.5px solid ${skill.color}55`,
                      color: skill.color,
                    }}
                  >
                    {getSkillIcon(skill.iconName)}
                  </div>

                  {/* Skill Title */}
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {skill.experienceYears}
                    </span>
                  </div>

                  {/* Level progress bar */}
                  <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color,
                        boxShadow: `0 0 8px ${skill.color}`,
                      }}
                    />
                  </div>

                  {/* Bottom percentage */}
                  <div className="flex justify-between w-full text-[10px] font-mono text-slate-400">
                    <span>Tajriba</span>
                    <span style={{ color: skill.color }}>{skill.level}%</span>
                  </div>
                </div>

                {/* Highlight Badge */}
                {isHighlighted && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Active Skill Info Modal / Drawer */}
        {activeSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
            <div 
              className="relative w-full max-w-lg bg-[#0d1424] border-2 border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.35)] animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveSkill(null);
                }}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
                aria-label="Yopish"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center p-3 border-2"
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    borderColor: activeSkill.color,
                    color: activeSkill.color,
                    boxShadow: `0 0 20px ${activeSkill.color}40`,
                  }}
                >
                  {getSkillIcon(activeSkill.iconName)}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {activeSkill.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                    <span>Tajriba: <strong className="text-cyan-300">{activeSkill.experienceYears}</strong></span>
                    <span>•</span>
                    <span>O'zlashtirish: <strong style={{ color: activeSkill.color }}>{activeSkill.level}%</strong></span>
                  </div>
                </div>
              </div>

              {/* Skill Progress Bar */}
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-xs font-mono text-slate-300">
                  <span>Texnik mahorat darajasi</span>
                  <span style={{ color: activeSkill.color }}>{activeSkill.level}% / 100%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${activeSkill.level}%`,
                      backgroundColor: activeSkill.color,
                      boxShadow: `0 0 10px ${activeSkill.color}`,
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Info className="w-4 h-4" />
                  <span>Amaliy Foydalanish & Arxitektura:</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeSkill.description}
                </p>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveSkill(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-medium text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-colors"
                >
                  Tushundim
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
