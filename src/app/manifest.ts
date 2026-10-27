import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.nameKr}`,
    short_name: site.name,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f5f7',
    theme_color: '#f4f5f7',
    icons: [
      { src: '/logo192.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
