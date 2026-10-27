"use client";

import React, { useEffect, useState, useRef } from "react";
import { soundManager } from "../lib/sound";

interface CyberMascotProps {
  enabled?: boolean;
}

export default function CyberMascot({ enabled = true }: CyberMascotProps) {
  const [isVisible, setIsVisible] = useState(enabled);
  const [isClient, setIsClient] = useState(false);
  const [speechText, setSpeechText] = useState("Salom! Men Kiber-Hamroh 🤖");
  const [showSpeech, setShowSpeech] = useState(true);
  const [eyeState, setEyeState] = useState<"normal" | "blink" | "wink" | "happy" | "amazed">("normal");
  const [isClicking, setIsClicking] = useState(false);

  // Position state with lerp
  const mascotRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 100, y: 100, targetX: 100, targetY: 100, vx: 0, vy: 0 });
  const tiltRef = useRef(0);

  const speechMessages = [
    "Salom! Men Javohirning kiber-hamrohiman! 👋",
    "Next.js 14+ App Router juda tez ishlaydi! ⚡",
    "Loyihalar bo'limini ko'rdingizmi? Juda ajoyib! 🚀",
    "Javohir bilan Telegram orqali bog'lanishingiz mumkin! 💬",
    "Kodlar toza va to'liq turlangan (TypeScript)! 💎",
    "Rezyumeni yuklab olishingiz mumkin! 📄",
    "Savollaringiz bo'lsa, xabar qoldiring! ✉️",
    "O'zbekistonda eng zamonaviy Frontend yechimlari! 🇺🇿"
  ];

  useEffect(() => {
    setIsClient(true);

    // Initial position center-right
    if (typeof window !== "undefined") {
      pos.current.x = window.innerWidth * 0.8;
      pos.current.y = window.innerHeight * 0.4;
      pos.current.targetX = window.innerWidth * 0.8;
      pos.current.targetY = window.innerHeight * 0.4;
    }

    let isMobile = false;
    if (typeof window !== "undefined") {
      isMobile = window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window;
      if (isMobile) {
        // On mobile, keep it tucked neatly in bottom right instead of following pointer
        setIsVisible(false);
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Mascot follows cursor with comfortable offset so it doesn't block the cursor
      pos.current.targetX = e.clientX + 38;
      pos.current.targetY = e.clientY + 28;
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setEyeState("happy");
      soundManager.playClick();
      setTimeout(() => {
        setIsClicking(false);
        setEyeState("normal");
      }, 350);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });

    // Smooth Lerp loop
    let animId: number;
    const updatePosition = () => {
      // Spring/lerp interpolation
      const dx = pos.current.targetX - pos.current.x;
      const dy = pos.current.targetY - pos.current.y;

      pos.current.x += dx * 0.085;
      pos.current.y += dy * 0.085;

      // Dynamic tilt based on horizontal velocity
      const targetTilt = Math.max(-18, Math.min(18, dx * 0.4));
      tiltRef.current += (targetTilt - tiltRef.current) * 0.1;

      if (mascotRef.current) {
        mascotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${tiltRef.current}deg) scale(${isClicking ? 1.15 : 1})`;
      }

      animId = requestAnimationFrame(updatePosition);
    };

    animId = requestAnimationFrame(updatePosition);

    // Blinking timer
    const blinkInterval = setInterval(() => {
      setEyeState("blink");
      setTimeout(() => setEyeState("normal"), 180);
    }, 4500);

    // Random wink or amazed emotion
    const emotionInterval = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.6) {
        setEyeState("wink");
        setTimeout(() => setEyeState("normal"), 400);
      } else if (rand > 0.3) {
        setEyeState("amazed");
        setTimeout(() => setEyeState("normal"), 600);
      }
    }, 12000);

    // Cycle friendly speech tips
    let speechIdx = 0;
    const speechInterval = setInterval(() => {
      speechIdx = (speechIdx + 1) % speechMessages.length;
      setSpeechText(speechMessages[speechIdx]);
      setShowSpeech(true);

      // Hide bubble after 6 seconds
      setTimeout(() => {
        setShowSpeech(false);
      }, 5500);
    }, 14000);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      clearInterval(blinkInterval);
      clearInterval(emotionInterval);
      clearInterval(speechInterval);
    };
  }, [isClicking]);

  if (!isClient || !isVisible) return null;

  return (
    <div
      ref={mascotRef}
      className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out select-none"
      style={{ willChange: "transform" }}
    >
      {/* Speech Bubble */}
      {showSpeech && (
        <div className="absolute -top-16 -left-20 w-52 bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 text-cyan-200 text-xs px-3 py-2 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.35)] animate-in fade-in zoom-in-90 duration-200">
          <p className="font-medium leading-relaxed">{speechText}</p>
          {/* Bubble tail */}
          <div className="absolute -bottom-1.5 left-24 w-3 h-3 bg-slate-900 border-r border-b border-cyan-500/40 transform rotate-45" />
        </div>
      )}

      {/* Mascot Body Container */}
      <div className="relative w-16 h-16 group">
        {/* Glowing holographic cyber aura */}
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 rounded-full blur-md animate-pulse" />

        {/* Head Base */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-slate-800 via-slate-900 to-[#090d16] border-2 border-cyan-400/80 rounded-2xl shadow-[0_0_25px_rgba(6,182,212,0.5)] flex flex-col items-center justify-center overflow-hidden">
          {/* Cyber Ears / Antennas */}
          <div className="absolute -top-1 left-2 w-3 h-3 bg-cyan-400 rotate-45 rounded-sm border border-cyan-200" />
          <div className="absolute -top-1 right-2 w-3 h-3 bg-cyan-400 rotate-45 rounded-sm border border-cyan-200" />

          {/* Top Antenna Bulb */}
          <div className="absolute -top-3 w-1.5 h-3 bg-cyan-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>

          {/* Visor Screen */}
          <div className="w-12 h-8 bg-black/90 rounded-lg border border-cyan-500/50 flex items-center justify-around px-2 relative overflow-hidden">
            {/* Screen Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

            {/* Eyes */}
            {eyeState === "blink" ? (
              <>
                <div className="w-3.5 h-0.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#38bdf8]" />
                <div className="w-3.5 h-0.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#38bdf8]" />
              </>
            ) : eyeState === "wink" ? (
              <>
                <div className="w-3.5 h-3.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#38bdf8] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                </div>
                <div className="w-3.5 h-0.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#38bdf8]" />
              </>
            ) : eyeState === "happy" ? (
              <>
                <div className="text-cyan-300 text-xs font-bold leading-none select-none">^</div>
                <div className="text-cyan-300 text-xs font-bold leading-none select-none">^</div>
              </>
            ) : eyeState === "amazed" ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-cyan-300 rounded-full shadow-[0_0_10px_#38bdf8] animate-pulse" />
                <div className="w-3.5 h-3.5 border-2 border-cyan-300 rounded-full shadow-[0_0_10px_#38bdf8] animate-pulse" />
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_10px_#38bdf8] flex items-center justify-center">
                  <div className="w-1 h-1 bg-slate-900 rounded-full translate-x-0.5" />
                </div>
                <div className="w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_10px_#38bdf8] flex items-center justify-center">
                  <div className="w-1 h-1 bg-slate-900 rounded-full translate-x-0.5" />
                </div>
              </>
            )}
          </div>

          {/* Cyber Cheeks (Rosy LED Blush) */}
          <div className="w-10 flex justify-between px-1 mt-1">
            <div className="w-1.5 h-0.5 bg-rose-400 rounded-full shadow-[0_0_6px_#fb7185]" />
            <div className="w-1.5 h-0.5 bg-rose-400 rounded-full shadow-[0_0_6px_#fb7185]" />
          </div>
        </div>

        {/* Floating Thruster Flame beneath */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-3 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full blur-[2px] animate-ping opacity-75" />
          <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
