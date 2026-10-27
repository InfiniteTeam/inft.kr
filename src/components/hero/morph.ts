/**
 * 로고 애니메이션(Lottie, 60fps 480프레임)의 시간표를 그대로 옮긴 것입니다.
 *
 * 0~2초 "I" 한 줄 → 2~3초 기둥 둘과 대각선이 펼쳐짐 → 3~4초 점이 왼쪽 기둥에서 솟아오름
 * → 4~6초 iN → 6~7초 점이 다시 가라앉음 → 7~8초 "I"로 접힘.
 * 모든 구간은 Lottie와 같은 cubic-bezier(0.33, 1, 0.68, 1)로 움직입니다.
 */
export const CYCLE = 8;

export interface MorphState {
  /** 기둥과 대각선이 펼쳐진 정도 0 ~ 1 */
  open: number;
  /** 점이 가로로 옮겨 간 정도 (기둥과 함께) */
  dotX: number;
  /** 점이 솟아오른 정도 */
  dotY: number;
}

export const REST: MorphState = { open: 1, dotX: 1, dotY: 1 };

function bezier(t: number, p1: number, p2: number) {
  const u = 1 - t;
  return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t;
}

/** cubic-bezier(0.33, 1, 0.68, 1): x에 대한 t를 이분법으로 찾아 y를 돌려줍니다. */
function ease(x: number) {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const t = (lo + hi) / 2;
    if (bezier(t, 0.33, 0.68) < x) lo = t;
    else hi = t;
  }
  return bezier((lo + hi) / 2, 1, 1);
}

function segment(t: number, from: number, to: number) {
  if (t <= from) return 0;
  if (t >= to) return 1;
  return ease((t - from) / (to - from));
}

export function morphAt(seconds: number): MorphState {
  const t = ((seconds % CYCLE) + CYCLE) % CYCLE;
  const open = segment(t, 2, 3) * (1 - segment(t, 7, 8));
  const dotY = segment(t, 3, 4) * (1 - segment(t, 6, 7));
  return { open, dotX: open, dotY };
}
