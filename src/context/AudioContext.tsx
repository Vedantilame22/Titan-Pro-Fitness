import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { AudioTrack } from '../types';
import { AUDIO_TRACKS } from '../data/mockData';

interface AudioContextType {
  tracks: AudioTrack[];
  currentTrack: AudioTrack;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  togglePlay: () => void;
  playTrack: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (level: number) => void;
  toggleMute: () => void;
  isPlayerOpen: boolean;
  setIsPlayerOpen: (open: boolean) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tracks] = useState<AudioTrack[]>(AUDIO_TRACKS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.src = tracks[currentIndex].streamUrl;
    audio.volume = volume;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const handleEnded = () => {
      // Auto-play next track loop (non-stop radio style)
      setCurrentIndex((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, []);

  // When track changes, update src & play if was playing
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = tracks[currentIndex].streamUrl;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentIndex, tracks]);

  // Sync volume & mute
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback blocked by browser auto-play policy:', err);
          setIsPlaying(false);
        });
    }
  };

  const playTrack = (index: number) => {
    if (index >= 0 && index < tracks.length) {
      setCurrentIndex(index);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = tracks[index].streamUrl;
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentIndex + 1) % tracks.length;
    playTrack(nextIdx);
  };

  const prevTrack = () => {
    const prevIdx = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(prevIdx);
  };

  const setVolume = (level: number) => {
    const clamped = Math.max(0, Math.min(1, level));
    setVolumeState(clamped);
    if (clamped > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <AudioContext.Provider
      value={{
        tracks,
        currentTrack: tracks[currentIndex],
        isPlaying,
        isMuted,
        volume,
        togglePlay,
        playTrack,
        nextTrack,
        prevTrack,
        setVolume,
        toggleMute,
        isPlayerOpen,
        setIsPlayerOpen,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
