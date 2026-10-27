'use client';

import { useEffect, useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { createLogoGeometry } from './logoGeometry';
import { createHoloTexture } from './holoTexture';
import { damp, type HeroStore } from './store';

interface Props {
  storeRef: RefObject<HeroStore>;
  quality: 'high' | 'low';
}

const TAU = Math.PI * 2;

export default function GlassLogo({ storeRef, quality }: Props) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => createLogoGeometry(), []);
  const holo = useMemo(() => createHoloTexture(), []);
  // three.js 텍스처는 매 프레임 직접 고쳐 쓰는 객체라 ref로 다룹니다.
  const holoRef = useRef(holo);

  useEffect(
    () => () => {
      geometry.dispose();
      holo.dispose();
    },
    [geometry, holo]
  );

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
    store.intro = still ? 1 : damp(store.intro, 1, 1.8, dt);
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

    const idleY = still ? 0 : Math.sin(t * 0.3) * 0.22;
    const idleX = still ? 0 : Math.sin(t * 0.24 + 1.2) * 0.06;
    const scroll = store.scroll;

    const targetY =
      pointer.x * 0.42 + idleY + spin.y + scroll * 1.4 - (1 - intro) * 1.1;
    const targetX = -pointer.y * 0.26 + idleX + spin.x + scroll * 0.3;

    m.rotation.y = store.dragging
      ? targetY
      : damp(m.rotation.y, targetY, 5, dt);
    m.rotation.x = damp(m.rotation.x, targetX, 5, dt);
    m.rotation.z = damp(m.rotation.z, -pointer.x * 0.04, 3, dt);

    g.position.y = still ? 0 : Math.sin(t * 0.7) * 0.025;
    g.scale.setScalar(0.86 + 0.14 * intro);

    // 기울이는 각도에 따라 안쪽 필름의 색이 미끄러집니다. 클릭하면 한 번 크게 훑고 지나갑니다.
    store.pulse = damp(store.pulse, 0, 1.2, dt);
    const film = holoRef.current;
    film.offset.set(
      m.rotation.y * 0.16 + store.pulse * 0.35 + (still ? 0 : t * 0.006),
      m.rotation.x * 0.2
    );
    film.rotation = 0.5 + m.rotation.y * 0.08;
  });

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry}>
        <MeshTransmissionMaterial
          background={holo}
          backside={quality === 'high'}
          backsideThickness={0.35}
          samples={quality === 'high' ? 10 : 5}
          resolution={quality === 'high' ? 1024 : 512}
          transmission={1}
          thickness={0.85}
          roughness={0.04}
          ior={1.48}
          chromaticAberration={0.9}
          anisotropicBlur={0.1}
          distortion={0}
          temporalDistortion={0}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[180, 1100]}
          clearcoat={1}
          clearcoatRoughness={0.05}
          attenuationColor="#ffffff"
          attenuationDistance={4}
          color="#ffffff"
          envMapIntensity={1.4}
        />
      </mesh>
    </group>
  );
}
