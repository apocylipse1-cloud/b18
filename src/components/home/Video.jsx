import React from 'react';

const Video = () => {
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
        className="absolute inset-0 w-full h-full object-cover z-10"
        autoPlay
        playsInline
        loop
        muted
        preload="auto"
        onError={(e) => {
          console.warn('Video failed to load, falling back to image');
          e.target.style.display = 'none'; // Hide video if it fails to load
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