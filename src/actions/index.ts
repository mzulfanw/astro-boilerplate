import { defineAction } from "astro:actions"
import { z } from "astro/zod"
import { loginUser } from "@/lib/api/auth"
import { setAuthCookies, clearAuthCookies } from "@/lib/auth"

export const server = {
  login: defineAction({
    accept: "json",
    input: z.object({
      username: z.string().min(1),
      password: z.string().min(1),
    }),
    handler: async (input, ctx) => {
      const data = await loginUser(input.username, input.password)
      setAuthCookies(ctx, data.accessToken, data.refreshToken)
      return {
        id: data.id,
        username: data.username,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
      }
    },
  }),
  logout: defineAction({
    handler: async (_, ctx) => {
      clearAuthCookies(ctx)
      return { success: true }
    },
  }),
}
