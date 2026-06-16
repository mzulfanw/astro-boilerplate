import type { APIRoute } from "astro"
import { generateOGImage } from "@/lib/og-image"

export const GET: APIRoute = async ({ url }) => {
  try {
    const title = url.searchParams.get("title") || "AstroBP"
    const description = url.searchParams.get("description") || undefined

    const png = await generateOGImage(title, description)

    return new Response(png as BodyInit, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("OG image generation failed:", error)
    return new Response("OG image generation failed", { status: 500 })
  }
}
