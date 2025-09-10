import React from 'react';

const Video = () => {
  // Handle iOS video loading and playback
  const handleVideoLoad = (video) => {
    // Ensure video is properly configured for iOS
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x-webkit-airplay', 'allow');
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    
    // Force play after configuration
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn('Background video autoplay failed:', error);
        // Fallback: try again after a short delay
        setTimeout(() => {
          video.play().catch(() => {
            console.warn('Background video second attempt failed');
          });
        }, 1000);
      });
    }
  };

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Fallback image for when video is loading or fails */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        alt="Creative workspace background"
        loading="lazy"
      />

      {/* Main background video with proper aspect ratio and coverage */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-10 ios-video-fix"
        style={{
          objectFit: 'cover',
          objectPosition: 'center center',
          width: '100%',
          height: '100%'
        }}
        autoPlay
        playsInline
        loop
        muted
        preload="auto"
        data-webkit-playsinline="true"
        data-x-webkit-airplay="allow"
        onError={(e) => {
          console.warn('Video failed to load, falling back to image');
          e.target.style.display = 'none'; // Hide video if it fails to load
        }}
        onLoadedData={(e) => {
          const video = e.target;
          handleVideoLoad(video);
        }}
        onCanPlay={(e) => {
          // Additional attempt to play when video can play
          const video = e.target;
          if (video.paused) {
            handleVideoLoad(video);
          }
        }}
      >
        <source
          src="/video.mp4"
          type="video/mp4"
        />
        {/* Fallback message for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;