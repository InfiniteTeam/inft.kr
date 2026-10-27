'use client';

import { useState, type RefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import HeroScene, { readPaperColor } from './HeroScene';
import type { HeroStore } from './store';

interface Props {
  storeRef: RefObject<HeroStore>;
  active: boolean;
  onReady: () => void;
}

/**
 * 장면은 셰이더 하나가 전부라 카메라, 조명, 안티에일리어싱을 three.js에 맡기지 않습니다.
 * 윤곽선은 셰이더가 화소 단위로 직접 부드럽게 덮습니다.
 */
export default function HeroCanvas({ storeRef, active, onReady }: Props) {
  const [quality, setQuality] = useState<'high' | 'low'>(() =>
    typeof window !== 'undefined' && window.innerWidth < 760 ? 'low' : 'high'
  );
  const [dpr, setDpr] = useState(1.75);
  const [paper] = useState(readPaperColor);

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, dpr]}
      flat
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      onCreated={() => requestAnimationFrame(() => onReady())}
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr((value) => (value > 1.25 ? 1.25 : 1));
          setQuality('low');
        }}
      />
      <HeroScene storeRef={storeRef} quality={quality} paper={paper} />
    </Canvas>
  );
}
