import type { Metadata } from 'next';
import { site } from '@/data/site';

/** 공유 미리보기에 공통으로 들어가는 값 */
export const sharedOpenGraph = {
  type: 'website',
  locale: 'ko_KR',
  siteName: site.name,
} as const;

/*
 * app/opengraph-image.jpg, app/twitter-image.jpg. 페이지가 openGraph를 덮어쓰면
 * 파일로 둔 이미지도 함께 빠지므로 하위 페이지에는 직접 적어 줍니다.
 */
const shareImage = {
  width: 1200,
  height: 630,
  alt: '어두운 바탕의 오로라 앞에 떠 있는 유리 iN 심볼과, 그 아래 슬로건 무한한 미래를 만들어 갑니다, SINCE 2018',
};

/**
 * 하위 페이지 메타데이터. Next는 openGraph와 twitter를 통째로 덮어쓰거나 그대로 물려주므로,
 * 페이지 제목과 설명이 공유 미리보기에도 나오도록 함께 채웁니다.
 */
export function pageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const full = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...sharedOpenGraph,
      title: full,
      description,
      url: path,
      images: [{ url: '/opengraph-image.jpg', ...shareImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: full,
      description,
      images: [{ url: '/twitter-image.jpg', ...shareImage }],
    },
  };
}
