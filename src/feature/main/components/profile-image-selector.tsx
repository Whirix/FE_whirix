'use client'

import { useState } from 'react';
import { ProfileImage } from '../../../shared/ui';
import { cn } from '../../../shared/lib/utils';

// 프로필 이미지 
const profileImages = [
  { src: '/avatar/image1.webp', alt: 'avatar1' },
  { src: '/avatar/image2.webp', alt: 'avatar2' },
  { src: '/avatar/image3.webp', alt: 'avatar3' },
  { src: '/avatar/image4.webp', alt: 'avatar4' },
  { src: '/avatar/image5.webp', alt: 'avatar5' },
  { src: '/avatar/image6.webp', alt: 'avatar6' },
  { src: '/avatar/image7.webp', alt: 'avatar7' },
  { src: '/avatar/image8.webp', alt: 'avatar8' },
];

export function ProfileImageSelector() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? profileImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === profileImages.length - 1 ? 0 : prev + 1
    );
  };

  const currentImage = profileImages[currentIndex];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 선택된 이미지 미리보기 */}
      <ProfileImage
        src={currentImage.src}
        alt={currentImage.alt}
        className="w-60 h-60"
        fallbackText="SJ"
      />

      {/* 좌우 버튼 */}
      <div className="flex gap-6 items-center">
        <button
          onClick={handlePrev}
          className={cn(
            'px-4 py-2 rounded bg-gray-200 hover:bg-gray-300'
          )}
        >
          ◀
        </button>

        <span className="text-sm text-gray-600">
          {currentIndex + 1} / {profileImages.length}
        </span>

        <button
          onClick={handleNext}
          className={cn(
            'px-4 py-2 rounded bg-gray-200 hover:bg-gray-300'
          )}
        >
          ▶
        </button>
      </div>
    </div>
  );
}
