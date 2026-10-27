import { LOGO_PATH } from '@/lib/logo';
import styles from './Construction.module.scss';

/** 128 단위 격자 위에 그려진 심볼의 구조도 */
export default function Construction() {
  const grid = [0, 128, 256, 384, 512];

  return (
    <svg
      className={styles.svg}
      viewBox="-48 -48 608 608"
      role="img"
      aria-label="128 단위 격자 위의 Infinite Studio 심볼 구조도"
    >
      <g className={styles.grid}>
        {grid.map((v) => (
          <line key={`v${v}`} x1={v} y1={-48} x2={v} y2={560} />
        ))}
        {grid.map((v) => (
          <line key={`h${v}`} x1={-48} y1={v} x2={560} y2={v} />
        ))}
      </g>

      <path className={styles.mark} d={LOGO_PATH} />

      <g className={styles.guides}>
        <circle cx={64} cy={64} r={64} />
        <circle cx={64} cy={64} r={128} />
        <line x1={64} y1={-48} x2={64} y2={200} />
        <line x1={-48} y1={64} x2={200} y2={64} />
        <line x1={64} y1={64} x2={177.067} y2={124.048} />
        <line x1={-48} y1={80} x2={432} y2={560} />
        <line x1={5} y1={-48} x2={560} y2={507} />
      </g>

      <g className={styles.points}>
        <circle cx={64} cy={64} r={4} />
        <circle cx={128} cy={256} r={4} />
        <circle cx={384} cy={330.98} r={4} />
        <circle cx={384} cy={512} r={4} />
      </g>

      <g className={styles.labels}>
        <text x={136} y={-16}>
          128
        </text>
        <text x={-40} y={124} transform="rotate(-90 -40 124)">
          128
        </text>
        <text x={118} y={102}>
          r 128
        </text>
        <text x={78} y={52}>
          r 64
        </text>
      </g>
    </svg>
  );
}
