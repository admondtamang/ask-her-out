'use client';

import { Heart } from 'lucide-react';

interface HeartIconProps {
  size?: 'sm' | 'lg';
  animate?: boolean;
}

export function HeartIcon({ size = 'sm', animate = true }: HeartIconProps) {
  const sizeMap = {
    sm: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  return (
    <Heart 
      className={`${sizeMap[size]} mx-auto text-red-500 ${animate ? 'animate-pulse' : ''}`} 
    />
  );
}