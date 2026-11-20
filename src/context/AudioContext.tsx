import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { WorkoutStation, AudioTrack } from '../types';
import { WORKOUT_STATIONS, FALLBACK_TRACKS } from '../data/musicStations';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface AudioContextType {
  stations: WorkoutStation[];
  currentStation: WorkoutStation;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  trackTitle: string;
  trackArtist: string;
  trackThumbnail: string;
  currentTime: number;
  duration: number;
  isPlayerReady: boolean;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setVolume: (level: number) => void;
  toggleMute: () => void;
  switchStation: (stationId: string) => void;
  loadCustomPlaylist: (playlistId: string) => void;
  seekTo: (percentage: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [stations, setStations] = useState<WorkoutStation[]>(WORKOUT_STATIONS);
  const [currentStation, setCurrentStation] = useState<WorkoutStation>(WORKOUT_STATIONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [trackTitle, setTrackTitle] = useState('Loading Gym Beats...');
  const [trackArtist, setTrackArtist] = useState('Titan Pro Radio');
  const [trackThumbnail, setTrackThumbnail] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const playerRef = useRef<any>(null);
  const progressTimerRef = useRef<any>(null);
  const fallbackAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize YouTube IFrame API & Hidden Bridge (Deluxe Salon Architecture)
  useEffect(() => {
    // 1. Create hidden bridge div if not existing
    let bridgeEl = document.getElementById('titanGymYoutubeBridge');
    if (!bridgeEl) {
      bridgeEl = document.createElement('div');
      bridgeEl.id = 'titanGymYoutubeBridge';
      bridgeEl.style.position = 'fixed';
      bridgeEl.style.left = '-9999px';
      bridgeEl.style.bottom = '0';
      bridgeEl.style.width = '200px';
      bridgeEl.style.height = '200px';
      bridgeEl.style.opacity = '0';
      bridgeEl.style.pointerEvents = 'none';
      document.body.appendChild(bridgeEl);
    }

    // 2. Load YouTube API script
    const initPlayer = () => {
      if (playerRef.current || !window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player('titanGymYoutubeBridge', {
          playerVars: {
            listType: 'playlist',
            list: currentStation.playlistId,
            autoplay: 0,
            controls: 0,
            enablejsapi: 1,
            playsinline: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              setIsPlayerReady(true);
              event.target.setVolume(volume);
              updateTrackMetadata();
            },
            onStateChange: (event: any) => {
              if (window.YT) {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                  updateTrackMetadata();
                } else if (event.data === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                } else if (event.data === window.YT.PlayerState.ENDED) {
                  nextTrack();
                } else if (event.data === window.YT.PlayerState.CUED) {
                  updateTrackMetadata();
                }
              }
            },
            onError: (err: any) => {
              console.warn('YouTube track error (video may be region restricted), skipping:', err);
              nextTrack();
            },
          },
        });
      } catch (err) {
        console.warn('Could not initialize YouTube player, using fallback:', err);
      }
    };

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(tag, firstScript);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    // Timer for playback scrubber
    progressTimerRef.current = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        try {
          const cur = playerRef.current.getCurrentTime() || 0;
          const dur = playerRef.current.getDuration() || 0;
          setCurrentTime(cur);
          setDuration(dur);
        } catch (_) {}
      }
    }, 1000);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  const updateTrackMetadata = () => {
    if (!playerRef.current || typeof playerRef.current.getVideoData !== 'function') return;
    try {
      const data = playerRef.current.getVideoData();
      if (data && data.title) {
        setTrackTitle(data.title);
        setTrackArtist(data.author || currentStation.name);
        const thumb = data.video_id
          ? `https://img.youtube.com/vi/${data.video_id}/hqdefault.jpg`
          : '';
        setTrackThumbnail(thumb);

        // Native MediaSession for mobile lock screen & bluetooth controls
        if ('mediaSession' in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: data.title,
            artist: data.author || currentStation.name,
            album: 'Titan Pro Gym Radio',
            artwork: thumb ? [{ src: thumb, sizes: '480x360', type: 'image/jpeg' }] : [],
          });

          navigator.mediaSession.setActionHandler('play', () => togglePlay());
          navigator.mediaSession.setActionHandler('pause', () => togglePlay());
          navigator.mediaSession.setActionHandler('nexttrack', () => nextTrack());
          navigator.mediaSession.setActionHandler('previoustrack', () => prevTrack());
        }
      }
    } catch (_) {}
  };

  const togglePlay = () => {
    if (!playerRef.current) {
      // Fallback audio
      if (!fallbackAudioRef.current) {
        fallbackAudioRef.current = new Audio(FALLBACK_TRACKS[0].streamUrl);
      }
      if (isPlaying) {
        fallbackAudioRef.current.pause();
        setIsPlaying(false);
      } else {
        fallbackAudioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      return;
    }

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
        setTimeout(updateTrackMetadata, 400);
      }
    } catch (e) {
      console.warn('Playback action failed:', e);
    }
  };

  const nextTrack = () => {
    if (playerRef.current && typeof playerRef.current.nextVideo === 'function') {
      try {
        playerRef.current.nextVideo();
        setTimeout(updateTrackMetadata, 500);
      } catch (_) {}
    }
  };

  const prevTrack = () => {
    if (playerRef.current && typeof playerRef.current.previousVideo === 'function') {
      try {
        playerRef.current.previousVideo();
        setTimeout(updateTrackMetadata, 500);
      } catch (_) {}
    }
  };

  const setVolume = (level: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(level)));
    setVolumeState(clamped);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      try {
        playerRef.current.setVolume(clamped);
        if (clamped > 0 && isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        }
      } catch (_) {}
    }
  };

  const toggleMute = () => {
    if (!playerRef.current) return;
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (_) {}
  };

  const switchStation = (stationId: string) => {
    const found = stations.find((s) => s.id === stationId);
    if (!found) return;
    setCurrentStation(found);
    if (playerRef.current && typeof playerRef.current.loadPlaylist === 'function') {
      try {
        playerRef.current.loadPlaylist({
          list: found.playlistId,
          listType: 'playlist',
        });
        setIsPlaying(true);
        setTimeout(updateTrackMetadata, 600);
      } catch (_) {}
    }
  };

  const loadCustomPlaylist = (customPlaylistId: string) => {
    if (!customPlaylistId.trim()) return;
    const cleanId = customPlaylistId.includes('list=')
      ? customPlaylistId.split('list=')[1].split('&')[0]
      : customPlaylistId.trim();

    const newStation: WorkoutStation = {
      id: `custom-${Date.now()}`,
      name: 'Custom Gym Playlist',
      genre: 'Phonk',
      playlistId: cleanId,
      description: 'Your custom YouTube workout playlist.',
      badge: 'Custom 🎧',
    };

    setStations((prev) => [newStation, ...prev]);
    setCurrentStation(newStation);
    if (playerRef.current && typeof playerRef.current.loadPlaylist === 'function') {
      playerRef.current.loadPlaylist({
        list: cleanId,
        listType: 'playlist',
      });
      setIsPlaying(true);
      setTimeout(updateTrackMetadata, 600);
    }
  };

  const seekTo = (percentage: number) => {
    if (playerRef.current && typeof playerRef.current.seekTo === 'function' && duration > 0) {
      const targetSec = Math.max(0, Math.min(duration, percentage * duration));
      playerRef.current.seekTo(targetSec, true);
      setCurrentTime(targetSec);
    }
  };

  return (
    <AudioContext.Provider
      value={{
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
        isPlayerReady,
        togglePlay,
        nextTrack,
        prevTrack,
        setVolume,
        toggleMute,
        switchStation,
        loadCustomPlaylist,
        seekTo,
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
