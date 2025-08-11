/**
 * FILE PATH: app/sitemap-index.ts
 * 
 * This file should be placed in the root app/ directory of your Next.js project.
 * It generates a sitemap index for better organization.
 */

import { MetadataRoute } from 'next'

export default function sitemapIndex(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://muradianconvertor.com/sitemap.xml',
      lastModified: new Date(),
    },
  ]
}
