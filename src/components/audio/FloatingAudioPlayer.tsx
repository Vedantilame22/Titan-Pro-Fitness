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
  Disc3,
  Minimize2,
  Maximize2,
  Flame,
  Zap,
  Dumbbell,
  Music,
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

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
    seekTo,
  } = useAudio();

  const [showStations, setShowStations] = useState(false);
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

  const getStationIcon = (genre: string) => {
    switch (genre) {
      case 'BGM / Mass Hits':
        return <Flame className="w-3.5 h-3.5 text-red-400" />;
      case 'EDM':
        return <Zap className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Hip-Hop / Heavy':
        return <Dumbbell className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Lo-Fi Chill':
        return <Radio className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Music className="w-3.5 h-3.5 text-purple-400" />;
    }
  };

  // Minimized floating pill
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
        {/* Stations Drawer - Clean single horizontal row */}
        {showStations && (
          <div className="mb-2.5 p-4 sm:p-5 bg-slate-900/95 dark:bg-[#0c0e14]/95 text-white border border-emerald-500/30 rounded-3xl shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
              <span className="font-semibold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400" />
                Select Workout Station
              </span>
              <button
                onClick={() => setShowStations(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Stations arranged in ONE line properly across 4 columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stations.map((st) => {
                const isActive = st.id === currentStation.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => {
                      switchStation(st.id);
                      setShowStations(false);
                    }}
                    className={`flex flex-col justify-between p-3.5 rounded-2xl text-left transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                        : 'bg-slate-800/40 dark:bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div className="p-1.5 rounded-lg bg-black/40 border border-white/5">
                        {getStationIcon(st.genre)}
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                        {st.badge}
                      </span>
                    </div>

                    <div>
                      <p className="font-semibold text-xs text-white truncate">{st.name}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5 font-normal">
                        {st.genre}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
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

            {/* Sound Wave Equalizer */}
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
                  <VolumeX className="w-3.5 h-3.5 text-red-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
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
