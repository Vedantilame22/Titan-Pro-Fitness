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
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { Badge } from '../common/Badge';

export const FloatingAudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    isMuted,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    tracks,
    playTrack,
  } = useAudio();

  const [showPlaylist, setShowPlaylist] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 sm:px-6 pb-4 pointer-events-none">
      <div className="max-w-3xl mx-auto pointer-events-auto">
        {/* Playlist Drawer (if opened) */}
        {showPlaylist && (
          <div className="mb-2 p-4 bg-slate-900/95 dark:bg-[#0c0e14]/95 border border-emerald-500/25 rounded-3xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800 text-xs text-slate-400 font-normal">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                Ad-Free Workout Stations ({tracks.length})
              </span>
              <button
                onClick={() => setShowPlaylist(false)}
                className="text-slate-400 hover:text-white font-normal"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {tracks.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    playTrack(idx);
                    setShowPlaylist(false);
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-2xl text-left text-xs transition-all ${
                    t.id === currentTrack.id
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="truncate mr-2">
                    <p className="font-medium truncate">{t.title}</p>
                    <p className="text-[10px] font-normal text-slate-400">{t.artist}</p>
                  </div>
                  <Badge variant="neon" className="text-[10px] py-0 px-2 flex-shrink-0">
                    {t.genre}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Floating Bar Container */}
        <div className="relative bg-slate-900/95 dark:bg-[#0a0b10]/95 text-white border border-slate-700/60 dark:border-slate-800/80 rounded-full px-4 sm:px-6 py-2.5 shadow-2xl backdrop-blur-xl flex items-center justify-between gap-4">
          {/* Left: Track Info & Waveform */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPlaylist((prev) => !prev)}
              className="p-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25 transition-all flex-shrink-0"
              title="Choose Station"
            >
              <Radio className="w-4 h-4" />
            </button>

            <div className="text-left max-w-[150px] sm:max-w-[220px]">
              <p className="text-xs sm:text-sm font-medium text-white truncate">
                {currentTrack.title}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-normal text-slate-400">
                <span className="truncate">{currentTrack.artist}</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">{currentTrack.genre}</span>
              </div>
            </div>

            {/* Sound Wave Animation */}
            <div className="hidden sm:flex items-end gap-0.5 h-3.5 px-1">
              <span
                className={`w-0.5 bg-emerald-400 rounded-full transition-all ${
                  isPlaying ? 'animate-sound-wave' : 'h-1'
                }`}
                style={{ animationDelay: '0ms' }}
              />
              <span
                className={`w-0.5 bg-emerald-400 rounded-full transition-all ${
                  isPlaying ? 'animate-sound-wave' : 'h-2'
                }`}
                style={{ animationDelay: '200ms' }}
              />
              <span
                className={`w-0.5 bg-emerald-400 rounded-full transition-all ${
                  isPlaying ? 'animate-sound-wave' : 'h-1'
                }`}
                style={{ animationDelay: '400ms' }}
              />
            </div>
          </div>

          {/* Center: Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={prevTrack}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className={`p-2.5 rounded-full transition-all transform active:scale-95 ${
                isPlaying
                  ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/30'
                  : 'bg-white text-slate-900 hover:bg-emerald-400 hover:text-black'
              }`}
              title={isPlaying ? 'Pause' : 'Play Workout Beats'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={nextTrack}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Volume & Station Selector */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="text-slate-400 hover:text-white transition-colors"
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
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-14 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>

            <button
              onClick={() => setShowPlaylist((prev) => !prev)}
              className="px-3 py-1 text-xs font-normal rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700/80 flex items-center gap-1 text-slate-300"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Stations</span>
              {showPlaylist ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
