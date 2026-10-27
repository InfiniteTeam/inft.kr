import * as THREE from 'three';

/*
 * 유리 안쪽에 비쳐 보이는 홀로그램 필름.
 * 화면에는 직접 그려지지 않고, 유리가 굴절시켜 볼 때만 보입니다.
 * 어두운 유리 속에 회절 무지개 줄기가 지나가는 모습이라, 로고를 기울이면 줄기가 미끄러집니다.
 * (WebGL 캔버스 안에서만 쓰는 값이라 CSS 토큰을 읽지 않고 여기서 정합니다.)
 */
const SPECTRUM = [
  'rgba(255, 92, 140, A)',
  'rgba(255, 196, 110, A)',
  'rgba(150, 255, 190, A)',
  'rgba(90, 220, 255, A)',
  'rgba(120, 130, 255, A)',
  'rgba(230, 110, 255, A)',
];

const glow = (
  ctx: CanvasRenderingContext2D,
  size: number,
  x: number,
  y: number,
  r: number,
  color: string
) => {
  const g = ctx.createRadialGradient(
    x * size,
    y * size,
    0,
    x * size,
    y * size,
    r * size
  );
  g.addColorStop(0, color);
  g.addColorStop(1, color.replace(/[\d.]+\)$/, '0)'));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
};

export function createHoloTexture(size = 1024) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // 1. 깊은 남색 유리
  ctx.fillStyle = '#1a2140';
  ctx.fillRect(0, 0, size, size);

  // 2. 넓고 흐린 색 웅덩이
  ctx.globalCompositeOperation = 'screen';
  glow(ctx, size, 0.28, 0.32, 0.55, 'rgba(80, 120, 255, 0.55)');
  glow(ctx, size, 0.76, 0.72, 0.5, 'rgba(255, 100, 200, 0.45)');
  glow(ctx, size, 0.62, 0.22, 0.38, 'rgba(100, 255, 210, 0.42)');
  glow(ctx, size, 0.2, 0.82, 0.34, 'rgba(255, 205, 130, 0.32)');

  // 3. 회절 무지개 줄기: 사선 방향으로 스펙트럼이 한 번씩 지나갑니다
  ctx.save();
  ctx.translate(size / 2, size / 2);
  ctx.rotate(-0.62);
  ctx.translate(-size, -size);
  const streaks: [number, number, number][] = [
    [0.34, 120, 0.7],
    [0.6, 64, 0.5],
    [0.88, 180, 0.85],
    [1.2, 56, 0.45],
    [1.44, 130, 0.7],
    [1.72, 80, 0.5],
  ];
  for (const [at, width, alpha] of streaks) {
    const x = at * size;
    const band = ctx.createLinearGradient(x, 0, x + width, 0);
    band.addColorStop(0, SPECTRUM[0].replace('A', '0'));
    SPECTRUM.forEach((c, i) => {
      const edge = Math.sin(((i + 0.5) / SPECTRUM.length) * Math.PI);
      band.addColorStop(
        (i + 0.5) / SPECTRUM.length,
        c.replace('A', String(alpha * edge))
      );
    });
    band.addColorStop(1, SPECTRUM[5].replace('A', '0'));
    ctx.fillStyle = band;
    ctx.fillRect(x, 0, width, size * 2);
  }

  // 4. 필름의 가는 결
  ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
  for (let x = 0; x < size * 2; x += 12) ctx.fillRect(x, 0, 2, size * 2);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.center.set(0.5, 0.5);
  texture.needsUpdate = true;
  return texture;
}
