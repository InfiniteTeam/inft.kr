import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.scss';
import Nav from '@/components/site/Nav';
import Footer from '@/components/site/Footer';
import { site } from '@/data/site';

const beanpole = localFont({
  src: '../fonts/Beanpole-M00.woff',
  variable: '--font-beanpole',
  display: 'swap',
  weight: '500',
  adjustFontFallback: false,
  fallback: ['Pretendard Variable', 'sans-serif'],
  // 빈폴체는 한글에만 씁니다. 영문, 숫자, 기호는 그대로 Pretendard로 넘어갑니다.
  declarations: [
    {
      prop: 'unicode-range',
      value: 'U+1100-11FF, U+3130-318F, U+A960-A97F, U+AC00-D7A3, U+D7B0-D7FF',
    },
  ],
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
    'Aztra',
    'Idle Factory',
    '2¹²',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: site.url,
    siteName: site.name,
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
    <html lang="ko" className={beanpole.variable} data-scroll-behavior="smooth">
      <body>
        <a className="visually-hidden" href="#main">
          본문으로 건너뛰기
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />

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
