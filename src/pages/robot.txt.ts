import type { APIRoute } from "astro"

export const GET: APIRoute = async () => {
  const site = import.meta.env.PUBLIC_SITE || "http://localhost:4321"

  return new Response(`User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /api/

Sitemap: ${site}/sitemap.xml
`)
}
