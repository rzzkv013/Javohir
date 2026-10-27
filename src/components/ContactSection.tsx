"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { soundManager } from "../lib/sound";
import { PERSONAL_INFO } from "../lib/data";
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare,
  ArrowRight,
  User,
  AtSign,
  FileQuestion
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.contactInfo.trim() || !formData.message.trim()) {
      setErrorMessage("Iltimos, ismingiz, aloqa ma'lumotingiz va xabaringizni to'ldiring.");
      return;
    }

    setIsSubmitting(true);
    soundManager.playClick();

    // Simulate sending with high-tech response
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundManager.playCelebration();

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#818cf8", "#34d399", "#f59e0b"],
      });

      // Reset form fields
      setFormData({
        name: "",
        contactInfo: "",
        subject: "",
        message: "",
      });
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Send className="w-3.5 h-3.5" />
            <span>Aloqa & Hamkorlik</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Birgalikda Yangi{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Loyiha Boshlaymizmi?
            </span>
          </h2>

          <p className="text-slate-400 text-base sm:text-lg">
            Sizning biznesingiz yoki yangi startapingiz uchun zamonaviy veb-sayt, elektron do'kon yoki murakkab foydalanuvchi interfeysi kerakmi? Menga to'g'ridan-to'g'ri yozing!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            <div className="bg-[#0d1424]/90 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>To'g'ridan-to'g'ri Aloqa</span>
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Quyidagi aloqa kanallari orqali istalgan vaqtda murojaat qilishingiz mumkin. Odatda 1 soat ichida javob beraman.
              </p>

              {/* Telegram Card */}
              <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Telegram Shaxsiy</div>
                      <div className="text-sm font-bold text-white">{PERSONAL_INFO.telegram}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopy(PERSONAL_INFO.telegram, "telegram")}
                      title="Nusxalash"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    >
                      {copiedType === "telegram" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={PERSONAL_INFO.telegramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-medium transition-colors"
                    >
                      Yozish
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-4 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-slate-400">Email Xat</div>
                      <div className="text-xs sm:text-sm font-bold text-white truncate max-w-[170px] sm:max-w-[210px]">
                        {PERSONAL_INFO.email}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(PERSONAL_INFO.email, "email")}
                    title="Emailni nusxalash"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                  >
                    {copiedType === "email" ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Joylashuv</div>
                  <div className="text-sm font-bold text-white">{PERSONAL_INFO.location}</div>
                </div>
              </div>

              {/* Working hours status */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Javob berish vaqti: 09:00 - 22:00</span>
                </span>
                <span className="text-emerald-400">GMT+5 (Toshkent)</span>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 text-left">
            <div className="bg-[#0d1424]/90 backdrop-blur-md border border-cyan-500/20 rounded-3xl p-6 sm:p-8 relative">
              
              <div className="mb-6 space-y-1">
                <h3 className="text-2xl font-bold text-white">
                  Xabar Yuborish Formasi
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Loyiha taklifi yoki savolingizni yozib qoldiring, tezda aloqaga chiqaman.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.5)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    Xabaringiz Qabul Qilindi!
                  </h4>
                  <p className="text-slate-300 text-sm max-w-md">
                    Hurmatli hamkor, yuborgan ma'lumotlaringiz uchun tashakkur! Javohir tez orada siz bilan ko'rsatilgan kontakt orqali bog'lanadi.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-medium text-sm transition-colors"
                  >
                    Yana xabar yuborish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Ismingiz *</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Masalan: Azizbek"
                        className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Email / Telegram */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                        <AtSign className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Email yoki Telegram *</span>
                      </label>
                      <input
                        type="text"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        placeholder="@username yoki email@mail.com"
                        className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <FileQuestion className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Xabar Mavzusi</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Masalan: E-commerce platformasi yaratish bo'yicha"
                      className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Loyiha Tavsifi / Xabar *</span>
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Loyihangiz maqsadi, muddati va kerakli xususiyatlari haqida qisqacha yozing..."
                      className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Xabarni Yuborish</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] font-mono text-slate-500 text-center pt-1">
                    🔒 Ma'lumotlaringiz maxfiy saqlanadi va uchinchi shaxslarga berilmaydi.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
