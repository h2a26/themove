import type { NextConfig } from 'next';
import withSerwistInit from '@serwist/next';
import { execSync } from 'child_process';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'vxcj8wf6f9ngwjkb.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

const revision = execSync('git rev-parse HEAD').toString().trim();

const withSerwist = withSerwistInit({
  cacheOnNavigation: true,
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  additionalPrecacheEntries: [{ url: '/~offline', revision }],
});

export default withSerwist(nextConfig);
