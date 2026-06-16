export interface SEO {
  title: string
  description: string
  ogType?: "website" | "article"
  ogImage?: string
  canonical?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  article?: {
    publishedTime?: string
    tags?: string[]
  }
}

export interface SiteSEO {
  siteName: string
  locale: string
}

export const site: SiteSEO = {
  siteName: "AstroBP",
  locale: "en_US",
}
