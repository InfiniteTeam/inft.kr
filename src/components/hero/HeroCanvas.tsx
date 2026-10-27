'use client';

import { Suspense, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  PerformanceMonitor,
} from '@react-three/drei';
import Backdrop from './Backdrop';
import GlassLogo from './GlassLogo';
import type { HeroStore } from './store';

interface Props {
  storeRef: RefObject<HeroStore>;
  active: boolean;
  onReady: () => void;
}

function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#15171e']} />
      {/* 위에서 내려오는 넓은 소프트박스 */}
      <Lightformer
        form="rect"
        intensity={2.4}
        color="#ffffff"
        position={[0, 5, -1]}
        scale={[12, 4, 1]}
      />
      {/* 정면 위쪽의 넓은 반사 — 앞면에 부드러운 광택 그라데이션 */}
      <Lightformer
        form="rect"
        intensity={1.1}
        color="#ffffff"
        position={[0, 3.2, 6]}
        scale={[9, 2.6, 1]}
      />
      {/* 좌우의 가늘고 긴 반사광 — 유리 가장자리의 선을 만듭니다 */}
      <Lightformer
        form="rect"
        intensity={3}
        color="#ffffff"
        position={[-5, 0.5, 1]}
        scale={[6, 0.5, 1]}
      />
      <Lightformer
        form="rect"
        intensity={2}
        color="#ffffff"
        position={[5, -0.5, 1]}
        scale={[6, 0.35, 1]}
      />
      {/* 홀로그램 색을 싣는 색광 */}
      <Lightformer
        form="ring"
        intensity={3.2}
        color="#8df2d2"
        position={[-3.5, 2.5, 3]}
        scale={2.4}
      />
      <Lightformer
        form="circle"
        intensity={2.6}
        color="#dcc6ff"
        position={[3.5, 1.5, 2.5]}
        scale={2.2}
      />
      <Lightformer
        form="rect"
        intensity={2.2}
        color="#ffd0e6"
        position={[2, -3.5, 2]}
        scale={[5, 1.2, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.8}
        color="#a3e6ff"
        position={[-2.5, -3, 2.5]}
        scale={[4, 1, 1]}
      />
      {/* 정면 아래쪽 어두운 면 — 형태감을 위한 대비 */}
      <Lightformer
        form="rect"
        intensity={1}
        color="#2a2d38"
        position={[0, -1.5, 6]}
        scale={[10, 3, 1]}
      />
    </Environment>
  );
}

function Scene({
  storeRef,
  quality,
}: {
  storeRef: RefObject<HeroStore>;
  quality: 'high' | 'low';
}) {
  const viewport = useThree((state) => state.viewport);
  const landscape = viewport.aspect >= 1;

  // 오브젝트를 놓을 화면 위치 (왼쪽 아래 기준 0 ~ 1)
  const focus: [number, number] = landscape ? [0.62, 0.6] : [0.5, 0.66];
  const size = landscape
    ? Math.min(viewport.height * 0.4, viewport.width * 0.3)
    : Math.min(viewport.width * 0.62, viewport.height * 0.3);

  const position: [number, number, number] = [
    (focus[0] - 0.5) * viewport.width,
    (focus[1] - 0.5) * viewport.height,
    0,
  ];

  return (
    <>
      <Backdrop storeRef={storeRef} focus={focus} />
      <GlassLogo
        storeRef={storeRef}
        position={position}
        scale={size}
        quality={quality}
      />
      <Studio />
    </>
  );
}

export default function HeroCanvas({ storeRef, active, onReady }: Props) {
  const [quality, setQuality] = useState<'high' | 'low'>(() =>
    typeof window !== 'undefined' && window.innerWidth < 760 ? 'low' : 'high'
  );
  const [dpr, setDpr] = useState(1.75);

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, dpr]}
      camera={{ position: [0, 0, 6], fov: 30, near: 0.1, far: 40 }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.NeutralToneMapping,
        toneMappingExposure: 1,
      }}
      onCreated={() => requestAnimationFrame(() => onReady())}
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1);
          setQuality('low');
        }}
      />
      <Suspense fallback={null}>
        <Scene storeRef={storeRef} quality={quality} />
      </Suspense>
    </Canvas>
  );
}
