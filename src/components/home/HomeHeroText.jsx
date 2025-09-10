import React from 'react';

const HomeHeroText = () => {
  // Handle inline video playback for iOS
  const handleInlineVideoLoad = (video) => {
    // Configure video for iOS compatibility
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('x-webkit-airplay', 'allow');
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    
    // Ensure proper styling
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = 'cover';
    video.style.objectPosition = 'center center';
    
    // Force play
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.warn('Inline video autoplay failed:', error);
        // Retry after delay
        setTimeout(() => {
          video.play().catch(() => {
            console.warn('Inline video retry failed');
          });
        }, 500);
      });
    }
  };

  // Handle user interaction to trigger video play
  const handleUserInteraction = () => {
    const inlineVideo = document.querySelector('.hero-inline-video');
    if (inlineVideo && inlineVideo.paused) {
      handleInlineVideoLoad(inlineVideo);
    }
  };

  return (
    <div 
      className="font-[font1] text-center relative depth-4 px-4 flex-1 flex items-center justify-center"
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
    >
      <div className="w-full">
        <div className="text-[12vw] sm:text-[9vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[7.5vw] lg:leading-[8vw] text-layer-3 mb-2 sm:mb-0">
          You do the work
        </div>
        <div className="text-[12vw] sm:text-[9vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[7.5vw] lg:leading-[8vw] text-layer-3 flex-wrap justify-center mb-2 sm:mb-0">
          <span>we</span>
          <div className="h-[8vw] w-[20vw] sm:h-[7vw] sm:w-[16vw] rounded-full overflow-hidden mx-2 sm:mx-2 glass glow-accent flex-shrink-0 my-1 sm:my-0">
            <video
              className="h-full w-full object-cover hero-inline-video ios-video-fix"
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
              onLoadedData={(e) => {
                const video = e.target;
                handleInlineVideoLoad(video);
              }}
              onCanPlay={(e) => {
                const video = e.target;
                if (video.paused) {
                  handleInlineVideoLoad(video);
                }
              }}
              onError={(e) => {
                console.warn('Inline video failed to load');
                // Could add fallback image here if needed
              }}
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </div>
          <span>do the</span>
        </div>
        <div className="text-[12vw] sm:text-[9vw] lg:text-[9.5vw] justify-center flex items-center uppercase leading-[10vw] sm:leading-[7.5vw] lg:leading-[8vw] text-layer-3">
          stitches
        </div>
      </div>
    </div>
  );
};

export default HomeHeroText;