import * as THREE from 'three';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { LOGO_VIEWBOX } from '@/lib/logo';

/*
 * 로고 심볼(512 기준, y축 아래 방향)을 둥근 유리 덩어리로 압출합니다.
 *
 * 베벨은 외곽선을 안쪽으로 줄이면서 만들어지는데, 꺾인 모서리에서는 그 오프셋이
 * 사선으로 접히며 이음매가 생기고, 예각에서는 스스로 교차해 표면이 깨집니다.
 * 그래서 외곽선의 모든 모서리를 베벨보다 큰 반지름으로 미리 둥글게 깎습니다.
 * 바깥으로 튀어나온 모서리는 CONVEX, 안으로 파인 모서리는 CONCAVE 반지름을 씁니다.
 */

type Vec = [number, number];

const DOT_CENTER: Vec = [64, 64];
const DOT_RADIUS = 64;
const ARC_RADIUS = 128; // 점을 감싸는 몸통의 곡선 (점과 같은 중심)

const BEVEL = 30;
const CONVEX = 40;
const CONCAVE = 18;
const ARC_FILLET = 46;
const ARC_STEPS = 48;
const FILLET_STEPS = 18;

const sub = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1]];
const add = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1]];
const mul = (a: Vec, s: number): Vec => [a[0] * s, a[1] * s];
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1];
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

/** 두 직선이 만나는 모서리 p를 반지름 r의 호로 바꿉니다. */
function fillet(prev: Vec, p: Vec, next: Vec, r: number): Vec[] {
  const u = norm(sub(p, prev));
  const v = norm(sub(next, p));
  // 두 변 사이의 각 (모서리 쪽에서 잰 값). 오목한 모서리면 바깥쪽 쐐기의 각입니다.
  const angle = Math.acos(Math.min(1, Math.max(-1, dot(mul(u, -1), v))));
  const t = r / Math.tan(angle / 2);
  const start = sub(p, mul(u, t));
  const end = add(p, mul(v, t));
  const center = add(p, mul(norm(add(mul(u, -1), v)), r / Math.sin(angle / 2)));
  return [start, ...arc(center, r, start, end, FILLET_STEPS)];
}

/**
 * 직선(point에서 dir 방향으로 진행, 몸통 쪽 법선 inward)과
 * 점 둘레의 곡선에 동시에 접하는 필렛 원을 구합니다.
 */
function filletAgainstArc(point: Vec, dir: Vec, inward: Vec) {
  // 중심 = base + dir·s 이고 |중심 − DOT_CENTER| = ARC_RADIUS + ARC_FILLET
  const base = add(point, mul(inward, ARC_FILLET));
  const d = sub(base, DOT_CENTER);
  const target = ARC_RADIUS + ARC_FILLET;
  const b = dot(d, dir);
  const c = dot(d, d) - target * target;
  // 두 근 중 point에서 가까운 쪽이 모서리 안쪽의 접원입니다.
  const s = -b - Math.sqrt(b * b - c);
  const center = add(base, mul(dir, s));
  const onLine = sub(center, mul(inward, ARC_FILLET));
  const onArc = add(DOT_CENTER, mul(norm(sub(center, DOT_CENTER)), ARC_RADIUS));
  return { center, onLine, onArc };
}

function bodyOutline(): Vec[] {
  const A: Vec = [512, 512];
  const B: Vec = [384, 512];
  const C: Vec = [128, 256];
  const D: Vec = [128, 512];
  const E: Vec = [0, 512];
  const H: Vec = [384, 330.98];
  const I: Vec = [384, 0];
  const J: Vec = [512, 0];

  // 왼쪽 기둥의 바깥 면(x = 0)이 점 둘레 곡선과 만나는 모서리
  const left = filletAgainstArc(E, [0, -1], [1, 0]);
  // 사선의 윗면이 점 둘레 곡선과 만나는 모서리 (몸통은 사선 아래쪽)
  const diagonal = norm([1, 1]);
  const diag = filletAgainstArc(H, mul(diagonal, -1), [
    -diagonal[1],
    diagonal[0],
  ]);

  return [
    ...fillet(J, A, B, CONVEX),
    ...fillet(A, B, C, CONVEX),
    ...fillet(B, C, D, CONCAVE),
    ...fillet(C, D, E, CONVEX),
    ...fillet(D, E, left.onLine, CONVEX),
    left.onLine,
    ...arc(left.center, ARC_FILLET, left.onLine, left.onArc, FILLET_STEPS),
    ...arc(DOT_CENTER, ARC_RADIUS, left.onArc, diag.onArc, ARC_STEPS),
    ...arc(diag.center, ARC_FILLET, diag.onArc, diag.onLine, FILLET_STEPS),
    ...fillet(diag.onLine, H, I, CONCAVE),
    ...fillet(H, I, J, CONVEX),
    ...fillet(I, J, A, CONVEX),
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
    depth: 84,
    curveSegments: 96,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: BEVEL,
    bevelOffset: -BEVEL,
    bevelSegments: 20,
  });

  // SVG 좌표는 y축이 아래를 향하므로 x축으로 반 바퀴 돌려 바로 세웁니다.
  // (음수 스케일로 뒤집으면 면의 감김 방향이 바뀌어 법선이 뒤집힙니다.)
  extruded.rotateX(Math.PI);
  extruded.center();
  extruded.scale(1 / LOGO_VIEWBOX, 1 / LOGO_VIEWBOX, 1 / LOGO_VIEWBOX);

  // 모든 모서리가 둥글어서 접힌 면이 없으니, 각진 법선이 남지 않게 넉넉히 부드럽게 합니다.
  const geometry = toCreasedNormals(extruded, THREE.MathUtils.degToRad(40));
  extruded.dispose();
  geometry.computeBoundingBox();
  return geometry;
}
