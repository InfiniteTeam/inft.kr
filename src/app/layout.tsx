import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './globals.scss';
import Nav from '@/components/site/Nav';
import Footer from '@/components/site/Footer';
import { site } from '@/data/site';

const korail = localFont({
  src: '../fonts/KORAILCondensed-Regular.woff2',
  variable: '--font-korail',
  display: 'swap',
  adjustFontFallback: false,
  fallback: ['Pretendard Variable', 'system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.slogan}`,
    template: `%s — ${site.name}`,
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
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
  },
  appleWebApp: { title: site.name, statusBarStyle: 'default' },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#f4f5f7',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={korail.variable}>
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
