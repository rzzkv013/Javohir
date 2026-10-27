"use client";

import React, { useEffect, useRef } from "react";
import { Project } from "../types";
import { soundManager } from "../lib/sound";
import { 
  X, 
  ExternalLink, 
  CheckCircle, 
  Layers, 
  BarChart3, 
  Zap, 
  ArrowUpRight 
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [project]);

  // Handle light-dismiss fallback for all browsers
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isContent = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isContent) {
        soundManager.playClick();
        onClose();
      }
    };

    const handleCancel = (e: Event) => {
      e.preventDefault();
      soundManager.playClick();
      onClose();
    };

    dialog.addEventListener("click", handleBackdropClick);
    dialog.addEventListener("cancel", handleCancel);

    return () => {
      dialog.removeEventListener("click", handleBackdropClick);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as Record<string, string>)}
      aria-labelledby="project-modal-title"
      className="backdrop:bg-black/80 backdrop:backdrop-blur-md p-0 bg-transparent text-white border-none max-w-3xl w-[95%] rounded-3xl outline-none shadow-[0_0_60px_rgba(6,182,212,0.3)] fixed inset-0 m-auto z-50 overflow-hidden"
    >
      <div className="bg-[#0d1424] border-2 border-cyan-500/30 rounded-3xl overflow-hidden flex flex-col max-h-[88vh]">
        
        {/* Modal Visual Header */}
        <div 
          className="relative h-48 sm:h-60 p-6 flex flex-col justify-between overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}35 0%, #0d1424 100%)`,
          }}
        >
          {/* Cyber grid lines in modal header */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Top Bar with Badge & Close Button */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-900/80 border border-white/20 text-cyan-300">
              {project.categoryLabel} • {project.badge}
            </span>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-colors"
              aria-label="Modalni yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title in Header */}
          <div className="relative z-10 space-y-1">
            <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
          
          {/* Metrics row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-slate-900/70 border border-cyan-500/15 rounded-xl p-3 text-center">
                  <div className="text-base sm:text-lg font-bold font-mono text-cyan-400">
                    {m.value}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Loyiha Haqida Qisqacha</span>
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Features List */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Asosiy Imkoniyatlar & Funksiyalar</span>
            </h4>
            <ul className="space-y-2.5">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="text-cyan-400 mt-0.5 font-mono text-xs">0{idx + 1}.</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Chips */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Texnologik Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-cyan-300 font-mono text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-900/80 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
              >
                <span>Jonli Dasturni Ko'rish</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub Kodi</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
          >
            Yopish (Esc)
          </button>
        </div>

      </div>
    </dialog>
  );
}
