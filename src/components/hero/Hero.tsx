'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { site } from '@/data/site';
import { ArrowRight, ArrowUpRight, LogoMark } from '@/components/icons';
import { createHeroStore, type HeroStore } from './store';
import styles from './Hero.module.scss';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

const INTERACTIVE = 'a, button, input, textarea, select, [data-no-drag]';

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const storeRef = useRef<HeroStore>(createHeroStore());
  const [gl, setGl] = useState<boolean | null>(null);
  const [active, setActive] = useState(true);
  const [ready, setReady] = useState(false);
  const [touched, setTouched] = useState(false);

  // WebGL 지원 여부와 모션 설정은 브라우저에서만 알 수 있습니다.
  useEffect(() => {
    const store = storeRef.current;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    store.reducedMotion = media.matches;
    const onChange = () => (store.reducedMotion = media.matches);
    media.addEventListener('change', onChange);
    const id = requestAnimationFrame(() => setGl(supportsWebGL()));
    return () => {
      cancelAnimationFrame(id);
      media.removeEventListener('change', onChange);
    };
  }, []);

  // 화면 밖이면 렌더링을 멈춥니다.
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setActive(entry.isIntersecting)
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 커서 위치와 스크롤 진행도
  useEffect(() => {
    const el = section.current;
    const store = storeRef.current;
    if (!el) return;

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      store.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      store.pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const progress = Math.min(
        Math.max(window.scrollY / el.offsetHeight, 0),
        1
      );
      store.scroll = progress;
      el.style.setProperty('--progress', progress.toFixed(4));
    };

    onScroll();
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // 드래그로 돌리고, 가볍게 누르면 한 바퀴
  useEffect(() => {
    const el = section.current;
    const store = storeRef.current;
    if (!el) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    let startT = 0;
    let id: number | null = null;

    const down = (e: PointerEvent) => {
      if (e.button !== 0 || (e.target as Element).closest(INTERACTIVE)) return;
      id = e.pointerId;
      startX = lastX = e.clientX;
      startY = lastY = e.clientY;
      startT = lastT = performance.now();
      store.dragging = true;
      store.spin.vx = 0;
      store.spin.vy = 0;
      el.dataset.dragging = 'true';
    };

    const move = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      const now = performance.now();
      const dt = Math.max((now - lastT) / 1000, 1 / 240);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const k = 0.0105;
      store.spin.y += dx * k;
      store.spin.x = Math.max(-0.7, Math.min(0.7, store.spin.x + dy * k * 0.6));
      store.spin.vy = store.spin.vy * 0.6 + ((dx * k) / dt) * 0.4;
      store.spin.vx = store.spin.vx * 0.6 + ((dy * k * 0.6) / dt) * 0.4;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    };

    const up = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      id = null;
      store.dragging = false;
      delete el.dataset.dragging;

      const moved = Math.hypot(e.clientX - startX, e.clientY - startY);
      const quick = performance.now() - startT < 350;
      if (moved < 6 && quick) {
        store.pulse = 1;
        store.spin.vy += 8.5;
      } else if (performance.now() - lastT > 80) {
        // 멈춘 채로 놓으면 관성 없이
        store.spin.vy = 0;
        store.spin.vx = 0;
      }
      setTouched(true);
    };

    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, []);

  return (
    <section
      ref={section}
      className={styles.hero}
      data-ready={ready || gl === false ? 'true' : undefined}
      data-static={gl === false ? 'true' : undefined}
      aria-labelledby="hero-title"
    >
      <div className={styles.stage} aria-hidden="true">
        {gl && (
          <div className={styles.canvas}>
            <HeroCanvas
              storeRef={storeRef}
              active={active}
              onReady={() => setReady(true)}
            />
          </div>
        )}
        {gl === false && (
          <div className={styles.fallback}>
            <LogoMark size={240} />
          </div>
        )}
      </div>

      <p className={clsx(styles.hint, touched && styles.hintHidden)}>
        <span className={styles.hintDot} />
        드래그해서 돌려 보세요
      </p>

      <div className={clsx('container', styles.content)}>
        <h1 id="hero-title" className={styles.slogan}>
          <span
            className={styles.line}
            style={{ '--i': 0 } as React.CSSProperties}
          >
            <span>무한한 미래를</span>
          </span>
          <span
            className={styles.line}
            style={{ '--i': 1 } as React.CSSProperties}
          >
            <span>만들어 갑니다</span>
          </span>
        </h1>

        <div className={styles.aside} data-no-drag>
          <p>
            {site.name}는 2018년 여름부터
            <br />
            디스코드 봇과 게임을 만들어 온 개발팀입니다.
          </p>
          <div className={styles.actions}>
            <Link href="/projects" className={styles.primary}>
              프로젝트 보기
              <ArrowRight size={15} />
            </Link>
            <Link href="/about" className={styles.secondary}>
              팀 소개
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
