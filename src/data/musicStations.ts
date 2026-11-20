import type { WorkoutStation, AudioTrack } from '../types';

export const WORKOUT_STATIONS: WorkoutStation[] = [
  {
    id: 'station-bgm',
    name: 'South & Mass Cinema BGM',
    genre: 'BGM / Mass Hits',
    playlistId: 'PLcdTvg6WV3hOB2-XvsotFBArDf_SxXaG2',
    description: 'Iconic KGF, Vikram, Leo, Jailer, Salaar & hero elevation hype BGMs.',
    badge: 'Mass Hype 🔥',
  },
  {
    id: 'station-anirudh',
    name: 'Anirudh High-BPM Energy',
    genre: 'BGM / Mass Hits',
    playlistId: 'PLoZfs_FvSymfxWhlCrk56ZF01rJK_WMj8',
    description: 'Rolex, Badass, Hukum, Lokiverse & adrenaline-fueled drops.',
    badge: 'High BPM ⚡',
  },
  {
    id: 'station-hiphop',
    name: 'Beast Mode Bass Pump',
    genre: 'Hip-Hop / Heavy',
    playlistId: 'PL0KHCD5QVueu926ZCGfEFNAXIU1vLnUye',
    description: 'Heavy 808 bass, motivational rap, and PR day lifting focus.',
    badge: 'PR Day 🥊',
  },
  {
    id: 'station-retro',
    name: 'Deluxe Retro Saloon Radio',
    genre: 'Lo-Fi Chill',
    playlistId: 'PLVFLMYM1tErk',
    description: 'Nostalgic 2000s retro saloon vibe for warm-up, stretching and recovery.',
    badge: 'Classic 📻',
  },
];

export const FALLBACK_TRACKS: AudioTrack[] = [
  {
    id: 'fb-1',
    title: 'KGF & Vikram Mass Elevation BGM',
    artist: 'Cinema Score Pump',
    genre: 'BGM / Mass Hits',
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
