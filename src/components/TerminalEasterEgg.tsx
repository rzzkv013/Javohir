"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { soundManager } from "../lib/sound";
import { PERSONAL_INFO, SKILLS, PROJECTS } from "../lib/data";
import { Terminal as TerminalIcon, X, Minimize2, Maximize2, Sparkles, Send } from "lucide-react";

interface TerminalEasterEggProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandOutput {
  command: string;
  output: React.ReactNode;
}

export default function TerminalEasterEgg({ isOpen, onClose }: TerminalEasterEggProps) {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1">
          <p className="text-cyan-400 font-bold">
            Javohir Abdurazzoqov Cyber Terminal [Versiya 2.4.0]
          </p>
          <p className="text-slate-400 text-xs">
            Barcha buyruqlar ro'yxatini ko'rish uchun <span className="text-cyan-300 font-semibold">'help'</span> deb yozing.
          </p>
        </div>
      ),
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    soundManager.playClick();
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    let res: React.ReactNode = null;

    switch (cmd) {
      case "help":
        res = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-bold mb-1">Mavjud buyruqlar:</p>
            <p><span className="text-amber-300 font-mono w-24 inline-block">help</span> - Barcha buyruqlar qo'llanmasi</p>
            <p><span className="text-amber-300 font-mono w-24 inline-block">about</span> - Javohir haqida umumiy ma'lumot</p>
            <p><span className="text-amber-300 font-mono w-24 inline-block">skills</span> - Ko'nikmalar va texnologiyalar</p>
            <p><span className="text-amber-300 font-mono w-24 inline-block">projects</span> - Asosiy loyihalar ro'yxati</p>
            <p><span className="text-amber-300 font-mono w-24 inline-block">contact</span> - Bog'lanish manzillari</p>
            <p><span className="text-amber-300 font-mono w-24 inline-block">confetti</span> - Qiziqarli konfetti bayrami</p>
            <p><span className="text-amber-300 font-mono w-24 inline-block">cat</span> - Kiber-Hamroh hayvonchasi</p>
            <p><span className="text-amber-300 font-mono w-24 inline-block">sudo</span> - Administrator huquqlari</p>
            <p><span className="text-amber-300 font-mono w-24 inline-block">clear</span> - Ekranni tozalash</p>
            <p><span className="text-amber-300 font-mono w-24 inline-block">exit</span> - Terminalni yopish</p>
          </div>
        );
        break;

      case "about":
      case "bio":
        res = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <p><strong className="text-cyan-400">Ism:</strong> {PERSONAL_INFO.name}</p>
            <p><strong className="text-cyan-400">Kasb:</strong> {PERSONAL_INFO.title}</p>
            <p><strong className="text-cyan-400">Manzil:</strong> {PERSONAL_INFO.location}</p>
            <p><strong className="text-cyan-400">Holat:</strong> {PERSONAL_INFO.status}</p>
            <p className="text-slate-400 pt-1 leading-relaxed">{PERSONAL_INFO.detailedBio}</p>
          </div>
        );
        break;

      case "skills":
        res = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-300 font-bold mb-1">Javohirning Texnologik Arsenali:</p>
            <div className="grid grid-cols-2 gap-1 text-slate-300">
              {SKILLS.map((s) => (
                <div key={s.name} className="flex justify-between pr-4">
                  <span className="text-white font-mono">{s.name}</span>
                  <span className="text-cyan-400 font-mono">{s.level}%</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        res = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-300 font-bold">Top Loyihalar:</p>
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="border-l border-cyan-500/30 pl-2">
                <p className="text-amber-300 font-bold font-mono">{idx + 1}. {p.title}</p>
                <p className="text-slate-400">{p.subtitle}</p>
                <p className="text-cyan-400/80 font-mono text-[10px]">Stack: {p.technologies.join(", ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        res = (
          <div className="space-y-1 text-xs text-slate-300">
            <p><span className="text-cyan-400 font-mono">Telegram:</span> {PERSONAL_INFO.telegram}</p>
            <p><span className="text-cyan-400 font-mono">Email:</span> {PERSONAL_INFO.email}</p>
            <p><span className="text-cyan-400 font-mono">GitHub:</span> https://github.com/{PERSONAL_INFO.github}</p>
            <p><span className="text-cyan-400 font-mono">Manzil:</span> {PERSONAL_INFO.location}</p>
          </div>
        );
        break;

      case "confetti":
        soundManager.playCelebration();
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 },
        });
        res = <p className="text-emerald-400 text-xs">🎉 Konfetti muvaffaqiyatli uchirildi!</p>;
        break;

      case "cat":
      case "mascot":
        res = (
          <div className="font-mono text-cyan-300 text-[11px] leading-tight space-y-1">
            <pre>{`
  /\\_/\\  
 ( o.o )  < "Miao! Kodlaringiz xatosiz ishlasin!" )
  > ^ <
            `}</pre>
            <p className="text-slate-400">Kiber-Hamroh sizga doimo yordamga tayyor!</p>
          </div>
        );
        break;

      case "sudo":
        res = (
          <p className="text-rose-400 text-xs font-mono">
            [Ruxsat rad etildi]: Sizga bu yerda root huquqi shart emas, barcha loyihalar ochiq kodli va bemalol ko'rish mumkin :)
          </p>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        return;

      default:
        res = (
          <p className="text-rose-400 text-xs">
            Buyruq topilmadi: <span className="font-mono text-white">'{cmd}'</span>. Mavjud buyruqlarni ko'rish uchun <span className="text-cyan-300">'help'</span> yozing.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: inputVal, output: res }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundManager.playKey();
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#090d16] border-2 border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.35)] overflow-hidden flex flex-col h-[520px]"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Titlebar */}
        <div className="bg-slate-900 px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-2">
              <button 
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors" 
                title="Yopish"
              />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <TerminalIcon className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-slate-300 font-semibold">
              javohir@fargona-dev-terminal:~
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Screen Body */}
        <div className="flex-1 p-4 font-mono overflow-y-auto text-left space-y-3 scrollbar-thin">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command !== "welcome" && (
                <div className="flex items-center gap-2 text-xs text-cyan-400">
                  <span className="text-emerald-400">guest@javohir:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              <div className="pl-0">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input line */}
        <form onSubmit={handleCommand} className="bg-slate-950 p-3 border-t border-cyan-500/20 flex items-center gap-2">
          <span className="font-mono text-xs text-emerald-400 whitespace-nowrap">
            guest@javohir:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="buyruq kiriting (masalan: help, skills, projects)..."
            className="flex-1 bg-transparent text-white font-mono text-xs outline-none focus:ring-0 placeholder:text-slate-600"
            autoFocus
          />
          <button
            type="submit"
            className="p-1 text-cyan-400 hover:text-cyan-300 transition-colors"
            title="Yuborish"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
}
