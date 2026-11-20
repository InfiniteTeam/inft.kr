import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.scss';
import Nav from '@/components/site/Nav';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/site/Reveal';
import { REVEAL_SCRIPT } from '@/components/site/revealScript';
import { site } from '@/data/site';
import { sharedOpenGraph } from '@/lib/metadata';

// 큰 제목과 숫자에만 쓰는 Cafe24 PRO Slim Max(700). 라이선스: src/fonts/Cafe24PROSlim-OFL.txt
// 이 서체에 없는 드문 한글 음절은 글자 단위로 Pretendard가 대신 그립니다.
const cafe24 = localFont({
  src: '../fonts/Cafe24PROSlim-Bold.woff2',
  variable: '--font-cafe24',
  display: 'swap',
  weight: '700',
  adjustFontFallback: false,
  fallback: ['Pretendard Variable', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.slogan} | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'Infinite Studio',
    '인피니트 스튜디오',
    '디스코드 봇',
    '디스코드 관리봇',
    'Aztra',
    '아즈트라',
    'Idle Factory',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    ...sharedOpenGraph,
    url: '/',
    title: `${site.slogan} | ${site.name}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.slogan} | ${site.name}`,
    description: site.description,
  },
  appleWebApp: { title: site.name, statusBarStyle: 'default' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#07090e',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Next 16부터는 페이지를 옮길 때 smooth 스크롤을 알아서 꺼 주지 않습니다.
    // 이 속성이 있어야 새 페이지가 부드럽게 굴러가다 중간에 멈추지 않고 맨 위에서 시작합니다.
    // data-reveal은 아래 <head> 스크립트가 그리기 전에 붙이므로 수화(hydration) 경고를 끕니다.
    <html
      lang="ko"
      className={cafe24.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
      </head>
      <body>
        <a className="visually-hidden" href="#main">
          본문으로 건너뛰기
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />

        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${site.gaTrackingId}`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.gaTrackingId}');`}
        </Script>
      </body>
    </html>
  );
}
