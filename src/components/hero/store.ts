/**
 * 히어로 DOM과 WebGL 루프가 함께 읽고 쓰는 가변 상태.
 * 매 프레임 바뀌는 값이라 React state 대신 객체 하나를 공유합니다.
 */
export interface HeroStore {
  /** 화면 중앙 기준 -1 ~ 1 */
  pointer: { x: number; y: number };
  /** 히어로가 화면 밖으로 밀려난 정도 0 ~ 1 */
  scroll: number;
  /** 드래그/관성 회전 (라디안, 라디안/초) */
  spin: { x: number; y: number; vx: number; vy: number };
  dragging: boolean;
  /** 클릭 시 1로 튀었다가 0으로 감쇠하는 박막 색 변화 */
  pulse: number;
  /** 첫 프레임 이후 0 → 1 로 진행되는 등장 애니메이션 */
  intro: number;
  reducedMotion: boolean;
}

export function createHeroStore(): HeroStore {
  return {
    pointer: { x: 0, y: 0 },
    scroll: 0,
    spin: { x: 0, y: 0, vx: 0, vy: 0 },
    dragging: false,
    pulse: 0,
    intro: 0,
    reducedMotion: false,
  };
}

/** 프레임레이트와 무관한 지수 감쇠 */
export function damp(
  current: number,
  target: number,
  lambda: number,
  dt: number
) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}
