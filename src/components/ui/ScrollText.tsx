'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import styles from './ScrollText.module.scss';

interface Props {
  /** `*강조*` 로 감싼 구간은 진한 색으로 남습니다. */
  text: string;
  className?: string;
}

type Part = { part: string; strong: boolean };

/** 띄어쓰기 단위로 나누되, `*` 로 표시한 강조 구간은 단어 안에서도 유지합니다. */
function tokenize(text: string): Part[][] {
  let strong = false;
  return text.split(/\s+/).map((word) =>
    word
      .split(/(\*)/)
      .filter(Boolean)
      .flatMap((part) => {
        if (part === '*') {
          strong = !strong;
          return [];
        }
        return [{ part, strong }];
      })
  );
}

/** 스크롤에 맞춰 단어가 하나씩 밝아지는 문단 */
export default function ScrollText({ text, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1');
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.88;
      const end = vh * 0.38;
      const progress = (start - rect.top) / (rect.height + start - end);
      el.style.setProperty(
        '--p',
        Math.min(Math.max(progress, 0), 1).toFixed(4)
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const words = tokenize(text);

  return (
    <p
      ref={ref}
      className={clsx(styles.text, className)}
      style={{ '--n': words.length } as React.CSSProperties}
    >
      {words.map((parts, i) => (
        <span key={i} style={{ '--i': i } as React.CSSProperties}>
          {parts.map(({ part, strong }, j) =>
            strong ? (
              <strong key={j} className={styles.strong}>
                {part}
              </strong>
            ) : (
              part
            )
          )}{' '}
        </span>
      ))}
    </p>
  );
}
