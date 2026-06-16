import type { ActionAPIContext } from "astro:actions"

const ACCESS_TOKEN = "access_token"
const REFRESH_TOKEN = "refresh_token"

export function setAuthCookies(ctx: ActionAPIContext, accessToken: string, refreshToken: string) {
  ctx.cookies.set(ACCESS_TOKEN, accessToken, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60,
  })
  ctx.cookies.set(REFRESH_TOKEN, refreshToken, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export function getAccessToken(ctx: ActionAPIContext): string | undefined {
  return ctx.cookies.get(ACCESS_TOKEN)?.value
}

export function clearAuthCookies(ctx: ActionAPIContext) {
  ctx.cookies.delete(ACCESS_TOKEN, { path: "/" })
  ctx.cookies.delete(REFRESH_TOKEN, { path: "/" })
}
