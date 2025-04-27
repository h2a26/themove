import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Move', 
    short_name: 'The Move',
    description: 'A luxury & minimalist interior design studio in Myanmar.',
    start_url: '/',
    id: 'themovearchids.vercel.app',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    "screenshots": [
      {
        src: '/icons/iPad-home-screen-1024x1366.png',
        sizes: '1024x1366',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Home - Tablet View',
        platform: 'ipados'
      },
      {
        src: "/icons/iPad-projects-screen-1024x1366.png",
        sizes: '1024x1366',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Projects - Tablet View',
        platform: 'ipados'
      },
      {
        src: '/icons/iphone-contact-screen-390x844.png',
        sizes: '390x844',
        type: 'image/png',
        label: 'Home - Mobile View',
        platform: 'ios'
      },
      {
        src: '/icons/iphone-home-screen-390x844.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Home - Mobile View',
        platform: 'ios'
      },
      {
        src: '/icons/iphone-contact-screen-390x844.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Contact - Mobile View',
        platform: 'ios'
      },

    ],
    protocol_handlers: [
      {
        protocol: "web+interiordesign",
        url: "/handle-protocol?url=%s"
      }
    ],
  }
}
