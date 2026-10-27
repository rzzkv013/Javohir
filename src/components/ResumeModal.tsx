"use client";

import React, { useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import { soundManager } from "../lib/sound";
import { PERSONAL_INFO, RESUME_DATA, SKILLS, TIMELINE_ITEMS, PROJECTS } from "../lib/data";
import { 
  X, 
  Printer, 
  Download, 
  MapPin, 
  Mail, 
  Send, 
  Briefcase, 
  GraduationCap, 
  Languages, 
  FileText
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { downloadResumePDF } from "../lib/pdfGenerator";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const handleDownload = () => {
    soundManager.playCelebration();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    // Directly generate and download real PDF file!
    downloadResumePDF();
  };

  // Group skills cleanly by category without any percentage numbers
  const categorizedSkills = {
    "Frontend": SKILLS.filter(s => s.category === "frontend").map(s => s.name),
    "Dasturlash Tillari": SKILLS.filter(s => s.category === "languages").map(s => s.name),
    "Styling & UI": SKILLS.filter(s => s.category === "styling").map(s => s.name),
    "Backend & Vositalar": SKILLS.filter(s => s.category === "backend-tools").map(s => s.name),
  };

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: "any" } as Record<string, string>)}
      aria-labelledby="resume-modal-title"
      className="backdrop:bg-black/80 backdrop:backdrop-blur-sm p-0 bg-transparent border-none max-w-4xl w-[95%] rounded-2xl outline-none shadow-2xl fixed inset-0 m-auto z-50 overflow-hidden"
    >
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Control Header Bar */}
        <div className="px-5 py-3.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-zinc-100">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-zinc-300" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-200">
              Rezyume (CV) • Oddiy Oq-Qora Format
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors"
              title="Chop etish"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chop etish</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-semibold shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF Yuklab olish</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Minimalist Black and White Resume Sheet */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-zinc-100/90 text-left">
          
          <div className="bg-white text-zinc-900 shadow-md rounded-xl p-6 sm:p-10 border border-zinc-300/80 max-w-3xl mx-auto space-y-6 print:shadow-none print:border-none print:p-0">
            
            {/* 1. Header: Name, Title, and Contact Info */}
            <div className="border-b-2 border-zinc-900 pb-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h1 id="resume-modal-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 uppercase">
                    {RESUME_DATA.fullName}
                  </h1>
                  <p className="text-base font-medium text-zinc-700 mt-1">
                    {RESUME_DATA.headline}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-zinc-600 sm:text-right font-medium">
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-700" />
                    <span>{RESUME_DATA.contact.location}</span>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-zinc-700" />
                    <a href={`mailto:${RESUME_DATA.contact.email}`} className="hover:underline text-zinc-800">
                      {RESUME_DATA.contact.email}
                    </a>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <Send className="w-3.5 h-3.5 text-zinc-700" />
                    <span>{RESUME_DATA.contact.telegram}</span>
                  </p>
                  <p className="flex items-center sm:justify-end gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-zinc-700" />
                    <a href="https://github.com/rzzkv013" target="_blank" rel="noopener noreferrer" className="hover:underline text-zinc-800">
                      {RESUME_DATA.contact.github}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Professional Summary (Umumiy Xulosa) */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Umumiy Xulosa (Summary)
              </h2>
              <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                {RESUME_DATA.summary}
              </p>
            </div>

            {/* 3. Technical Skills (Oddiy, foizsiz, toza guruhlangan) */}
            <div className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Texnik Ko'nikmalar (Technical Skills)
              </h2>
              
              <div className="space-y-2 text-xs text-zinc-800">
                {Object.entries(categorizedSkills).map(([category, items]) => (
                  <div key={category} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <span className="font-semibold text-zinc-950 sm:w-36 shrink-0">
                      {category}:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 bg-zinc-100 border border-zinc-300 rounded text-[11px] text-zinc-800 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Work Experience (Ish Tajribasi) */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-zinc-800" />
                <span>Ish Tajribasi (Work Experience)</span>
              </h2>

              <div className="space-y-4">
                {TIMELINE_ITEMS.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between font-semibold text-zinc-900 text-xs sm:text-sm">
                      <span>{item.title}</span>
                      <span className="text-zinc-600 font-normal text-xs">{item.year}</span>
                    </div>
                    <div className="text-zinc-600 font-medium">
                      {item.organization} • {item.location}
                    </div>
                    <p className="text-zinc-700 leading-relaxed pt-0.5">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.skills.map((s) => (
                        <span key={s} className="px-1.5 py-0.5 bg-zinc-100 text-zinc-700 rounded text-[10px] border border-zinc-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Key Featured Projects (Asosiy Loyihalar) */}
            <div className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-200 pb-1">
                Asosiy Loyihalar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {PROJECTS.slice(0, 4).map((p) => (
                  <div key={p.id} className="p-2.5 rounded-lg border border-zinc-200 bg-zinc-50/70 space-y-1">
                    <div className="font-semibold text-zinc-900 text-xs">{p.title}</div>
                    <div className="text-zinc-500 text-[10px] uppercase tracking-wide">{p.categoryLabel}</div>
                    <p className="text-zinc-600 text-[11px] line-clamp-2 leading-tight">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Languages & Interests (Tillar va Qiziqishlar) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-zinc-200">
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-zinc-800" />
                  <span>Tillar (Languages)</span>
                </h3>
                <div className="space-y-1 text-xs text-zinc-700">
                  {RESUME_DATA.languages.map((lang) => (
                    <div key={lang.name} className="flex justify-between">
                      <span className="font-medium text-zinc-900">{lang.name}:</span>
                      <span className="text-zinc-600">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-800" />
                  <span>Tamoyillar & Qiziqishlar</span>
                </h3>
                <ul className="space-y-0.5 text-xs text-zinc-700 list-disc list-inside">
                  {RESUME_DATA.interests.slice(0, 3).map((interest) => (
                    <li key={interest} className="truncate">{interest}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    </dialog>
  );
}
