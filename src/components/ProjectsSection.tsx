"use client";

import React, { useState } from "react";
import { PROJECTS } from "../lib/data";
import { Project, ProjectCategory } from "../types";
import { soundManager } from "../lib/sound";
import ProjectModal from "./ProjectModal";
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filterTabs: { id: ProjectCategory; label: string }[] = [
    { id: "all", label: "Barchasi" },
    { id: "web", label: "Web Ilovalar" },
    { id: "ecommerce", label: "E-Commerce" },
    { id: "telegram", label: "Telegram Bot" },
    { id: "gameserver", label: "Minecraft / Game Server" },
  ];

  const filteredProjects = selectedCategory === "all"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const handleTabClick = (cat: ProjectCategory) => {
    soundManager.playClick();
    setSelectedCategory(cat);
  };

  const handleOpenDetails = (project: Project) => {
    soundManager.playClick();
    setActiveProject(project);
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Tanlangan Ishlar</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Amaliy{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Loyihalar Ko'rgazmasi
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Haqiqiy bizneslar va foydalanuvchilar uchun yaratilgan elektron savdo platformalari, veb-ilovalar, o'yin serverlari va avtomatlashtirilgan Telegram botlar.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedCategory === tab.id
                    ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "bg-slate-900/70 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-[#0d1424]/90 backdrop-blur-md border border-cyan-500/15 hover:border-cyan-400/50 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:-translate-y-1.5"
            >
              {/* Card Visual Banner Header */}
              <div
                className="relative h-48 p-6 flex flex-col justify-between overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.color}30 0%, #0d1424 100%)`,
                }}
              >
                {/* Cyber grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                {/* Top Badges */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-slate-900/80 border border-white/20 text-cyan-300 backdrop-blur-md">
                    {project.categoryLabel}
                  </span>

                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider"
                    style={{
                      backgroundColor: `${project.color}25`,
                      color: project.color,
                      border: `1px solid ${project.color}60`,
                    }}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Title and Icon inside Banner */}
                <div className="relative z-10 space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 text-left">
                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Metrics Highlights */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className="text-xs font-bold font-mono text-cyan-400">
                          {m.value}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/60 text-slate-300 font-mono text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 rounded-lg bg-slate-900/90 border border-slate-700/60 text-cyan-400 font-mono text-[11px]">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800/80">
                  <button
                    onClick={() => handleOpenDetails(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Batafsil ko'rish</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub kodi"
                        onClick={() => soundManager.playClick()}
                        className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400/50 text-slate-400 hover:text-white transition-colors"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Jonli platformani ochish"
                        onClick={() => soundManager.playClick()}
                        className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Wire in Project Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />

      </div>
    </section>
  );
}
