import type { APIRoute } from "astro"

export const prerender = false

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("access_token", { path: "/" })
  cookies.delete("refresh_token", { path: "/" })
  return redirect("/login")
}
