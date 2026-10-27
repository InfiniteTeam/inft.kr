'use client';

import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { fragmentShader, vertexShader } from './glassShader';
import { CYCLE, REST, morphAt, type MorphState } from './morph';
import { damp, type HeroStore } from './store';

const TAU = Math.PI * 2;
const FALLBACK_PAPER = '#07090e';
/** 초록, 청록, 보라, 분홍을 고리처럼 돌며 천천히 색이 바뀝니다. */
const COLORS = ['#09d895', '#00b4bc', '#9763cc', '#e97ab2'];

const CAMERA_Z = 3.2;
const PLANE_Z = -1.6;
const TAN_HALF_FOV = Math.tan(THREE.MathUtils.degToRad(15));
/** 첫 펼침은 0.8초 뒤에: 들어오자마자 "I"가 잠깐 보이고 iN으로 펼쳐집니다. */
const MORPH_START = 1.2;

/**
 * CSS의 --color-paper를 브라우저가 실제로 칠하는 sRGB 값으로 읽습니다.
 * 캔버스 가장자리가 페이지 배경과 한 끗도 다르지 않아야 경계가 보이지 않습니다.
 */
export function readPaperColor() {
  const color = new THREE.Color(FALLBACK_PAPER);
  try {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-paper')
      .trim();
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx || !value) return color;
    ctx.fillStyle = '#ff00ff';
    ctx.fillStyle = value;
    if (ctx.fillStyle === '#ff00ff') return color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return color.setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
  } catch {
    return color;
  }
}

const lerp = THREE.MathUtils.lerp;
const smooth = (from: number, to: number, x: number) =>
  THREE.MathUtils.smoothstep(x, from, to);

/** 모프 상태를 셰이더가 바로 쓰는 값으로 풉니다. 수치는 Lottie 원본의 좌표(512 기준)입니다. */
function applyMorph(u: Record<string, THREE.IUniform>, m: MorphState) {
  const s = m.open;
  const angle = THREE.MathUtils.degToRad(lerp(0, -45, s));
  u.uLx.value = lerp(256, 64, s);
  u.uRx.value = lerp(256, 448, s);
  u.uTop.value = lerp(0, 75, s);
  (u.uMc.value as THREE.Vector2).set(256, lerp(267, 293.5, s));
  (u.uMrot.value as THREE.Vector2).set(Math.cos(-angle), Math.sin(-angle));
  // 다 펼쳐지면 대각선을 화면 밖까지 늘려, 아래 모서리가 대각선 하나로만 둥글게 맺히게 합니다.
  u.uMhl.value = 245 + 120 * smooth(0.6, 1, s);
  u.uMr.value = 40 * (1 - smooth(0.5, 1, s));
  u.uDc.value = lerp(-128, 64, s);
  (u.uDot.value as THREE.Vector2).set(
    lerp(256, 64, m.dotX),
    lerp(256, 64, m.dotY)
  );
  // 겹쳐 있을 때(I)는 이어 붙이지 않아야 가장자리가 부풀지 않습니다.
  u.uKj.value = 21 * smooth(0, 0.12, s);
  u.uKl.value = 47 * smooth(0, 0.2, s) + 1;
  // 점이 기둥에서 빠져나오는 순간에만 살짝 이어졌다 떨어집니다.
  u.uKd.value = 20 * smooth(0, 0.35, m.dotY);
}

interface Scratch {
  object: THREE.Object3D;
  inverse: THREE.Matrix4;
  size: THREE.Vector2;
  morphTime: number;
}

interface Props {
  storeRef: RefObject<HeroStore>;
  quality: 'high' | 'low';
  paper: THREE.Color;
}

