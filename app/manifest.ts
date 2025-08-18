/**
 * FILE PATH: app/manifest.ts
 * 
 * This file should be placed in the root app/ directory of your Next.js project.
 * It generates a web app manifest for PWA capabilities.
 */

import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Transformate - Free Unlimited File Converter by Muradian',
    short_name: 'Transformate',
    description: 'Transform images, videos, and audio files with cutting-edge technology. No registration, no limits, no watermarks.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7c3aed',
    icons: [
      {
        src: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
