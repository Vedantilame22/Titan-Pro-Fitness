import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Radio,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Plus,
  Disc3,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { Badge } from '../common/Badge';

export const FloatingAudioPlayer: React.FC = () => {
  const {
    stations,
    currentStation,
    isPlaying,
    isMuted,
    volume,
    trackTitle,
    trackArtist,
    trackThumbnail,
    currentTime,
    duration,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    switchStation,
    loadCustomPlaylist,
    seekTo,
  } = useAudio();

  const [showStations, setShowStations] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remaining = Math.floor(secs % 60);
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(pct);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    loadCustomPlaylist(customInput);
    setCustomInput('');
    setShowStations(false);
  };

  // Minimized floating bubble
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-50 pointer-events-auto">
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 dark:bg-[#0c0e14]/95 text-white border border-emerald-500/40 shadow-2xl backdrop-blur-xl hover:scale-105 transition-all cursor-pointer"
        >
          <div className="relative">
            <Radio className={`w-4 h-4 text-emerald-400 ${isPlaying ? 'animate-pulse' : ''}`} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            )}
          </div>
          <span className="text-xs font-normal max-w-[120px] truncate">
            {trackTitle || 'Gym Radio'}
          </span>
          <Maximize2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-3 sm:px-6 pb-3 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        {/* Stations & Custom Playlist Drawer */}
        {showStations && (
          <div className="mb-2.5 p-5 bg-slate-900/95 dark:bg-[#0c0e14]/95 text-white border border-emerald-500/30 rounded-3xl shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                Ad-Free Workout Stations ({stations.length})
              </span>
              <button
                onClick={() => setShowStations(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Station Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4 max-h-52 overflow-y-auto pr-1">
              {stations.map((st) => (
                <button
                  key={st.id}
                  onClick={() => {
                    switchStation(st.id);
                    setShowStations(false);
                  }}
                  className={`flex items-start justify-between p-3 rounded-2xl text-left text-xs transition-all cursor-pointer border ${
                    st.id === currentStation.id
                      ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-800/50 dark:bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="truncate mr-2">
                    <p className="font-medium truncate text-white">{st.name}</p>
                    <p className="text-[11px] font-normal text-slate-400 truncate mt-0.5">
                      {st.description}
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                    {st.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Custom Playlist URL / ID Input Form */}
            <form onSubmit={handleAddCustom} className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Paste any YouTube Playlist URL or ID (e.g. PL...)..."
                className="flex-1 px-3.5 py-2 text-xs bg-slate-800 dark:bg-black/60 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Load Playlist</span>
              </button>
            </form>
          </div>
        )}

        {/* Main Floating Audio Player Dock */}
        <div className="relative bg-slate-900/95 dark:bg-[#090b10]/95 text-white border border-slate-700/60 dark:border-slate-800/80 rounded-2xl sm:rounded-full px-4 sm:px-6 py-3 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Scrubber line for progress */}
          <div
            onClick={handleSeek}
            className="absolute top-0 left-6 right-6 h-1 bg-slate-800 hover:h-2 rounded-t-full cursor-pointer transition-all overflow-hidden"
            title="Click to seek"
          >
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Left: Artwork Disc + Title + Equalizer */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-3">
              {/* Rotating Vinyl / Artwork Disc */}
              <div
                onClick={() => setShowStations(!showStations)}
                className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-emerald-500/40 flex-shrink-0 cursor-pointer shadow-md group"
                title="Click to switch workout stations"
              >
                {trackThumbnail ? (
                  <img
                    src={trackThumbnail}
                    alt="Cover"
                    className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-emerald-400">
                    <Disc3 className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>

              {/* Title & Channel */}
              <div className="text-left max-w-[170px] sm:max-w-[230px]">
                <p className="text-xs sm:text-sm font-medium text-white truncate">
                  {trackTitle}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-normal text-slate-400">
                  <span className="truncate">{trackArtist}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium whitespace-nowrap">
                    {currentStation.genre}
                  </span>
                </div>
              </div>
            </div>

            {/* Sound Wave Equalizer (Deluxe Style) */}
            <div className="flex items-end gap-0.5 h-3.5 px-2">
              <span
                className={`w-1 bg-emerald-400 rounded-full transition-all ${
                  isPlaying ? 'animate-sound-wave' : 'h-1'
                }`}
                style={{ animationDelay: '0ms' }}
              />
              <span
                className={`w-1 bg-emerald-400 rounded-full transition-all ${
                  isPlaying ? 'animate-sound-wave' : 'h-2'
                }`}
                style={{ animationDelay: '250ms' }}
              />
              <span
                className={`w-1 bg-emerald-400 rounded-full transition-all ${
                  isPlaying ? 'animate-sound-wave' : 'h-1'
                }`}
                style={{ animationDelay: '500ms' }}
              />
              <span
                className={`w-1 bg-emerald-400 rounded-full transition-all ${
                  isPlaying ? 'animate-sound-wave' : 'h-3'
                }`}
                style={{ animationDelay: '150ms' }}
              />
            </div>
          </div>

          {/* Center: Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevTrack}
              className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className={`p-2.5 rounded-full transition-all transform active:scale-95 cursor-pointer ${
                isPlaying
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/35'
                  : 'bg-white text-slate-900 hover:bg-emerald-400 hover:text-black'
              }`}
              title={isPlaying ? 'Pause' : 'Play Workout Beats'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Time progress */}
            {duration > 0 && (
              <span className="hidden md:inline text-[10px] font-mono text-slate-400 ml-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            )}
          </div>

          {/* Right: Volume & Station Selector */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseInt(e.target.value, 10))}
                className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            <button
              onClick={() => setShowStations(!showStations)}
              className="px-3 py-1 text-xs font-normal rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700/80 flex items-center gap-1.5 text-slate-200 cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Stations</span>
              {showStations ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>

            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Minimize to floating button"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
