'use client';

import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { createLogoGeometry } from './logoGeometry';
import { damp, type HeroStore } from './store';

interface Props {
  storeRef: RefObject<HeroStore>;
  position: [number, number, number];
  scale: number;
  quality: 'high' | 'low';
}

const TAU = Math.PI * 2;

export default function GlassLogo({
  storeRef,
  position,
  scale,
  quality,
}: Props) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshPhysicalMaterial>(null);
  const geometry = useMemo(() => createLogoGeometry(), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const g = group.current;
    const m = mesh.current;
    const store = storeRef.current;
    if (!g || !m) return;

    const dt = Math.min(delta, 1 / 30);
    const t = state.clock.elapsedTime;
    const { spin, pointer } = store;
    const still = store.reducedMotion;

    // 등장: 살짝 작고 돌아간 상태에서 제자리로
    store.intro = still ? 1 : damp(store.intro, 1, 1.6, dt);
    const intro = store.intro;

    // 드래그 후 관성, 그리고 정면으로 천천히 복귀
    if (!store.dragging) {
      spin.vy *= Math.exp(-2.4 * dt);
      spin.vx *= Math.exp(-3.2 * dt);
      spin.y += spin.vy * dt;
      spin.x += spin.vx * dt;
      if (Math.abs(spin.vy) < 0.9) {
        spin.y = damp(spin.y, Math.round(spin.y / TAU) * TAU, 1.8, dt);
      }
      spin.x = damp(spin.x, 0, 2.2, dt);
    }

    const idleY = still ? 0 : Math.sin(t * 0.32) * 0.2;
    const idleX = still ? 0 : Math.sin(t * 0.27 + 1.2) * 0.05;
    const scroll = store.scroll;

    const targetY =
      pointer.x * 0.38 + idleY + spin.y + scroll * 1.1 - (1 - intro) * 0.9;
    const targetX = -pointer.y * 0.24 + idleX + spin.x + scroll * 0.45;

    m.rotation.y = store.dragging
      ? targetY
      : damp(m.rotation.y, targetY, 5, dt);
    m.rotation.x = damp(m.rotation.x, targetX, 5, dt);
    m.rotation.z = damp(m.rotation.z, -pointer.x * 0.04, 3, dt);

    const float = still ? 0 : Math.sin(t * 0.7) * 0.04;
    g.position.set(
      position[0],
      position[1] + float + scroll * 0.9,
      position[2]
    );
    const s = scale * (0.88 + 0.12 * intro) * (1 - scroll * 0.12);
    g.scale.setScalar(s);

    // 클릭하면 박막 간섭 두께가 한 번 훑고 지나갑니다
    store.pulse = damp(store.pulse, 0, 1.4, dt);
    const mat = material.current;
    if (mat) {
      const p = store.pulse;
      const sweep = still ? 0 : Math.sin(t * 0.35) * 60;
      mat.iridescenceThicknessRange = [
        140 + sweep + p * 420,
        880 + sweep * 2 + p * 900,
      ];
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh ref={mesh} geometry={geometry}>
        <MeshTransmissionMaterial
          ref={(instance) => {
            // drei의 타입은 props 형태라서, 실제 인스턴스 타입으로 맞춰 둡니다.
            material.current =
              instance as unknown as THREE.MeshPhysicalMaterial;
          }}
          backside={quality === 'high'}
          backsideThickness={0.3}
          samples={quality === 'high' ? 10 : 5}
          resolution={quality === 'high' ? 1024 : 512}
          transmission={1}
          thickness={0.9}
          roughness={0.02}
          ior={1.5}
          chromaticAberration={1}
          anisotropicBlur={0.08}
          distortion={0}
          temporalDistortion={0}
          iridescence={1}
          iridescenceIOR={1.25}
          iridescenceThicknessRange={[140, 880]}
          clearcoat={1}
          clearcoatRoughness={0.04}
          attenuationColor="#f4f7ff"
          attenuationDistance={2.4}
          color="#ffffff"
          envMapIntensity={1.6}
        />
      </mesh>
    </group>
  );
}
