import { defineConfig } from "astro/config"
import { loadEnv } from "vite"
import vercel from "@astrojs/vercel"
import sitemap from "@astrojs/sitemap"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"

const ENV = loadEnv(process.env.NODE_ENV || "development", process.cwd(), "")

export default defineConfig({
  site: ENV.PUBLIC_SITE,
  adapter: vercel({
    imageService: true,
  }),
  image: {
    domains: ["images.unsplash.com"],
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
  vite: {
    resolve: {
      tsconfigPaths: true,
    },
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    ssr: {
      external: ["@resvg/resvg-js"],
    },
  },
  integrations: [sitemap(), react()],
})
