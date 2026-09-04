import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Crown, CheckCircle2, ChevronRight } from 'lucide-react';
import { SparklesCanvas } from './SparklesCanvas';
import { apiFetch } from '../../utils/api';

export interface LaunchTimerState {
  isActive: boolean;
  timerMinutes: number;
  targetEndTime: string | Date | null;
  startedAt?: string | Date | null;
  title: string;
  subtitle: string;
  autoUnlock: boolean;
  isCompleted: boolean;
}

export const LaunchCountdownOverlay: React.FC = () => {
  const location = useLocation();
  const [timerData, setTimerData] = useState<LaunchTimerState | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ minutes: number; seconds: number } | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [quickInquiryName] = useState('');
  const [quickInquiryPhone, setQuickInquiryPhone] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Ref to track if visitor was actively on the countdown screen before reveal
  const wasActiveRef = useRef<boolean>(false);

  // Poll backend for launch timer status
  useEffect(() => {
    let isMounted = true;

    const fetchTimerStatus = async () => {
      try {
        const data = await apiFetch('/launch-timer');
        if (isMounted && data) {
          setTimerData(data);
        }
      } catch (err) {
        // Fallback silently if API offline
      }
    };

    fetchTimerStatus();
    const interval = setInterval(fetchTimerStatus, 4000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Track active state transition: Trigger reveal animation ONLY if user was actively watching the timer screen
  useEffect(() => {
    if (!timerData) return;

    const isFutureTarget = timerData.targetEndTime ? new Date(timerData.targetEndTime).getTime() > Date.now() : false;

    if (timerData.isActive && isFutureTarget && !isFinished) {
      wasActiveRef.current = true;
    } else if (!timerData.isActive && wasActiveRef.current && !isFinished && !isRevealing) {
      // Timer was active on screen, now turned off/revealed by admin
      wasActiveRef.current = false;
      triggerReveal();
    }
  }, [timerData?.isActive, timerData?.targetEndTime, isFinished, isRevealing]);

  // Calculate live countdown timer down to targetEndTime
  useEffect(() => {
    if (!timerData || !timerData.isActive || !timerData.targetEndTime || isFinished) {
      return;
    }

    const updateCountdown = () => {
      const target = new Date(timerData.targetEndTime!).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ minutes: 0, seconds: 0 });
        if (!isFinished && wasActiveRef.current) {
          wasActiveRef.current = false;
          triggerReveal();
        }
      } else {
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ minutes, seconds });
      }
    };

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerInterval);
  }, [timerData, isFinished]);

  // Lock body scroll ONLY when launch timer is active
  useEffect(() => {
    const shouldLock = timerData?.isActive && !isFinished && !location.pathname.startsWith('/admin');
    if (shouldLock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [timerData?.isActive, isFinished, location.pathname]);

  const triggerReveal = () => {
    setIsFinished(true);
    setShowSparkles(true);
    setIsRevealing(true);

    // Hide reveal curtains after animation finishes
    setTimeout(() => {
      setIsRevealing(false);
    }, 2500);

    // Stop sparkles after 6 seconds
    setTimeout(() => {
      setShowSparkles(false);
    }, 6000);
  };

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInquiryPhone) return;
    setInquirySubmitted(true);
    // Send to backend inquiry endpoint
    apiFetch('/inquiry', {
      method: 'POST',
      body: JSON.stringify({
        name: quickInquiryName || 'Launch Visitor',
        phone: quickInquiryPhone,
        service: 'Grand Launch VIP Access Request',
        notes: 'Requested launch callback during site countdown.'
      })
    }).catch(() => { });
  };

  // 1. Never display overlay on Admin pages (/admin, /admin/dashboard)
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  // 2. Don't display anything if launch mode is not active and reveal is complete
  if (!timerData?.isActive && !isRevealing && !showSparkles) {
    return null;
  }

  // Calculate percentage of timer completed
  let progressPercent = 100;
  if (timerData?.startedAt && timerData?.targetEndTime && timeLeft) {
    const start = new Date(timerData.startedAt).getTime();
    const end = new Date(timerData.targetEndTime).getTime();
    const total = end - start;
    const remaining = (timeLeft.minutes * 60 + timeLeft.seconds) * 1000;
    if (total > 0) {
      progressPercent = Math.max(0, Math.min(100, (remaining / total) * 100));
    }
  }

  return (
    <>
      {/* Explosive Celebration Sparkles Canvas */}
      <SparklesCanvas active={showSparkles} durationMs={5000} />

      <AnimatePresence>
        {(timerData?.isActive && !isFinished) && (
          <motion.div
            key="launch-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[9999] bg-[#1F0404] text-white flex flex-col items-center justify-between p-4 sm:p-8 overflow-y-auto font-serif selection:bg-[#D7A65B] selection:text-[#3D0A0A]"
          >
            {/* Background Ambient Glow & Royal Gold Damask Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#5A1212] via-[#2A0505] to-[#120202] opacity-90 pointer-events-none" />

            {/* Ambient Animated Pulsing Gold Orbs */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D7A65B]/15 rounded-full blur-3xl pointer-events-none"
            />

            {/* Top Royal Header */}
            <header className="relative z-10 w-full max-w-5xl flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-[#F3D18A] animate-pulse" />
                <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#F3D18A] uppercase">
                  Pheta By Nihar • Official Launch
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#D7A65B]/15 border border-[#D7A65B]/40 text-[#F3D18A] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Live Countdown</span>
              </div>
            </header>

            {/* Central Main Launch Stage */}
            <main className="relative z-10 my-auto flex flex-col items-center text-center max-w-3xl w-full py-8">
              {/* Emblem / Logo Container with Golden Aura */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="relative mb-6 group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-[#D7A65B] via-[#FFF3D1] to-[#C48B3C] rounded-full blur-xl opacity-50 group-hover:opacity-80 transition duration-700 animate-pulse"></div>
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-b from-white to-[#FDFBF7] rounded-full p-3 flex items-center justify-center border-4 border-[#D7A65B] shadow-2xl">
                  <img
                    src="/logo.png"
                    alt="Pheta By Nihar Logo"
                    className="w-full h-full object-contain mix-blend-multiply drop-shadow-md"
                  />
                </div>
              </motion.div>

              {/* Title & Tagline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-2 mb-8"
              >
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDFB] via-[#F3D18A] to-[#D7A65B] font-serif leading-tight">
                  {timerData.title || 'Grand Royal Launching Soon...'}
                </h1>
                <p className="text-xs sm:text-base text-[#E8D8C5] max-w-xl mx-auto font-sans tracking-wide leading-relaxed font-light">
                  {timerData.subtitle || 'Pheta By Nihar • Master Pheta Tying & Royal Wedding Collection'}
                </p>
              </motion.div>

              {/* Digital Royal Flip Countdown Cards */}
              {timeLeft && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex items-center justify-center gap-3 sm:gap-6 mb-8"
                >
                  {/* Minutes Card */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-28 sm:w-36 sm:h-40 bg-gradient-to-b from-[#3D0A0A] to-[#1A0303] border-2 border-[#D7A65B] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center relative overflow-hidden group">
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-white/5 border-b border-[#D7A65B]/30" />
                      <span className="text-4xl sm:text-6xl font-black text-[#F3D18A] tracking-wider font-mono">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs text-[#D7A65B] uppercase font-bold tracking-widest mt-1 font-sans">
                        Minutes
                      </span>
                    </div>
                  </div>

                  <span className="text-3xl sm:text-5xl font-black text-[#D7A65B] animate-pulse pb-6">:</span>

                  {/* Seconds Card */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-28 sm:w-36 sm:h-40 bg-gradient-to-b from-[#3D0A0A] to-[#1A0303] border-2 border-[#D7A65B] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center relative overflow-hidden group">
                      <div className="absolute top-0 inset-x-0 h-1/2 bg-white/5 border-b border-[#D7A65B]/30" />
                      <span className="text-4xl sm:text-6xl font-black text-[#F3D18A] tracking-wider font-mono">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] sm:text-xs text-[#D7A65B] uppercase font-bold tracking-widest mt-1 font-sans">
                        Seconds
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Gold Progress Bar */}
              <div className="w-full max-w-md bg-[#3D0A0A] h-2.5 rounded-full border border-[#D7A65B]/40 overflow-hidden mb-8 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#C48B3C] via-[#F3D18A] to-[#D7A65B] rounded-full transition-all duration-1000 ease-linear shadow-[0_0_10px_#F3D18A]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* VIP Early Callback / Notify Form */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="w-full max-w-md bg-[#2B0606]/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#D7A65B]/40 shadow-xl font-sans"
              >
                {inquirySubmitted ? (
                  <div className="flex items-center justify-center gap-3 text-emerald-400 font-semibold text-sm py-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>You're registered for VIP Access! We will connect soon.</span>
                  </div>
                ) : (
                  <form onSubmit={handleQuickInquiry} className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F3D18A]">
                      <Sparkles className="w-3.5 h-3.5 text-[#D7A65B]" />
                      <span>Request VIP Call Back Upon Launch</span>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        placeholder="Enter Phone Number..."
                        value={quickInquiryPhone}
                        onChange={(e) => setQuickInquiryPhone(e.target.value)}
                        required
                        className="flex-1 bg-[#1A0303] border border-[#D7A65B]/40 rounded-xl px-3 py-2 text-xs text-white placeholder-[#A08875] focus:outline-none focus:border-[#F3D18A]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-[#D7A65B] to-[#C48B3C] hover:from-[#F3D18A] hover:to-[#D7A65B] text-[#3D0A0A] font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <span>Notify Me</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </main>

            {/* Bottom Footer */}
            <footer className="relative z-10 w-full max-w-5xl flex items-center justify-between pb-2 text-[11px] text-[#A08875] font-sans">
              <span>© Pheta By Nihar. All Rights Reserved.</span>
              <span className="hidden sm:inline">Maharashtra's Premier Wedding Pheta Artist</span>
            </footer>
          </motion.div>
        )}

        {/* Grand Royal Velvet Cloth Curtain Opening Animation upon reveal */}
        {isRevealing && (
          <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden flex">
            {/* Top Royal Valance / Curtain Header Drape */}
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 1.6, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
              className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-[#3D0A0A] via-[#5A1410] to-[#2B0606] border-b-4 border-[#D7A65B] shadow-2xl z-30 flex items-center justify-center overflow-hidden"
            >
              {/* Scalloped Gold Trim Pattern */}
              <div className="w-full h-full bg-[radial-gradient(circle_at_bottom,_rgba(215,166,91,0.3)_0%,_transparent_70%)]" />
              <div className="absolute bottom-1 inset-x-0 flex justify-around text-[#F3D18A]">
                {[...Array(12)].map((_, i) => (
                  <Crown key={i} className="w-4 h-4 sm:w-6 sm:h-6 opacity-60" />
                ))}
              </div>
            </motion.div>

            {/* Left Royal Velvet Cloth Curtain Panel */}
            <motion.div
              initial={{ x: 0, skewY: 0 }}
              animate={{ x: '-105%', skewY: [-1, 2, 0] }}
              transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
              className="w-1/2 h-full bg-gradient-to-r from-[#1A0202] via-[#4A0D0D] to-[#2E0707] shadow-[20px_0_50px_rgba(0,0,0,0.9)] relative flex items-center justify-end overflow-hidden origin-left"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(90deg, 
                    rgba(0,0,0,0.4) 0px, 
                    rgba(255,255,255,0.06) 20px, 
                    rgba(0,0,0,0.5) 40px, 
                    rgba(0,0,0,0.2) 60px
                  ),
                  linear-gradient(135deg, #3D0A0A 0%, #6E1E18 50%, #2A0505 100%)
                `
              }}
            >
              {/* Gold Embroidered Center Border Edge */}
              <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-10 bg-gradient-to-b from-[#F3D18A] via-[#D7A65B] to-[#C48B3C] shadow-lg border-l border-[#FFFDFB]/40 flex flex-col items-center justify-around py-10 opacity-90">
                <div className="w-full h-full bg-[repeating-linear-gradient(0deg,_transparent_0px,_transparent_10px,_rgba(61,10,10,0.6)_10px,_rgba(61,10,10,0.6)_12px)]" />
              </div>

              {/* Silk Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/60 pointer-events-none" />

              {/* Center Royal Seal Emblem on Left Panel */}
              <div className="pr-10 sm:pr-16 text-[#F3D18A]/30">
                <Crown className="w-20 h-20 sm:w-32 sm:h-32" />
              </div>
            </motion.div>

            {/* Right Royal Velvet Cloth Curtain Panel */}
            <motion.div
              initial={{ x: 0, skewY: 0 }}
              animate={{ x: '105%', skewY: [1, -2, 0] }}
              transition={{ duration: 2.2, ease: [0.76, 0, 0.24, 1] }}
              className="w-1/2 h-full bg-gradient-to-l from-[#1A0202] via-[#4A0D0D] to-[#2E0707] shadow-[-20px_0_50px_rgba(0,0,0,0.9)] relative flex items-center justify-start overflow-hidden origin-right"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(90deg, 
                    rgba(0,0,0,0.4) 0px, 
                    rgba(255,255,255,0.06) 20px, 
                    rgba(0,0,0,0.5) 40px, 
                    rgba(0,0,0,0.2) 60px
                  ),
                  linear-gradient(225deg, #3D0A0A 0%, #6E1E18 50%, #2A0505 100%)
                `
              }}
            >
              {/* Gold Embroidered Center Border Edge */}
              <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-10 bg-gradient-to-b from-[#F3D18A] via-[#D7A65B] to-[#C48B3C] shadow-lg border-r border-[#FFFDFB]/40 flex flex-col items-center justify-around py-10 opacity-90">
                <div className="w-full h-full bg-[repeating-linear-gradient(0deg,_transparent_0px,_transparent_10px,_rgba(61,10,10,0.6)_10px,_rgba(61,10,10,0.6)_12px)]" />
              </div>

              {/* Silk Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/60 pointer-events-none" />

              {/* Center Royal Seal Emblem on Right Panel */}
              <div className="pl-10 sm:pl-16 text-[#F3D18A]/30">
                <Crown className="w-20 h-20 sm:w-32 sm:h-32" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
