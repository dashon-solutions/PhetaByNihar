import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, Sparkles, Check, RefreshCw, Eye, Globe } from 'lucide-react';
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

export const LaunchTimerManager: React.FC = () => {
  const [timerData, setTimerData] = useState<LaunchTimerState>({
    isActive: false,
    timerMinutes: 3,
    targetEndTime: null,
    title: 'Grand Royal Launching Soon...',
    subtitle: 'Pheta By Nihar • Master Pheta Tying & Royal Wedding Collection',
    autoUnlock: true,
    isCompleted: false
  });

  const [selectedMinutes, setSelectedMinutes] = useState<number>(3);
  const [customMinutesInput, setCustomMinutesInput] = useState<string>('3');
  const [titleInput, setTitleInput] = useState<string>('Grand Royal Launching Soon...');
  const [subtitleInput, setSubtitleInput] = useState<string>('Pheta By Nihar • Master Pheta Tying & Royal Wedding Collection');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [liveCountdown, setLiveCountdown] = useState<{ minutes: number; seconds: number } | null>(null);

  // Fetch current state
  const loadTimerSettings = async () => {
    try {
      const data = await apiFetch('/launch-timer');
      if (data) {
        setTimerData(data);
        if (data.timerMinutes) {
          setSelectedMinutes(data.timerMinutes);
          setCustomMinutesInput(String(data.timerMinutes));
        }
        if (data.title) setTitleInput(data.title);
        if (data.subtitle) setSubtitleInput(data.subtitle);
      }
    } catch (err) {
      console.error('Failed to load launch timer settings:', err);
    }
  };

  useEffect(() => {
    loadTimerSettings();
    const interval = setInterval(loadTimerSettings, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update live admin countdown
  useEffect(() => {
    if (!timerData.isActive || !timerData.targetEndTime) {
      setLiveCountdown(null);
      return;
    }

    const updateAdminTimer = () => {
      const target = new Date(timerData.targetEndTime!).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setLiveCountdown({ minutes: 0, seconds: 0 });
      } else {
        const minutes = Math.floor(diff / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setLiveCountdown({ minutes, seconds });
      }
    };

    updateAdminTimer();
    const timer = setInterval(updateAdminTimer, 1000);
    return () => clearInterval(timer);
  }, [timerData.isActive, timerData.targetEndTime]);

  const handleStartTimer = async (minutesToStart?: number) => {
    const mins = minutesToStart || selectedMinutes;
    setLoading(true);
    setSuccessMessage(null);
    try {
      const updated = await apiFetch('/launch-timer', {
        method: 'PUT',
        body: JSON.stringify({
          action: 'start',
          timerMinutes: mins,
          title: titleInput,
          subtitle: subtitleInput,
          autoUnlock: true
        })
      });
      if (updated) {
        setTimerData(updated);
        setSuccessMessage(`🚀 Launch Countdown started for ${mins} minutes! Visitors will see the countdown.`);
      }
    } catch (err: any) {
      alert('Failed to start timer: ' + (err.message || 'Error'));
    } finally {
      setLoading(false);
    }
  };

  const handleStopOrReveal = async (actionType: 'reveal' | 'stop') => {
    setLoading(true);
    setSuccessMessage(null);
    try {
      const updated = await apiFetch('/launch-timer', {
        method: 'PUT',
        body: JSON.stringify({
          action: actionType
        })
      });
      if (updated) {
        setTimerData(updated);
        if (actionType === 'reveal') {
          setSuccessMessage('✨ Website Launched! Curtains parted & sparkles triggered for all visitors.');
        } else {
          setSuccessMessage('⏹️ Launch countdown stopped. Website is now fully visible.');
        }
      }
    } catch (err: any) {
      alert('Failed to update timer: ' + (err.message || 'Error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTextSettings = async () => {
    setLoading(true);
    setSuccessMessage(null);
    try {
      const updated = await apiFetch('/launch-timer', {
        method: 'PUT',
        body: JSON.stringify({
          title: titleInput,
          subtitle: subtitleInput
        })
      });
      if (updated) {
        setTimerData(updated);
        setSuccessMessage('Headline & Subtitle settings updated.');
      }
    } catch (err: any) {
      alert('Failed to save settings: ' + (err.message || 'Error'));
    } finally {
      setLoading(false);
    }
  };

  const presets = [1, 2, 3, 4, 5, 10];

  return (
    <div className="space-y-6 font-sans text-[#2E1A14]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#3D0A0A] via-[#5A1410] to-[#3D0A0A] text-white p-5 sm:p-6 rounded-2xl border-2 border-[#D7A65B] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-[#F3D18A] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#F3D18A]">
              Pheta By Nihar Launch Control
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
            Site Launch & Countdown Timer Manager
          </h2>
          <p className="text-xs text-[#E8D8C5] mt-1 max-w-xl">
            Configure countdown timeout (3, 4, 5+ minutes). When active, all website pages are hidden behind the luxury royal countdown overlay with logo. Once finished, sparkles burst & curtains open smoothly!
          </p>
        </div>

        {/* Active Status Badge */}
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 font-bold text-xs ${
            timerData.isActive
              ? 'bg-amber-500/20 border-amber-400/50 text-amber-200 animate-pulse'
              : 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200'
          }`}>
            <span className={`w-2.5 h-2.5 rounded-full ${timerData.isActive ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
            <span>{timerData.isActive ? 'LAUNCH MODE ACTIVE' : 'WEBSITE IS LIVE'}</span>
          </div>

          <button
            onClick={loadTimerSettings}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#F3D18A] transition-all cursor-pointer"
            title="Refresh Status"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5 text-xs font-bold">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Grid Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Timeout Selection & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Preset Minute Selectors */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8D8C5] shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#4D2D22] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D7A65B]" />
                Select Countdown Timeout (Minutes)
              </h3>
              <span className="text-xs font-semibold text-[#888888]">Selected: {selectedMinutes} Mins</span>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presets.map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => {
                    setSelectedMinutes(mins);
                    setCustomMinutesInput(String(mins));
                  }}
                  className={`py-3 px-2 rounded-xl text-center font-bold text-xs border transition-all cursor-pointer flex flex-col items-center ${
                    selectedMinutes === mins
                      ? 'bg-gradient-to-r from-[#6E1E18] to-[#8A2B24] text-white border-[#6E1E18] shadow-md scale-105'
                      : 'bg-[#FAF6F0] hover:bg-[#F3EBE0] text-[#4D2D22] border-[#E8D8C5]'
                  }`}
                >
                  <span className="text-base sm:text-lg">{mins}</span>
                  <span className="text-[10px] opacity-80 uppercase font-semibold">Min{mins > 1 ? 's' : ''}</span>
                </button>
              ))}
            </div>

            {/* Custom Minutes Input */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-semibold text-[#4D2D22]">Or Custom Minutes:</span>
              <input
                type="number"
                min="1"
                max="120"
                value={customMinutesInput}
                onChange={(e) => {
                  setCustomMinutesInput(e.target.value);
                  const num = Number(e.target.value);
                  if (num > 0) setSelectedMinutes(num);
                }}
                className="w-24 px-3 py-2 bg-[#FAF6F0] border border-[#E8D8C5] rounded-xl text-xs font-bold text-[#4D2D22] focus:outline-none focus:border-[#6E1E18]"
              />
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8D8C5] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#4D2D22]">
              Launch Control Triggers
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Turn ON Launch Timer */}
              <button
                onClick={() => handleStartTimer()}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#6E1E18] to-[#8A2B24] hover:from-[#581813] hover:to-[#73231D] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start {selectedMinutes} Min Launch Timer</span>
              </button>

              {/* Reveal Instantly */}
              <button
                onClick={() => handleStopOrReveal('reveal')}
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D7A65B] to-[#C48B3C] hover:from-[#E3B56C] hover:to-[#D7A65B] text-[#3D0A0A] font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch & Reveal Site Now</span>
              </button>
            </div>

            {/* Stop Timer Button */}
            {timerData.isActive && (
              <button
                onClick={() => handleStopOrReveal('stop')}
                disabled={loading}
                className="w-full py-2.5 px-4 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Square className="w-4 h-4" />
                <span>Deactivate Launch Mode Immediately</span>
              </button>
            )}
          </div>

          {/* Text Settings (Title & Subtitle) */}
          <div className="bg-white p-5 rounded-2xl border border-[#E8D8C5] shadow-xs space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#4D2D22]">
              Customize Launch Screen Text
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#4D2D22] mb-1">Headline Title</label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#E8D8C5] rounded-xl text-xs text-[#4D2D22] focus:outline-none focus:border-[#6E1E18]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4D2D22] mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={subtitleInput}
                  onChange={(e) => setSubtitleInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#E8D8C5] rounded-xl text-xs text-[#4D2D22] focus:outline-none focus:border-[#6E1E18]"
                />
              </div>

              <button
                onClick={handleSaveTextSettings}
                disabled={loading}
                className="py-2 px-4 rounded-xl bg-[#4D2D22] hover:bg-[#3B221A] text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              >
                Save Text Changes
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Status & Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Admin Countdown Monitor */}
          <div className="bg-gradient-to-b from-[#2B0606] to-[#120202] text-white p-5 rounded-2xl border-2 border-[#D7A65B] shadow-lg space-y-4 font-serif">
            <div className="flex items-center justify-between border-b border-[#D7A65B]/30 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F3D18A] flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-[#D7A65B]" />
                Live Timer Monitor
              </span>
              <span className="text-[10px] text-[#D7A65B] uppercase font-sans">Syncing</span>
            </div>

            {timerData.isActive && liveCountdown ? (
              <div className="text-center py-4 space-y-2">
                <div className="text-5xl font-black font-mono text-[#F3D18A] tracking-wider drop-shadow-md">
                  {String(liveCountdown.minutes).padStart(2, '0')}:{String(liveCountdown.seconds).padStart(2, '0')}
                </div>
                <p className="text-xs text-[#E8D8C5] font-sans">
                  Remaining until grand sparkle curtain reveal
                </p>
              </div>
            ) : (
              <div className="text-center py-6 space-y-2">
                <Globe className="w-8 h-8 text-[#D7A65B] mx-auto opacity-60" />
                <p className="text-xs text-[#E8D8C5] font-sans">
                  Launch timer is currently inactive. The website is live for all visitors.
                </p>
              </div>
            )}
          </div>

          {/* Mock Visitor Screen Preview Box */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8D8C5] shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#4D2D22]">
              Visitor Screen Mock Preview
            </h4>

            <div className="bg-[#1A0303] text-white rounded-xl p-4 border border-[#D7A65B]/40 space-y-3 text-center">
              <div className="w-12 h-12 bg-white rounded-full p-1 mx-auto border border-[#D7A65B]">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="text-xs font-serif font-bold text-[#F3D18A] truncate">
                {titleInput}
              </div>
              <div className="text-[10px] font-sans text-[#E8D8C5]/80 line-clamp-2">
                {subtitleInput}
              </div>
              <div className="bg-[#3D0A0A] py-2 px-3 rounded-lg border border-[#D7A65B]/30 font-mono text-sm text-[#F3D18A] font-bold">
                03 : 00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
