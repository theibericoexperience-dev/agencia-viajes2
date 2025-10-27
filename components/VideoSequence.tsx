"use client";
import { useEffect, useRef, useState } from 'react';

interface VideoSequenceProps {
  className?: string;
}

export default function VideoSequence({ className = "" }: VideoSequenceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<'trimmed' | 'full'>('trimmed');

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedData = () => {
      console.log(`${currentVideo} video loaded, duration:`, videoElement.duration, 'starting playback in 2 seconds');
      setTimeout(() => {
        videoElement.play().then(() => {
          console.log(`${currentVideo} video playback started successfully`);
        }).catch((error) => {
          console.log('Autoplay blocked:', error);
          setShowPlayButton(true);
        });
      }, 2000);
    };

    const handleTimeUpdate = () => {
      // For trimmed video, switch to full video when it ends
      if (currentVideo === 'trimmed' && videoElement.currentTime >= videoElement.duration - 0.1) {
        console.log('Trimmed video ended, switching to full video');
        setCurrentVideo('full');
        return;
      }

      // For full video, loop it
      if (currentVideo === 'full' && videoElement.currentTime >= videoElement.duration - 0.1) {
        console.log('Full video ended, looping back to start');
        videoElement.currentTime = 0;
      }
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      console.error('Video src:', videoElement.src);
      console.error('Video error code:', (e.target as HTMLVideoElement).error?.code);
      console.error('Video error message:', (e.target as HTMLVideoElement).error?.message);
    };

    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('error', handleError);

    return () => {
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('error', handleError);
    };
  }, [currentVideo]);

  const handlePlayClick = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch(console.error);
      setShowPlayButton(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        key={currentVideo} // Force re-render when video changes
        ref={videoRef}
        src={currentVideo === 'trimmed' ? "/videos/DJI_0403_trimmed.MP4" : "/videos/DJI_0403.MP4"}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        autoPlay
        playsInline
        loop={false}
      />

      {/* Play button overlay */}
      {showPlayButton && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <button
            onClick={handlePlayClick}
            className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-medium tracking-wide hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg flex items-center space-x-2"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>Reproducir Video</span>
          </button>
        </div>
      )}
    </div>
  );
}