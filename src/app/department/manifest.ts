import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EKATMA Department Portal',
    short_name: 'EKATMA Dept',
    description: 'Government of Maharashtra Single Window Portal - Department Interface',
    start_url: '/department/',
    display: 'standalone',
    background_color: '#f8f9fb',
    theme_color: '#1a3a5c',
    icons: [
      {
        src: '/department/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/department/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
