import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sangvita.in',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://sangvita.in/user/products',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.2,
    },
    {
      url: 'https://sangvita.in/user/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
   {
      url: 'https://sangvita.in/#articles',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]
}