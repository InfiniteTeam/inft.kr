'use client';

import { Suspense, useState, type RefObject } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  PerformanceMonitor,
} from '@react-three/drei';
import GlassLogo from './GlassLogo';
import type { HeroStore } from './store';

interface Props {
  storeRef: RefObject<HeroStore>;
  active: boolean;
  onReady: () => void;
}

/** 어두운 스튜디오: 가는 흰 조명이 유리 가장자리를 긋고, 색광 몇 개가 박막에 색을 싣습니다. */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#050609']} />
      <Lightformer
        form="rect"
        intensity={2.2}
        color="#ffffff"
        position={[0, 5, 1]}
        scale={[10, 2.5, 1]}
      />
      <Lightformer
        form="rect"
        intensity={5}
        color="#ffffff"
        position={[-4.5, 0.6, 1.5]}
        scale={[0.35, 7, 1]}
      />
      <Lightformer
        form="rect"
        intensity={4}
        color="#ffffff"
        position={[4.5, -0.4, 1.5]}
        scale={[0.25, 7, 1]}
      />
      <Lightformer
        form="rect"
        intensity={1.4}
        color="#ffffff"
        position={[0, 2.6, 5]}
        scale={[6, 1.2, 1]}
      />
      <Lightformer
        form="ring"
        intensity={3}
        color="#7ef2cf"
        position={[-3, -2.5, 2.5]}
        scale={2.2}
      />
      <Lightformer
        form="circle"
        intensity={2.6}
        color="#f58bd6"
        position={[3.2, 2.4, 2]}
        scale={2}
      />
      <Lightformer
        form="rect"
        intensity={2}
        color="#9d8cff"
        position={[2.6, -3, 2.5]}
        scale={[4, 1, 1]}
      />
    </Environment>
  );
}

export default function HeroCanvas({ storeRef, active, onReady }: Props) {
  const [quality, setQuality] = useState<'high' | 'low'>(() =>
    typeof window !== 'undefined' && window.innerWidth < 760 ? 'low' : 'high'
  );
  const [dpr, setDpr] = useState(2);

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, dpr]}
      camera={{ position: [0, 0, 3.2], fov: 30, near: 0.1, far: 20 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.NeutralToneMapping,
        toneMappingExposure: 1.05,
      }}
      onCreated={() => requestAnimationFrame(() => onReady())}
    >
      <PerformanceMonitor
        onDecline={() => {
          setDpr(1.25);
          setQuality('low');
        }}
      />
      <Suspense fallback={null}>
        <GlassLogo storeRef={storeRef} quality={quality} />
        <Studio />
      </Suspense>
    </Canvas>
  );
}
