'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * [data-reveal] 요소가 화면에 들어오면 위에서 살짝 내려오며 나타나게 합니다.
 * 페이지를 옮길 때마다 새 페이지의 요소를 다시 살핍니다.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.reveal !== 'on') return;
    (window as Window & { __reveal?: boolean }).__reveal = true;

    const io = new IntersectionObserver(
      (entries) => {
        // 한 번에 들어온 것들은 차례로 조금씩 늦게
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.setProperty(
            '--reveal-delay',
            `${Math.min(order, 5) * 70}ms`
          );
          el.dataset.in = '';
          io.unobserve(el);
          order++;
        }
      },
      { rootMargin: '0px 0px -6% 0px' }
    );

    document
      .querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])')
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
