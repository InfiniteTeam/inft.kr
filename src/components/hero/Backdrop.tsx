'use client';

import { useMemo, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import type { HeroStore } from './store';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uAspect;
  uniform vec2 uFocus;
  uniform vec2 uPointer;
  uniform float uScroll;
  uniform float uIntro;
  varying vec2 vUv;

  // Ashima simplex noise (MIT)
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }

  // 진주빛 스펙트럼: mint → aqua → periwinkle → lilac → rose → cream
  vec3 holo(float f) {
    f = fract(f);
    vec3 c0 = vec3(0.553, 0.949, 0.824);
    vec3 c1 = vec3(0.639, 0.902, 1.000);
    vec3 c2 = vec3(0.718, 0.757, 1.000);
    vec3 c3 = vec3(0.863, 0.776, 1.000);
    vec3 c4 = vec3(1.000, 0.816, 0.902);
    vec3 c5 = vec3(1.000, 0.945, 0.839);
    float s = f * 6.0;
    vec3 c = mix(c0, c1, smoothstep(0.0, 1.0, s));
    c = mix(c, c2, smoothstep(1.0, 2.0, s));
    c = mix(c, c3, smoothstep(2.0, 3.0, s));
    c = mix(c, c4, smoothstep(3.0, 4.0, s));
    c = mix(c, c5, smoothstep(4.0, 5.0, s));
    c = mix(c, c0, smoothstep(5.0, 6.0, s));
    return c;
  }

  void main() {
    vec3 bg = vec3(0.957, 0.961, 0.969);
    vec2 p = vec2((vUv.x - 0.5) * uAspect, vUv.y - 0.5);
    float t = uTime * 0.035;

    // 크고 느린 흐름 — 색 덩어리가 잘게 쪼개지지 않도록 낮은 주파수만 씁니다
    vec2 q = vec2(
      snoise(p * 0.7 + vec2(0.0, t)),
      snoise(p * 0.7 + vec2(5.2, -t * 0.8))
    );
    float n = snoise(p * 0.55 + q * 0.55 + vec2(t * 0.5, 1.7));
    float f = 0.3 + 0.55 * n + 0.06 * sin(t * 2.4 + p.x) + uScroll * 0.2;
    vec3 tint = holo(f);

    vec2 focus = vec2((uFocus.x - 0.5) * uAspect, uFocus.y - 0.5) + uPointer * vec2(0.035, 0.025);
    float d = length((p - focus) * vec2(1.0, 1.1));
    float halo = smoothstep(0.62, 0.02, d);
    halo = halo * halo * (3.0 - 2.0 * halo) * uIntro;

    // 화면 가장자리에 아주 옅게 번지는 빛
    float washA = smoothstep(0.9, 0.0, length(p - vec2(-0.62 * uAspect, 0.5))) * 0.35;
    float washB = smoothstep(0.8, 0.0, length(p - vec2(0.55 * uAspect, -0.45))) * 0.25;

    vec3 col = bg;
    col = mix(col, holo(0.05 + t * 0.2), washA * uIntro);
    col = mix(col, holo(0.55 - t * 0.2), washB * uIntro);
    col = mix(col, tint, halo * 0.92);
    col = mix(col, vec3(1.0), smoothstep(0.3, 0.0, d) * 0.12 * uIntro);

    // 아래쪽은 페이지 바탕색으로 녹아들게
    col = mix(bg, col, smoothstep(0.0, 0.38, vUv.y));

    col += (hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5) * (2.0 / 255.0);

    gl_FragColor = vec4(toLinear(col), 1.0);
    #include <colorspace_fragment>
  }
`;

interface Props {
  storeRef: RefObject<HeroStore>;
  /** 오브젝트가 놓인 화면 위치 (0 ~ 1, 왼쪽 아래 기준) */
  focus: [number, number];
}

const DEPTH = -3;

export default function Backdrop({ storeRef, focus }: Props) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const viewport = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const { width, height } = viewport.getCurrentViewport(
    camera,
    new THREE.Vector3(0, 0, DEPTH),
    size
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uFocus: { value: new THREE.Vector2(0.5, 0.5) },
      uPointer: { value: new THREE.Vector2() },
      uScroll: { value: 0 },
      uIntro: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    const u = material.current?.uniforms;
    const store = storeRef.current;
    if (!u) return;
    u.uTime.value = store.reducedMotion ? 12 : state.clock.elapsedTime;
    u.uAspect.value = width / height;
    u.uFocus.value.set(focus[0], focus[1]);
    const pointer = u.uPointer.value as THREE.Vector2;
    pointer.x += (store.pointer.x - pointer.x) * 0.04;
    pointer.y += (store.pointer.y - pointer.y) * 0.04;
    u.uScroll.value = store.scroll;
    u.uIntro.value = store.intro;
  });

  return (
    <mesh position={[0, 0, DEPTH]} scale={[width * 1.02, height * 1.02, 1]}>
      <planeGeometry />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
}
