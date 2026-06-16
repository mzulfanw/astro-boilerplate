import type { APIRoute } from "astro"
import { getAllPosts } from "@/lib/api/posts"

export const prerender = false

export const GET: APIRoute = async () => {
  const { posts } = await getAllPosts()

  const staticPages = ["/", "/login", "/blog"]
  const blogPages = posts.map((p) => `/blog/${p.id}`)
  const allPages = [...staticPages, ...blogPages]

  const site = import.meta.env.PUBLIC_SITE || "http://localhost:4321"

  const urls = allPages.map((page) => `  <url>\n    <loc>${site}${page}</loc>\n  </url>`).join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  })
}
