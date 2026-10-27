'use client';

import { useEffect, useRef, useState, type ElementType } from 'react';
import clsx from 'clsx';
import styles from './Reveal.module.scss';

interface Props {
  as?: ElementType;
  className?: string;
  /** 등장 지연 (ms) */
  delay?: number;
  children?: React.ReactNode;
  id?: string;
}

/** 화면에 들어올 때 한 번만 살며시 떠오릅니다. */
export default function Reveal({
  as: Tag = 'div',
  className,
  delay = 0,
  children,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={clsx(styles.reveal, className)}
      data-visible={visible || undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
