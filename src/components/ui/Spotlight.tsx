'use client';

import { useRef, type ElementType } from 'react';

interface Props {
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * 커서 위치를 --mx / --my (0% ~ 100%) 로 넘겨 주는 래퍼.
 * 카드 위를 따라다니는 홀로그램 광택은 CSS가 그립니다.
 */
export default function Spotlight({
  as: Tag = 'div',
  className,
  style,
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty(
      '--mx',
      `${((e.clientX - rect.left) / rect.width) * 100}%`
    );
    el.style.setProperty(
      '--my',
      `${((e.clientY - rect.top) / rect.height) * 100}%`
    );
  };

  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      onPointerMove={onPointerMove}
    >
      {children}
    </Tag>
  );
}
