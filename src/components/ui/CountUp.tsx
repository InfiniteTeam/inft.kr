'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CountUp.module.scss';

interface Props {
  value: number;
  /** 숫자 뒤에 붙는 기호 (예: +) */
  suffix?: string;
  duration?: number;
}

const format = (n: number) => Math.round(n).toLocaleString('ko-KR');

/** 화면에 들어오면 0에서 목표값까지 올라가는 숫자 */
export default function CountUp({
  value,
  suffix = '',
  duration = 1600,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          setDisplay(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} aria-label={`${format(value)}${suffix}`}>
      <span aria-hidden="true">
        {format(display)}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </span>
    </span>
  );
}
