import type { WorkoutStation, AudioTrack } from '../types';

export const WORKOUT_STATIONS: WorkoutStation[] = [
  {
    id: 'station-phonk',
    name: 'Aggressive Gym Phonk',
    genre: 'Phonk',
    playlistId: 'PLrAl60F_xR3a8jB0l3R2iJ_q1Y9o8f-T',
    description: 'High-BPM drift phonk for max adrenaline on heavy squat & deadlift sets.',
    badge: 'Trending 🔥',
  },
  {
    id: 'station-edm',
    name: 'Hardstyle & Electro Pump',
    genre: 'EDM',
    playlistId: 'PLw-VjHDlEOgsT3Jd7W1Bq3mRkXoYn-3z1',
    description: 'Relentless bass drops and cardio conditioning energy.',
    badge: 'High BPM ⚡',
  },
  {
    id: 'station-hiphop',
    name: 'Beast Mode Gym Motivation',
    genre: 'Hip-Hop / Heavy',
    playlistId: 'PLDISKgcnAC4S6L0T0n7z4rVlD0sZq9xM',
    description: 'Heavy 808 bass, motivational rap, and gritty lifting focus.',
    badge: 'PR Day 🥊',
  },
  {
    id: 'station-retro',
    name: 'Deluxe Retro Saloon Radio',
    genre: 'Lo-Fi Chill',
    playlistId: 'PLVFLMYM1tErk', // Verified playlist from deluxsalon.in
    description: 'The nostalgic 2000s retro saloon vibe for warm-up, stretching and recovery.',
    badge: 'Classic 📻',
  },
];

export const FALLBACK_TRACKS: AudioTrack[] = [
  {
    id: 'fb-1',
    title: 'Gym Phonk Aggressive Drift',
    artist: 'Nightcore Beats',
    genre: 'Phonk',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=phonk-energy-110023.mp3',
    duration: '2:45',
  },
  {
    id: 'fb-2',
    title: 'High-Energy Electro Workout Pump',
    artist: 'Titan Beats',
    genre: 'EDM',
    streamUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=workout-motivation-electronic-124637.mp3',
    duration: '3:10',
  },
];
