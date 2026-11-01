import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
        {/* Animated Playlist Drawer */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="mb-3 p-5 bg-[#0c0e16]/95 border border-red-500/30 rounded-3xl shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs text-slate-400">
                <span className="font-bold text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-red-400" />
                  Titan Beats Station Lineup ({tracks.length})
                </span>
                <button
                  onClick={() => setShowPlaylist(false)}
                  className="text-slate-400 hover:text-white font-medium text-xs px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-52 overflow-y-auto pr-1">
                {tracks.map((t, idx) => (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      playTrack(idx);
                      setShowPlaylist(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl text-left text-xs transition-all cursor-pointer ${
                      t.id === currentTrack.id
                        ? 'bg-red-500/20 border border-red-500/40 text-red-300 font-semibold'
                        : 'hover:bg-slate-800/70 text-slate-300 border border-transparent'
                    }`}
                  >
                    <div className="truncate mr-2">
                      <p className="font-semibold truncate">{t.title}</p>
                      <p className="text-[10px] text-slate-400">{t.artist}</p>
                    </div>
                    <Badge variant="flame" className="text-[10px] py-0.5 px-2 flex-shrink-0">
                      {t.genre}
                    </Badge>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bar Container */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-[#080a10]/95 text-white border border-slate-800 rounded-full px-4 sm:px-6 py-2.5 shadow-2xl shadow-red-500/10 backdrop-blur-2xl flex items-center justify-between gap-4"
        >
          {/* Left: Station Trigger & Track Info */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setShowPlaylist((prev) => !prev)}
              className="p-2.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25 transition-all flex-shrink-0 cursor-pointer"
              title="Stations Menu"
            >
              <Radio className="w-4 h-4" />
            </motion.button>

            <div className="text-left max-w-[130px] sm:max-w-[220px]">
              <p className="text-xs sm:text-sm font-bold text-white truncate">
                {currentTrack.title}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                <span className="truncate">{currentTrack.artist}</span>
                <span>•</span>
                <span className="text-orange-400 font-bold">{currentTrack.genre}</span>
              </div>
            </div>

            {/* Bouncing Sound Wave Equalizer in Crimson/Flame */}
            {isPlaying && (
              <div className="hidden sm:flex items-end gap-1 h-5 px-2">
                {[12, 18, 8, 22, 14].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ height: [4, h, 6] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.6 + i * 0.15,
                      repeatType: 'reverse',
                    }}
                    className="w-1 bg-gradient-to-t from-red-500 to-orange-400 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Center: Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTrack}
              className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={togglePlay}
              className="p-3 bg-gradient-to-tr from-red-600 via-rose-600 to-orange-500 text-white rounded-full font-bold shadow-lg shadow-red-600/35 transition-all cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTrack}
              className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Right: Volume & Drawer Toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
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
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            <button
              onClick={() => setShowPlaylist((prev) => !prev)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {showPlaylist ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
