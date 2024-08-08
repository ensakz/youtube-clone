'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation'

export default function Watch() {
  // Prefix for the video URLs
  const videoPrefix = 'https://storage.googleapis.com/sanzhar-yt-processed-videos/';

  // Wrapper component to handle loading of search params
  const VideoPlayer = () => {
    const videoSrc = useSearchParams().get('v');
    return <video controls src={videoPrefix + videoSrc} />;
  };

  return (
    <div>
      <h1>Watch Page</h1>
      {/* Wrap the part using useSearchParams in Suspense */}
      <Suspense fallback={<div>Loading...</div>}>
        <VideoPlayer />
      </Suspense>
    </div>
  );
}
