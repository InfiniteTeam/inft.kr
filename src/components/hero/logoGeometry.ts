import * as THREE from 'three';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { LOGO_VIEWBOX } from '@/lib/logo';

/*
 * 로고 심볼(512 기준, y축 아래 방향)을 유리 오브젝트로 압출합니다.
 *
 * 원본 SVG 패스를 그대로 베벨링하면, 점(i의 점)을 감싸는 곡선과 직선이
 * 만나는 두 예각 모서리에서 베벨 오프셋이 스스로 교차해 표면이 지글거립니다.
 * 그래서 외곽선을 직접 만들면서 그 두 모서리에만 베벨보다 큰 반경의
 * 필렛을 넣습니다. 나머지 형태는 원본 패스와 같습니다.
 */

type Vec = [number, number];

const DOT_CENTER: Vec = [64, 64];
const DOT_RADIUS = 64;
const ARC_RADIUS = 128; // 점을 감싸는 몸통의 곡선 (점과 같은 중심)

const BEVEL = 34;
const FILLET = 46;
const ARC_STEPS = 40;
const FILLET_STEPS = 16;

const sub = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1]];
const add = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1]];
const mul = (a: Vec, s: number): Vec => [a[0] * s, a[1] * s];
const norm = (a: Vec): Vec => mul(a, 1 / Math.hypot(a[0], a[1]));

/** center 기준으로 from → to 를 짧은 쪽으로 도는 호의 점들 (from 제외, to 포함) */
function arc(center: Vec, radius: number, from: Vec, to: Vec, steps: number) {
  const a0 = Math.atan2(from[1] - center[1], from[0] - center[0]);
  let sweep = Math.atan2(to[1] - center[1], to[0] - center[0]) - a0;
  if (sweep > Math.PI) sweep -= Math.PI * 2;
  if (sweep < -Math.PI) sweep += Math.PI * 2;
  const points: Vec[] = [];
  for (let i = 1; i <= steps; i++) {
    const a = a0 + (sweep * i) / steps;
    points.push([
      center[0] + Math.cos(a) * radius,
      center[1] + Math.sin(a) * radius,
    ]);
  }
  return points;
}

/**
 * 직선(point에서 dir 방향으로 진행, 몸통 쪽 법선 inward)과
 * 점 둘레의 곡선에 동시에 접하는 필렛 원을 구합니다.
 */
function filletAgainstArc(point: Vec, dir: Vec, inward: Vec) {
  // 중심 = base + dir·s 이고 |중심 − DOT_CENTER| = ARC_RADIUS + FILLET
  const base = add(point, mul(inward, FILLET));
  const d = sub(base, DOT_CENTER);
  const target = ARC_RADIUS + FILLET;
  const b = d[0] * dir[0] + d[1] * dir[1];
  const c = d[0] * d[0] + d[1] * d[1] - target * target;
  // 두 근 중 point에서 가까운 쪽이 모서리 안쪽의 접원입니다.
  const s = -b - Math.sqrt(b * b - c);
  const center = add(base, mul(dir, s));
  const onLine = sub(center, mul(inward, FILLET));
  const onArc = add(DOT_CENTER, mul(norm(sub(center, DOT_CENTER)), ARC_RADIUS));
  return { center, onLine, onArc };
}

function bodyOutline(): Vec[] {
  // 왼쪽 기둥의 바깥 면 (x = 0)을 따라 위로
  const left = filletAgainstArc([0, 512], [0, -1], [1, 0]);
  // 사선의 윗면을 (384, 330.98)에서 왼쪽 위로, 몸통은 그 아래쪽
  const diagonal = norm([1, 1]);
  const diag = filletAgainstArc([384, 330.98], mul(diagonal, -1), [
    -diagonal[1],
    diagonal[0],
  ]);

  return [
    [512, 512],
    [384, 512],
    [128, 256],
    [128, 512],
    [0, 512],
    left.onLine,
    ...arc(left.center, FILLET, left.onLine, left.onArc, FILLET_STEPS),
    ...arc(DOT_CENTER, ARC_RADIUS, left.onArc, diag.onArc, ARC_STEPS),
    ...arc(diag.center, FILLET, diag.onArc, diag.onLine, FILLET_STEPS),
    [384, 330.98],
    [384, 0],
    [512, 0],
  ];
}

function toShape(points: Vec[]) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (const [x, y] of points.slice(1)) shape.lineTo(x, y);
  shape.closePath();
  return shape;
}

/** 원점 중심, 한 변 1 기준의 유리 로고 지오메트리 */
export function createLogoGeometry() {
  const body = toShape(bodyOutline());
  const dot = new THREE.Shape();
  dot.absarc(DOT_CENTER[0], DOT_CENTER[1], DOT_RADIUS, 0, Math.PI * 2, false);

  const extruded = new THREE.ExtrudeGeometry([body, dot], {
    depth: 72,
    curveSegments: 64,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: BEVEL,
    bevelOffset: -BEVEL,
    bevelSegments: 18,
  });

  // SVG 좌표는 y축이 아래를 향하므로 x축으로 반 바퀴 돌려 바로 세웁니다.
  // (음수 스케일로 뒤집으면 면의 감김 방향이 바뀌어 법선이 뒤집힙니다.)
  extruded.rotateX(Math.PI);
  extruded.center();
  extruded.scale(1 / LOGO_VIEWBOX, 1 / LOGO_VIEWBOX, 1 / LOGO_VIEWBOX);

  // 베벨과 곡면은 부드럽게, 실루엣의 꺾인 모서리는 날카롭게 유지합니다.
  const geometry = toCreasedNormals(extruded, THREE.MathUtils.degToRad(30));
  extruded.dispose();
  geometry.computeBoundingBox();
  return geometry;
}