/** 화면 전체를 덮는 사각형 하나에 오로라와 유리 로고를 함께 그립니다. */
export default function HeroScene({ storeRef, quality, paper }: Props) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const scratch = useRef<Scratch | null>(null);

  const uniforms = useMemo(
    () => ({
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTanHalfFov: { value: TAN_HALF_FOV },
      uCamPos: { value: new THREE.Vector3(0, 0, CAMERA_Z) },
      uPlaneZ: { value: PLANE_Z },
      uPlaneH: { value: 2 * (CAMERA_Z - PLANE_Z) * TAN_HALF_FOV },
      uTime: { value: 46 },
      uFade: { value: 0 },
      uPaper: { value: paper },
      uColors: { value: COLORS.map((hex) => new THREE.Color(hex)) },
      uModel: { value: new THREE.Matrix4() },
      uInvModel: { value: new THREE.Matrix4() },
      uScale: { value: 1 },
      uHigh: { value: 1 },
      uLx: { value: 0 },
      uRx: { value: 0 },
      uTop: { value: 0 },
      uMc: { value: new THREE.Vector2() },
      uMrot: { value: new THREE.Vector2() },
      uMhl: { value: 0 },
      uMr: { value: 0 },
      uDc: { value: 0 },
      uDot: { value: new THREE.Vector2() },
      uKj: { value: 0 },
      uKl: { value: 0 },
      uKd: { value: 0 },
      uFilm: { value: new THREE.Vector2() },
      uFilmRot: { value: 0 },
    }),
    [paper]
  );

  useFrame((state, delta) => {
    const mat = material.current;
    if (!mat) return;
    scratch.current ??= {
      object: new THREE.Object3D(),
      inverse: new THREE.Matrix4(),
      size: new THREE.Vector2(),
      morphTime: MORPH_START,
    };
    const sc = scratch.current;
    const u = mat.uniforms;
    const store = storeRef.current;
    const dt = Math.min(delta, 1 / 30);
    const t = state.clock.elapsedTime;
    const { spin, pointer } = store;
    const still = store.reducedMotion;

    state.gl.getDrawingBufferSize(sc.size);
    (u.uResolution.value as THREE.Vector2).copy(sc.size);
    u.uHigh.value = quality === 'high' ? 1 : 0;

    // 오로라: 화면 밖에서 멈췄다 돌아와도 건너뛰지 않도록 프레임 시간만 더합니다.
    u.uFade.value = still ? 1 : damp(u.uFade.value, 1, 1.1, dt);
    if (!still) u.uTime.value += dt;

    // 로고 애니메이션: Lottie와 같은 8초 고리. 모션 줄이기면 iN에 멈춰 둡니다.
    if (!still) sc.morphTime = (sc.morphTime + dt) % CYCLE;
    applyMorph(u, still ? REST : morphAt(sc.morphTime));

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

    const o = sc.object;
    o.rotation.y = store.dragging
      ? targetY
      : damp(o.rotation.y, targetY, 5, dt);
    o.rotation.x = damp(o.rotation.x, targetX, 5, dt);
    o.rotation.z = damp(o.rotation.z, -pointer.x * 0.04, 3, dt);
    o.position.y = still ? 0 : Math.sin(t * 0.7) * 0.025;
    const scale = 0.86 + 0.14 * intro;
    o.scale.setScalar(scale);
    o.updateMatrix();
    (u.uModel.value as THREE.Matrix4).copy(o.matrix);
    (u.uInvModel.value as THREE.Matrix4).copy(
      sc.inverse.copy(o.matrix).invert()
    );
    u.uScale.value = scale;

    // 겉면 박막: 기울이는 만큼, 그리고 아주 천천히 저절로 미끄러집니다. 누르면 한 번 크게 훑습니다.
    store.pulse = damp(store.pulse, 0, 1.2, dt);
    (u.uFilm.value as THREE.Vector2).set(
      o.rotation.y * 0.22 + store.pulse * 0.5 + (still ? 0 : t * 0.01),
      o.rotation.x * 0.25
    );
    u.uFilmRot.value = 0.35 + o.rotation.y * 0.1;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
