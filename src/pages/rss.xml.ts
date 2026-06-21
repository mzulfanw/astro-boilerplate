import rss from "@astrojs/rss"
import type { APIRoute } from "astro"
import { getAllPosts } from "@/lib/api/posts"

export const prerender = false

export const GET: APIRoute = async (context) => {
  try {
    const { posts } = await getAllPosts()

    const result = await rss({
      title: "AstroBP Blog",
      description: "Latest articles and tutorials on AstroBP",
      site: context.site ?? "http://localhost:4321",
      items: posts.map((post) => ({
        title: post.title,
        description: post.body.slice(0, 300),
        link: `/blog/${post.id}`,
        categories: post.tags,
      })),
    })

    const body = await result.text()
    return new Response(body, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=600, s-maxage=600",
      },
    })
  } catch {
    return new Response("Failed to generate RSS feed", { status: 500 })
  }
}
