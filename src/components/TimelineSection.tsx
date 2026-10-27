"use client";

import React from "react";
import { TIMELINE_ITEMS } from "../lib/data";
import { soundManager } from "../lib/sound";
import { 
  Briefcase, 
  GraduationCap, 
  Milestone, 
  Calendar, 
  MapPin, 
  Sparkles, 
  CheckCircle2 
} from "lucide-react";

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Milestone className="w-3.5 h-3.5" />
            <span>Kasbiy O'sish & Tajriba</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tajriba va{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Ta'lim Yo'l Xaritasi
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Dasturlash sohasidagi bosqichma-bosqich rivojlanish, erishilgan marralar va amaliy loyihalardagi mas'uliyatlar.
          </p>
        </div>

        {/* Vertical Cyber Timeline */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          
          {TIMELINE_ITEMS.map((item, index) => {
            const isWork = item.type === "work";

            return (
              <div
                key={index}
                className="relative group text-left"
                onMouseEnter={() => soundManager.playHover()}
              >
                {/* Glowing Node on Timeline */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-[#090d16] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:scale-125 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-cyan-300" />
                </div>

                {/* Card Container */}
                <div className="bg-[#0d1424]/90 backdrop-blur-md border border-cyan-500/15 hover:border-cyan-400/40 rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]">
                  
                  {/* Top Meta info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                        <Calendar className="w-3 h-3" />
                        {item.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                        {item.period}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.location}</span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      {isWork ? (
                        <Briefcase className="w-4 h-4 text-cyan-400 inline" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-indigo-400 inline" />
                      )}
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-sm font-medium text-cyan-400/90 font-mono">
                      {item.organization}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Technologies / Skills used */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 font-mono text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
