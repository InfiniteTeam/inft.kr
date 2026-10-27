/**
 * 로고 애니메이션(Lottie)의 움직임을 옮긴 시간표. 동작과 이징은 Lottie 그대로이고,
 * 머무는 시간만 바꿨습니다: iN은 오래, 접힌 "I"는 잠깐.
 *
 * 0~0.8초 "I" → 0.8~1.8초 기둥 둘과 대각선이 펼쳐짐 → 1.8~2.8초 점이 왼쪽 기둥에서 솟아오름
 * → 2.8~7.6초 iN → 7.6~8.6초 점이 가라앉음 → 8.6~9.6초 "I"로 접힘 → 9.6~10초 "I".
 * 모든 구간은 Lottie와 같은 cubic-bezier(0.33, 1, 0.68, 1)로 움직입니다.
 */
export const CYCLE = 10;

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
  const open = segment(t, 0.8, 1.8) * (1 - segment(t, 8.6, 9.6));
  const dotY = segment(t, 1.8, 2.8) * (1 - segment(t, 7.6, 8.6));
  return { open, dotX: open, dotY };
}
