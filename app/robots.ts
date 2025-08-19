/**
 * FILE PATH: app/robots.ts
 * 
 * This file should be placed in the root app/ directory of your Next.js project.
 * It generates robots.txt for search engine crawling.
 */

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    sitemap: 'https://transformate.vercel.app/sitemap.xml',
  }
}
