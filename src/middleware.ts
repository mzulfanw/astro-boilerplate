import { defineMiddleware } from "astro:middleware"

const protectedRoutes = ["/dashboard"]

export const onRequest = defineMiddleware(async (ctx, next) => {
  if (protectedRoutes.some((route) => ctx.url.pathname.startsWith(route))) {
    const token = ctx.cookies.get("access_token")?.value
    if (!token) {
      return ctx.redirect("/login")
    }
  }
  try {
    return await next()
  } catch {
    return new Response(null, { status: 500 })
  }
})
